





var br_facebook = function(){





  var user = {
    token : null,
    userID : null,
    first_name : null,
    last_name : null,
    email : null,
    likesBR : null,
    eventsAttending : [],
    bandLikes : [],
    musicListens : []
  };

  var BR = {
    id : null,
    pageName : null,
    link : null,
    likes : null,
    events : [],
    photos : []
  };


  var logic = function(){

    var callstack = [];

    function globalSetup(r){
      user.userID = r.userID;
      user.token = r.accessToken;

      populateUser(user.userID);
      populateBR.getBaseline();
      populateBR.getEvents();


    }

    var permissions = 'email,user_activities,friends_activities,user_likes,friends_likes,friends_location,rsvp_event,user_events';

    function login() {
        FB.login(function(response) {
            if (response.authResponse) {
              fbToken = response.authResponse.accessToken;
              br_facebook.token = fbToken;
              var r = response.authResponse;
              globalSetup(r);
              UI.render.authStatus('logged-in');
            } else {
              UI.render.authStatus('logged-out');
            }
        }, { scope: permissions });
   }

   return {
     callstack : callstack,
     globalSetup : globalSetup,
     login : login
   };

  }();


  var populateBR = function(){

    function getBaseline(){
      FB.api('/badracket', function(data) {
        BR.pageName = data.name;
        BR.id = data.id;
        BR.likes =  data.likes;
        BR.link = data.link;
      });
    }

    function getEvents(){
       FB.api('/badracket/events', function(data) {
        BR.events = data.data;
      });
    }

    function getPhotos(){
      var albums;
       FB.api('/badracket/albums?fields=id&limit=9999', function(data) {
        albums = data.data;
        getPhotoURLS(albums);
      });
    }

    function getPhotoURLS(albums){
      _.each(albums, function(el){
         FB.api(el.id + '/photos?limit=9999', function(data) {
          var allPhotos = data.data;
          _.each(allPhotos, function(el){
            var src = el.images[0].source;
            var likes = (el.likes) ? el.likes.data.length : 0;
            BR.photos.push({ src: src, likes : likes });
          });
        });
      });
    }

    return {
      getBaseline : getBaseline,
      getEvents : getEvents,
      getPhotos : getPhotos
    };
  }();

  function populateUser ( userID ){

      FB.api( '/' + userID, function(data) {
        user.first_name = data.first_name;
        user.last_name = data.last_name;
        user.email = data.email;
        UI.render.user();
        _.each(logic.callstack, function(el){
          el();
        });
      });

       FB.api( '/' + userID + '/picture', function(data) {
        user.picture = data.data.url;
        UI.render.userPicture();
      });

      FB.api( '/' + userID + '/likes', function(data) {
        user.likes = data.data;

        _.each(user.likes, function(el){
          if (el.name === BR.pageName) { user.likesBR = true; }
        });

      });

     }


  var UI = function(){
    var handlers = {
      login : function(){
        console.log('login handler ran');
        logic.login();
      }

    };

    function viewDelegate(){
      var view = br_state.viewGet();
      if ( view === 'show-detail' ) {
        var eventID = $('.show-rsvp').data('fb-id');
        render.rsvpButton(eventID);
      }
    }

    var render = {

      authStatus : function( status ){
        console.log('auth status ran');
        var html = $('html');
        if (status === 'logged-in') {
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

      rsvpButton : function( eventID ){
        console.log('render rsvp button ran');
        console.log(eventID);

      },

    };

    var bindUI = {
      login : function(){
        $('.facebook .login').on('click', handlers.login );
      }

    };

    return {
      handers : handlers,
      viewDelegate : viewDelegate,
      bindUI : bindUI,
      render : render
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

    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
          var r = response.authResponse;
          logic.globalSetup(r);
          UI.render.authStatus('logged-in');
        } else {
          UI.render.authStatus('logged-out');
        }
    });
  }

    return {
      init : init,
      user : user,
      BR : BR,
      UI : UI,
      populateBR : populateBR,
      populateUser : populateUser,
      logic : logic
    };
  }();



function bullshit(){
  $('html').html('');
  br_facebook.BR.photos = _.sortBy(br_facebook.BR.photos, function(p){ return -p.likes; });
  console.log(br_facebook.BR.photos);
  _.each(br_facebook.BR.photos, function(el){
    $('html').append('<img style="width:100%;" src="'+el.src+'"/>');
  });
}


function setupFacebook(){
  br_facebook.init();
  br_facebook.UI.bindUI.login();
}




// function logout() {
//   console.log('fuck you');
//    FB.api('https://graph.facebook.com/me?access_token='+fbToken, function(response){
//     console.log(response);
//   });
// }

// function testAPI() {
//     console.log('Welcome!  Fetching your information.... ');
//     FB.api('/me', function(response) {
//         // console.log('Good to see you, ' + response.name + '.');
//         console.log(response);
//     });
//     FB.api('/me/friends', function(response) {
//         // console.log(response);
//     });
//     FB.api('/me/permissions', function (response) {
//         console.log(response);
//     } );
// }



// function rsvp(eventId) {
//   FB.api('/'+eventId+'/attending', 'post', function(data) {
//    console.log(data);
//    });
// }


// $('.show-rsvp').click(function(){
//   var eventId = $(this).data('fb-id');
//   // get_event(eventId);
//   rsvp(eventId);
//   is_attending(eventId, br_facebook.userID);
// });



// function fb_init(){
//   var eventId = $('.show-rsvp').data('fb-id');
//   console.log(eventId);
//   console.log(br_facebook.userID);
//   var a = is_attending(eventId, br_facebook.userID);
//   console.log(a);
//   // _.each(a, function(el){
//   //   $('body').append(el.name);
//   // });
// }


// setTimeout(function() {
//   fb_init();
// }, 1000);



// function render(){
//   $.each(titleList, function(index, value){
//     $('ul').append(
//         $(document.createElement('li')).text('You listened to ' + titleList[index] + ' by ' + artistList[index])
//     );
//   });
// }