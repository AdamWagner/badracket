
var br_fb = function() {

  var config = {
    appId : (BR_ENV === 'prod') ? '182655285084916' :  '500547106661064',
    secret : (BR_ENV === 'prod') ? 'd6a8a494139d8f0a4ebc981bdb5751a3' : 'fde7ca80b4bc1e1d912984266f67e36f',
    accessToken : null,
    appAccess : null,
    connectStatus : null,  // connected, not_authorized, not_logged_to_fb
    loginCounter : 0
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
        config.loginCounter++;
        if ( config.loginCounter < 50 ) { setTimeout( function() { fbEnsureInit( cb ); }, 150); }
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

    function getUserEvents() {
      return call_fb( 'me/events?limit=99999&type=attending&since=0' );
    }

    function popUser ( d ) {

      function alreadyGoing(id){
        var going = false;
        _.each(user.events, function(el){
          if (el.id == id) {
            console.log('is already going');
            going = true;
          }
        });
        return going;
      }

      user.username = d.username || 'not given';
      user.userID = d.id || 'not given';
      user.first_name = d.first_name || 'not given';
      user.last_name = d.last_name || 'not given';
      user.email = d.email || 'not given';
      if ( user.events === null ) {
        user.events = d.events || [];
      } else {
        user.events.push();
      }
      user.gender = d.gender || 'not given';
      user.picture = d.picture.data.url;
      if ( typeof d.likes !== 'undefined') { user.likes = d.likes.data; }
      if ( typeof d.location !== 'undefined') { user.likes = d.location.name; }
      if ( typeof d.picture !== 'undefined') { user.likes = d.picture.data.url; }
      if ( typeof d.friends !== 'undefined') { user.likes = d.friends.data; }

      if ( typeof d.likes !== 'undefined') { isFan( user.likes ); }



    }

    function isFan ( userLikes ) {
      user.likesBR = false;
      _.each(userLikes, function(el){
        if (el.name === BR.pageName || 'Bad Racket Recording Studio') { user.likesBR = true; }
      });
    }

    function isAttending ( eventID ) {
      if ( !user.events ) return false;
      for ( var i = user.events.length; i--; ) {
        if ( user.events[i].id == eventID ) { return true; }
      }
    }

    function getEventByID ( eventID ) {
       for ( var i = BR.events.length; i--; ) {
         if ( BR.events[i].id == eventID ) { return BR.events[i]; }
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

       var path = (br_fb.config.connectStatus !== 'connected') ? '/photos?fields=images,likes&limit=9999&access_token=' + escape(config.appAccess) : '/photos?fields=images,likes&limit=9999';

       FB.api(el.id + path , function( r ) {

         _.each(r.data, function(el){
           var mediumSrc = el.images[4].source;
           var largeSrc = el.images[0].source;
           var likes = (el.likes) ? el.likes.data.length : 0;
           BR.photos.push({ large: largeSrc, medium:mediumSrc, likes : likes });
         });

         dfd.resolve();
       });

       window.dfds.push( dfd.promise() );
      });

    }

   return {
    isFan : isFan,
    isAttending : isAttending,
    getUser : getUser,
    getUserEvents : getUserEvents,
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

        $.when( fetch.getUser(), fetch.getUserEvents() ).done(function( r1, r2 ){
          r1.events = r2.data;
          fetch.popUser( r1 );
          $(window).trigger('fb-user-data-load');
          UI.render.user();
          UI.render.userPicture();
          br_mixpanel.setPeople(user);

          if ( br_player.state.isPlaying ) {
            br_player.ui.handlers.playClick();
            br_player.ui.handlers.playClick();
          }
        });
      } else if ( s === 'not_authorized') {
        UI.render.authStatus(false);
        config.connectStatus = s;
        forceGetAccessToken();
      } else {
        UI.render.authStatus(false);
        config.connectStatus = s;
        forceGetAccessToken();
      }

    }

    function forceGetAccessToken(){
        console.log('https://graph.facebook.com/oauth/access_token?client_id='+config.appId+'&redirect_uri=http://localhost:8888/sites/brv5/wp-br/&client_secret='+config.secret+'&grant_type=client_credentials');
        $.ajax({
          url: 'https://graph.facebook.com/oauth/access_token?client_id='+config.appId+'&redirect_uri=http://localhost:8888/sites/brv5/wp-br/&client_secret='+config.secret+'&grant_type=client_credentials',
          success: function(r){ config.appAccess = r.split('=')[1]; }
        });
        UI.render.authStatus(false);
        config.connectStatus = 'not_logged_to_fb';
    }

   return {
     globalSetup : globalSetup
   };

  }();

  var UI = function(){

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
      $('.header-buttons').addClass('loaded');
      },

      user : function(){
       console.log('render login ran');
       $('.fb-user-name').text( user.first_name );
      },

      userPicture : function(){
       $('.fb-user-picture').attr('src', user.picture);
      },

      rsvpButton : function( status , target ){

        var button = target.closest('.show-rsvp');

        var now = (new Date().getTime() / 1000).toFixed();

        var then = target.closest('.padded-mobile-1').find('.show-rsvp').attr('data-fb-id');
        console.log('now: ' + now);
        console.log('then: ' + then);

        var text = '';
        if ( then > now ) {
          text = 'You\'re going!';
        } else {
          text = 'You went!';
        }


        if ( status && status !== 'error' ) {
          button.removeClass('not-attending')
            .addClass('rsvp-attending')
            .find('.text').text(text);
            $('.show-rsvp').off('click', handlers.rsvp );       // unbind to make label unclickable & error-producing
        } else if ( status == 'error') {
          button.removeClass('not-attending').find('.text').text('Oops! Something went wrong. You might be a Bad Racket admin and can\'t RSVP');
        }
      },

      attending : function( target ) {
        var eventID = $('.show-rsvp').attr('data-fb-id'),
            eventObj = fetch.getEventByID( eventID ),
            names = [];

        if ( eventObj === null ) {
          console.log('fuck ');
          return false;
        }

        var attendees = eventObj.attending.data;

        var peopleGoing = function(){
          var num  = 0;
          _.each( attendees, function( el ){
            if ( num < 6 ) { names.push(el.name); }
              num++;
          });
          return num;
        }();

        var numAttending = attendees.length - names.length;

        var extra = (numAttending > 0 ) ? ' and </span> <span class="not-xparent">' + numAttending + ' others </span>' : '';

        $('.show-sidebar .attendees .text').html( '<span class="not-xparent">'  + names.join(', ') + extra + ' are going.');

        var frag = [];
        _.each( attendees , function( el ){
          var url = el.picture.data.url;
          frag.push('<img class="grid" src="'+url+'"/>');
        });
        $('.show-sidebar .attendees .facepile').html( frag.join('') );

      },

      usersAttending: function() {
        console.log('users attending raaaaaaaaaaaannnnnnnn');
        var eventID = $('.show-rsvp').data('fb-id'),
            eventObj = fetch.getEventByID( eventID );

        if ( typeof eventObj === 'undefined' ) {
          return false;
        }

        var attendees = eventObj.attending.data,
            friendIDs = _.pluck(user.friends, 'id'),
            friendsGoing = [],
            names = [];

        console.log('this is the attendees:');
        console.log(attendees);

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

        var extra = (numAttending > 0 ) ? ' and  <span class="not-xparent">' + numAttending + ' others </span>' : '';

        $('.show-sidebar .attendees .text').html( '<span class="not-xparent">'  + names.join(', ') + '</span>' + extra + ' are going.');

        var frag = [];
        console.log('the list of 4 attendees');
        console.log(attendees);
        _.each( attendees , function( el ){
          if ( el.friend || el.name === (user.first_name + ' ' + user.last_name ) || numFriendsGoing < 6 ) {
            var url = el.picture.data.url;
            frag.push('<img class="grid" src="'+url+'"/>');
          }
        });
        $('.show-sidebar .attendees .facepile').html( frag.join('') );

      },

      renderPhotos : function(){
        $.when.apply(null, window.dfds ).done(function( r ){
          BR.sortedPhotos = _.sortBy(BR.photos, function( p ){ return -p.likes; });
          var frag = [];
          for (var i = 0; i < 95; i++ ) {
            frag.push('<div class="grid padded"><div class="lazyload fade ratio-4-3" data-src="' + BR.sortedPhotos[i].medium + '"></div></div>');
          }
          $('.photos-container').html(frag.join('\n'));
          badracket.lazyLoadImg('render photos');
        });
      },

      videos : function(){
        var videoContainer = $('#video-container'),
            frag = [];

        _.each(BR.videos, function( el ){
           var thumbnail = el.thumbnail_large,
               title = el.title.split(':')[0],
               date = el.title.split('-')[1],
               id = el.id;

          var vidEl = [
          '<div class="grid padded">',
            '<div class="playable video" data-id="'+id+'">',
              '<div class="play"></div> ',
              '<div class="lazyload fade ratio-16-9" data-src="'+ thumbnail +'">',
              '</div>',
            '</div>',
            '<div class="album-meta">',
              '<div class="album-title">'+title+'</div>',
              '<div class="artist-name">'+date+'</div>',
            '</div>',
          '</div>'
          ].join('');

          frag.push(vidEl);

        });

        videoContainer.html(frag);
        bindUI.video();
        badracket.lazyLoadImg('vimeo inject - all');
      },

      videosHome : function(){
       var videoContainer = $('#video-container'),
           frag = [];

         for (var i = 0; i < 4; i++ ) {
           var el = BR.videos[i];
           var thumbnail = el.thumbnail_large,
               title = el.title.split(':')[0],
               date = el.title.split('-')[1],
               id = el.id;

           var vidEl = [
           '<div class="grid padded">',
           '<a href="'+br_state.urls.videos+'" class="dJAX_internal">',
             '<div class="playable video" data-id="'+id+'">',
               '<div class="play"></div> ',
              '<div class="lazyload fade ratio-16-9" data-src="'+ thumbnail +'"></div>',
             '</div>',
             '<div class="album-meta">',
               '<div class="album-title">'+title+'</div>',
               '<div class="artist-name">'+date+'</div>',
             '</div>',
           '</a>',
           '</div>'
           ].join('');

           frag.push(vidEl);
         }


       videoContainer.html(frag);
       bindUI.videoHome();
       badracket.lazyLoadImg('vimeo inject - home');
      }


    };

    var vimeo = {
      bind : function(){
        var iframe = $('#vimeo-player')[0],
            player = $f(iframe);

        // When the player is ready, add listeners for pause, finish, and playProgress
        player.addEvent('ready', function() {
          player.addEvent('play', onPlay);
          player.addEvent('pause', onPause);
          player.addEvent('finish', onFinish);

        });

        $(window).on('sm2-play-event', function() { player.api('pause'); });

        function onPlay(id){
            var vimeoContainer = $('.vimeo-container');
            setTimeout(function() {
              vimeoContainer.removeClass('loading');
            }, 500);

          br_mixpanel.track('Video started');
          mixpanel.people.increment("Videos started", 1);
          $(window).trigger('vimeo-play-event');
        }

        function onPause(id) {
          $(window).trigger('vimeo-pause-event');
        }

        function onFinish(id) {

          mixpanel.people.increment("Videos finished", 1);
          br_mixpanel.track('Video ended');
          $('.next')
            .find('.video')
            .click();
        }

      }
    };


    var handlers = {
       login : function(){
         login();
       },

       logout : function(){
         logout();
       },


       videoHomeClick : function(){
         var id = $(this).data('id');
         console.log('vid home click ran biiiiiiiiiiiiiiiiiooooooooooooch');

         $(window).on('djaxLoad', function(e, data) {
           $('[data-id="'+id+'"]').click();
           console.log($('[data-id="'+id+'"]'));
         });

         br_mixpanel.track('Click: video');
       },

       videoClick : function(){
         $(window).off('sm2-play-event');
         var that = $(this);
         $("html, body").animate({ scrollTop: 0 }, "slow");

         var id = that.data('id'),
             vimeoContainer = $('.vimeo-container');

          $('.grid').removeClass('playing next');

          that
            .closest('.grid')
            .addClass('playing')
            .next()
            .addClass('next');

          var ratioHeight = $('.main-content').width() * 0.5;

          vimeoContainer
           .addClass('loading')
           .css('height', ratioHeight );

          vimeoContainer.find('.iframe-wrap').html('<iframe style="visibility:hidden;" onload="this.style.visibility=\'visible\';" id="vimeo-player" src="http://player.vimeo.com/video/'+id+'?api=1&autoplay=true&player_id=vimeo-player"></iframe>');

          vimeo.bind();
          vimeoContainer.fitVids();
          br_mixpanel.track('Click: video');
       },

       rsvp : function(e){
        var $that = $(e.target).closest('.show-rsvp');
        $that.addClass('transparent');
        var eventId = $that.data('fb-id');
        console.log(eventId);

        function alreadyGoing(id){
          var going = false;
          _.each(user.events, function(el){
            if (el.id == id) {
              console.log('is already going');
              going = true;
            }
          });
          return going;
        }

        function attend(){
            console.log('attend called');
            FB.api('/'+eventId+'/attending', 'post', function(data) {
             $that.removeClass('transparent');
              console.log(data);
             if ( data.error ) {
                render.rsvpButton('error', $that);
             } else {
                 render.rsvpButton(true, $that);
                 if ( user.events === null ) { user.events = []; }

                 if ( !alreadyGoing(eventId) ) {
                   user.events.push(fetch.getEventByID(eventId));
                 }
              }
            });

        }

        if ( config.connectStatus !== 'connected' ) {
          login( attend );
        } else {
          attend();
        }
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
        console.log('++++++++++++++++++++++++++++++++++++++++++rsvp button bound');
        s.bd.on({
            click : function(e){ handlers.rsvp(e); }
          } , '.show-rsvp' );
      },

      video : function(){
        $('.video').on('click', handlers.videoClick );
      },

      videoHome : function(){
        $('[data-view="home"]').find('.video').on('click', handlers.videoHomeClick );
      },

      bindAll : function(){
        this.login();
        this.logout();
        this.rsvp();
      },

      unBindAll: function(){
        $('.facebook .login').off('click', handlers.login );
        $('.facebook .logout').off('click', handlers.logout );
        $('.show-rsvp').off('click', handlers.rsvp );
      }
    };

    return {
      render : render,
      bindUI : bindUI,
      vimeo : vimeo
    };

  }();

  function init(){

    FB.init({
      appId      : config.appId, // App ID
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

