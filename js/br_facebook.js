// function getBatch(){
//   var dfd = new $.Deferred();
//   FB.api('/', 'POST', {
//      batch: [
//           { relative_url: 'me?fields=likes,events,email,gender,first_name,last_name,username,picture'},
//           { relative_url: 'badracket?fields=likes,events,email,gender,first_name,last_name,username,picture'},
//      ]
//      }, function (r) { dfd.resolve(r); } );

//   return dfd.promise();
// }


function call_fb(path){
  var dfd = new $.Deferred();
  FB.api(path , function(r){ dfd.resolve( r ); });
  return dfd.promise();
}

function getMe(){
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
    'location'
  ];
  return call_fb( 'me?fields=' + fields.join(',') );
}

function getBR(){
  return call_fb('/badracket');
}

function fbEnsureInit( callback ) {
     if ( !window.FB || !br_facebook.config.accessToken ) {
         setTimeout( function() { fbEnsureInit( callback ); }, 50);
     } else {
         if ( callback ) { callback(); }
     }
 }


var br_facebook = function(){

  var config = {
    accessToken : null
  };

  var user = {
    token : null,
    userID : null,
    first_name : null,
    last_name : null,
    email : null,
    likesBR : null
  };

  var BR = {
    id : null,
    pageName : null,
    link : null,
    likeCount : null,
    events : [],
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
      // the user is logged in and has authenticated your
      // app, and response.authResponse supplies
      // the user's ID, a valid access token, a signed
      // request, and the time the access token 
      // and signed request each expire
      var uid = response.authResponse.userID;
      config.accessToken = response.authResponse.accessToken;

    } else if (response.status === 'not_authorized') {
      // the user is logged in to Facebook, 
      // but has not authenticated your app
    } else {
      // the user isn't logged in to Facebook.
    }
   });

  }

    var permissions = 'email,user_activities,friends_activities,user_likes,friends_likes,friends_location,rsvp_event,user_events';

    function login() {
        FB.login(function(response) {
           $.when( getMe(), getBR() ).done(function(r1,r2){
            console.log(r1); console.log(r2);
          });
        }, { scope: permissions });
    }


    var populateUser = function ( userID ) {

          function isFan( userLikes ) {
           _.each(userLikes, function(el){
             if (el.name === BR.pageName) { user.likesBR = true; }
           });
          }

         return {
          isFan : isFan

         };

        }();


    return {
      config : config,
      init : init,
      login : login,
      populateUser : populateUser
    };

}();


function later(){
  $.when( getBR(), getMe() ).done(function(r, r2){
    console.log(r);
    console.log(r2);
  });
}


