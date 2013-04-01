
var br_facebook = function(){

  var state = {
    userAuth : false
  };

  var user = {
    token : null,
    userID : null,
    firstName : null,
    lastName : null,
    bandLikes : [],
    musicListens : [],
    loaded : false
  };

  var BR = {
    id : null,
    link : null,
    likes : null,
    events : [],
    loaded : false,
    photos : []
  };

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
          user.userID = r.userID;
          user.token = r.accessToken;
          populateUser.getUser(user.userID);
          populateBR.getBaseline();
          populateBR.getEvents();
        }
    });
  }

  var populateBR = function(){
    function getBaseline(){
      FB.api('/badracket', function(data) {
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
        console.log(albums);
        console.log(albums.length);
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

  var populateUser = function(){
    function getUser(userID){
      FB.api( '/' + userID, function(data) {
        user.first_name = data.first_name;
        user.last_name = data.last_name;
        user.loaded = true;
      });
     }

      return {
        getUser : getUser
      };

  }();


  var UI = function(){
    var handlers = {};
    var bindUI = {};

    return {
      handers : handlers,
      bindUI : bindUI
    };
  }();

    return {
      init : init,
      user : user,
      BR : BR,
      UI : UI,
      populateBR : populateBR,
      populateUser : populateUser
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



// function login() {
//     FB.login(function(response) {
//         if (response.authResponse) {
//           fbToken = response.authResponse.accessToken;
//           br_facebook.token = fbToken;
//         } else {
//             // cancelled
//         }
//     }, { scope:'email,user_activities,friends_activities,friends_likes,friends_location,rsvp_event,user_events'});
// }

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