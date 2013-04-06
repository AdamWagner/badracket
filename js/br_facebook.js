
var br_fb = function(){

  var config = {
    accessToken : null,
    appAccess : null,
    connectStatus : null  // connected, not_authorized, not_logged_to_fb
  };

  var user = {
    userID : null,
    username : null,
    first_name : null,
    last_name : null,
    email : null,
    gender : null,
    likes : null,
    events : null,
    likesBR : null,
    location : null,
    picture : null
  };

  var BR = {
    pageName : null,
    link : null,
    likeCount : null,
    events : [],
    photos : []
  };

  var permissions = [
    'email',
    'user_activities',
    'friends_activities',
    'user_likes',
    'friends_likes',
    'friends_location',
    'rsvp_event',
    'user_events'
  ];

  function fbEnsureInit ( cb ) {
       if ( !window.FB || ( !config.accessToken && !config.appAccess ) ) {
           console.log('ensure init still running');
           setTimeout( function() { fbEnsureInit( cb ); }, 150);
       } else {
           if ( cb ) { cb(); }
       }
  }

  function user_do_or_wait ( cb ) {
    if ( br_fb.user.events !== null ) { cb(); }
    else { $(window).on('fb-user-data-load', function() { cb(); }); }
  }

  function page_do_or_wait ( cb ) {
    if ( br_fb.BR.events.length > 0 ) { cb(); }
    else { $(window).on('fb-page-data-load', function() { cb(); }); }
  }

  function call_fb ( path ) {
    var dfd = new $.Deferred();

    var call = function () {
      if ( config.connectStatus === 'connected' ) {
        FB.api(path , function( r ) { dfd.resolve( r ); });
        console.log('call fb called with this path ' + path);
      } else {
        path = path + '&access_token=' + escape(config.appAccess);
        console.log('call fb called with this path ' + path);
        FB.api(path , function( r ) { console.log(r);dfd.resolve( r ); });
      }
    };

    fbEnsureInit( call );
    return dfd.promise();
  }

  function getLoginStatus() {
    FB.getLoginStatus( function( response ) {
      logic.globalSetup( response );
    });
  }

  function login( cb ) {
      FB.login(function( r ) {
        getLoginStatus( r );
        if ( cb ) { cb(); }
      }, { scope: permissions.join(',') });
  }

  function logout() {
    FB.logout(function(response) {
      // user is now logged out
    });
  }

  var fetch = function () {

    function getUser () {
      var fields = [
        'likes',
        'events',
        'email',
        'gender',
        'first_name',
        'last_name',
        'username',
        'picture',
        'bio',
        'location',
        'friends'
      ];

      return call_fb( 'me?fields=' + fields.join(',') );
    }

    function popUser ( d ) {
      user.username = d.username;
      user.userID = d.id;
      user.first_name = d.first_name;
      user.last_name = d.last_name;
      user.email = d.email;
      user.gender = d.gender;
      user.likes = d.likes.data;
      user.events = d.events.data;
      user.location = d.location.name;
      user.picture = d.picture.data.url;
      user.friends = d.friends.data;

      isFan( user.likes );

    }

    function isFan ( userLikes ) {
      user.likesBR = false;
      _.each(userLikes, function(el){
        if (el.name === BR.pageName || 'Bad Racket Recording Studio') { user.likesBR = true; }
      });
    }

    function isAttending ( eventID ) {
      for ( var i = user.events.length; i--; ) {
        if ( user.events[i].id == eventID ) { return true; }
      }
    }

    function getEventByID ( eventID ) {
       for ( var i = BR.events.length; i--; ) {
         if ( BR.events[i].id == eventID ) { console.log(BR.events[i]); return BR.events[i]; }
     }
   }


    function getBR () {

      var fields = [
        'name',
        'likes',
        'events.fields(attending.fields(picture,name))',
        'hours',
        'location',
        'phone',
        'link'
      ];


      return call_fb('/badracket?fields=' + fields.join(','));
    }

    function popBR ( d ) {
      BR.pageName = d.name;
      BR.likeCount = d.likes;
      BR.location = d.location;
      BR.phone = d.phone;
      BR.link = d.link;
      BR.hours = d.hours;
      BR.events = d.events.data;
    }

    function getBR_albums () {
      return call_fb('/badracket/albums?fields=id&limit=9999');
    }

    function popPhotos ( d ) {
      BR.albums = d.data;
      getPhotoURLS ( BR.albums );
    }

    function getPhotoURLS(albums){
      window.dfds = [];

      _.each(albums, function(el){
        var dfd = new $.Deferred();

       FB.api(el.id + '/photos?fields=images,likes&limit=9999', function( r ) {

         _.each(r.data, function(el){
          console.log(el);
           var mediumSrc = el.images[4].source;
           var largeSrc = el.images[0].source;
           var likes = (el.likes) ? el.likes.data.length : 0;
           BR.photos.push({ large: largeSrc, medium:mediumSrc, likes : likes });
         });

         dfd.resolve();
       });

       window.dfds.push( dfd.promise() );
      });

      UI.render.renderPhotos();
    }

   return {
    isFan : isFan,
    isAttending : isAttending,
    getUser : getUser,
    popUser : popUser,
    getBR : getBR,
    getBR_albums : getBR_albums,
    getPhotoURLS : getPhotoURLS,
    popBR : popBR,
    popPhotos : popPhotos,
    getEventByID : getEventByID
   };

  }();

  var logic = function(){

    function globalSetup( r ){
      console.log('response object is ........');
      console.log(r);
      var s = r.status;

        $.when( fetch.getBR() ).then(function( r ){
          fetch.popBR( r );
          $(window).trigger('fb-page-data-load');
        });

      if ( s === 'connected') {
        var a = r.authResponse.accessToken;
        config.accessToken = a;
        config.connectStatus = 'connected';
        UI.render.authStatus(true);

        $.when( fetch.getUser() ).then(function( r ){
          fetch.popUser( r );
          $(window).trigger('fb-user-data-load');
          UI.render.user();
          UI.render.userPicture();
        });


      } else if ( s === 'not_authorized') {
        UI.render.authStatus(false);
        config.connectStatus = s;

        console.log(';lasdfjk;aldskfja;lsdfkja;sdlfkj');

      } else {
        $.ajax({
          url: 'https://graph.facebook.com/oauth/access_token?client_id=517493138282534&redirect_uri=http://adamwagner.aws.af.cm/&client_secret=6434a549f714ca38d8920802637ee7b9&grant_type=client_credentials',
          success: function(r){ config.appAccess = r.split('=')[1]; }
        });
        UI.render.authStatus(false);
        config.connectStatus = 'not_logged_to_fb';
      }

    }

   return {
     globalSetup : globalSetup
   };

  }();

  var UI = function(){


    var handlers = {
       login : function(){
         login();
       },

       logout : function(){
         logout();
       },

       rsvp : function(){
        var that = $(this);
        that.addClass('transparent');
        var eventId = $('.show-rsvp').data('fb-id');

        function attend(){
            FB.api('/'+eventId+'/attending', 'post', function(data) {
             that.removeClass('transparent');
             render.rsvpButton(true);
            });
        }

        if ( config.connectStatus !== 'connected' ) {
          login( attend );
        } else {
          attend();
        }
       }

     };


    var render = {

      authStatus : function( loggedIn ){
       var html = $('html');
       if ( loggedIn ) {
         html.addClass('fb-logged-in');
         html.removeClass('fb-logged-out');
       } else {
         html.addClass('fb-logged-out');
         html.removeClass('fb-logged-in');
       }
      },

      user : function(){
       console.log('render login ran');
       var greeting = ['Welcome ', 'Howdy ', 'Hola '];
       var random = Math.floor(Math.random() * greeting.length );
       $('.fb-user-name').text( greeting[random] + user.first_name + '!');
      },

      userPicture : function(){
       $('.fb-user-picture').attr('src', user.picture);
      },

      rsvpButton : function( status ){
        var button = $('.show-rsvp');
        if ( status ) {
          button.removeClass('not-attending')
            .addClass('rsvp-attending')
            .find('.text').text('You\'re going!');
        }
      },

      attending : function() {
        console.log('regular attending rannnnnnnnnnnnnnnnn0q93284-203948-2034982-30498');
        var eventID = $('.show-rsvp').data('fb-id'),
            attendees = fetch.getEventByID( eventID ).attending.data,
            names = [];

        var peopleGoing = function(){
          var num  = 0;
          _.each( attendees, function( el ){
            if ( num < 6 ) { names.push(el.name); }
              num++;
          });
          return num;
        }();

        var numAttending = attendees.length - names.length;

        $('.show-sidebar .attendees .text').html( '<span class="not-xparent">'  + names.join(', ') + '</span> and <span class="not-xparent">' + numAttending + ' others </span> are going.');

        var frag = [];
        _.each( attendees , function( el ){
          var url = el.picture.data.url;
          frag.push('<img class="grid lazyload_img fade" src="'+url+'"/>');
        });
        $('.show-sidebar .attendees .facepile').html( frag.join('') );

      },

      usersAttending: function() {
        console.log('users attending raaaaaaaaaaaannnnnnnn');
        var eventID = $('.show-rsvp').data('fb-id'),
            attendees = fetch.getEventByID( eventID ).attending.data,
            friendIDs = _.pluck(user.friends, 'id'),
            friendsGoing = [],
            names = [];

        function is_in_list( search, list ) {
          for ( var i = 0; i < list.length; i++ ) {
            if ( list[i] === search ) {
              return true;
            }
          }
        }

        attendees = _.sortBy( attendees, function( a ){
          return is_in_list( a.id, friendIDs );
        });

        var numFriendsGoing = function(){
          var num  = 0;
          _.each( attendees, function( el ){
            if ( is_in_list( el.id, friendIDs ) ) {
              if (friendsGoing.length < 6 ) {
                friendsGoing.push(el);
              }
              el.friend = true;
              num++;
            }
          });
          return num;
        }();

        for ( var i = 0; i < friendsGoing.length ; i++ ) {
          if ( attendees[i].name !== (user.first_name + ' ' + user.last_name ) ) {
            names.push(attendees[i].name);
          }
        }

        var also = '',
            you = '',
            minusYou = 0;

        if ( fetch.isAttending( eventID ) ) {
          console.log('yep');
          also = ' also ';
          you = 'You, ';
          minusYou = 1;
        }

        var numAttending = attendees.length - friendsGoing.length - minusYou;


        $('.show-sidebar .attendees .text').html( '<span class="not-xparent">' + you + names.join(', ') + '</span> and <span class="not-xparent">' + numAttending + ' others </span> are '+ also +' going.');

        var frag = [];
        _.each( attendees , function( el ){
          if ( el.friend || el.name === (user.first_name + ' ' + user.last_name )) {
            var url = el.picture.data.url;
            frag.push('<img class="grid lazyload_img fade" src="'+url+'"/>');
          }
        });
        $('.show-sidebar .attendees .facepile').html( frag.join('') );

      },

      renderPhotos : function(){
        $.when.apply(null, window.dfds ).done(function( r ){
          BR.sortedPhotos = _.sortBy(BR.photos, function( p ){ return -p.likes; });
          for (var i = 0; i < 95; i++ ) {
            $('.s-1').append('<div class="grid padded"><div class="lazyload fade ratio-4-3 round-shadow" data-src="' + BR.sortedPhotos[i].medium + '"></div>');
          }
          badracket.lazyLoadImg();
        });
      },

      videos : function(){
        var videoContainer = $('#video-container'),
            frag = [];

        _.each(BR.videos, function( el ){
          var thumbnail = el.thumbnail_large,
              title = el.title.split(':')[0],
              formatted_date = date("M Y", new Date(el.upload_date));

          var vidEl = [
          '<div class="grid padded"><a href="videos.php">',
            '<div class="playable">',
              '<div class="play"></div> ',
              '<div class="lazyload fade ratio-16-9" data-src="'+ thumbnail +'">',
              '</div>',
              '</a>',
            '</div>',
            '<div class="album-meta">',
              '<div class="album-title">'+title+'</div>',
              '<div class="artist-name">'+formatted_date+'</div>',
            '</div>',
          '</div>'
          ].join('');

          frag.push(vidEl);

        });

        videoContainer.html(frag);
        badracket.lazyLoadImg();
      }


    };

    var bindUI = {
      login : function(){
        $('.facebook .login').on('click', handlers.login );
      },

      logout : function(){
        $('.facebook .logout').on('click', handlers.logout );
      },

      rsvp : function(){
        $('.show-rsvp').on('click', handlers.rsvp );
      },

      bindAll : function(){
        this.login();
        this.logout();
        this.rsvp();
      }
    };

    return {
      render : render,
      bindUI : bindUI
    };

  }();

  function init(){

    FB.init({
      appId      : '182655285084916', // App ID
      channelUrl : '//WWW.BADRACKET.COM/channel.html', // Channel File
      status     : true, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      xfbml      : true  // parse XFBML
    });

    getLoginStatus();

  }

    return {
      config : config,
      init : init,
      login : login,
      logout : logout,
      fbEnsureInit : fbEnsureInit,
      user_do_or_wait : user_do_or_wait,
      page_do_or_wait : page_do_or_wait,
      fetch : fetch,
      user : user,
      BR : BR,
      UI : UI
    };

}();


br_fb.UI.bindUI.bindAll();

