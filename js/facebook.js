  var fbToken;
  function login() {
      FB.login(function(response) {
          if (response.authResponse) {
            fbToken = response.authResponse.accessToken;
            console.log(fbToken);
          } else {
              // cancelled
          }
      }, { scope:'email,user_activities,friends_activities,friends_likes,friends_location'});
  }

 function logout() {
    console.log('fuck you');
     FB.api('https://graph.facebook.com/me?access_token='+fbToken, function(response){
      console.log(response);
    });

 } 

  function testAPI() {
      console.log('Welcome!  Fetching your information.... ');
      FB.api('/me', function(response) {
          // console.log('Good to see you, ' + response.name + '.');
          console.log(response);
      });
      FB.api('/me/friends', function(response) {
          // console.log(response);
      });
      FB.api('/me/permissions', function (response) {
          console.log(response);
      } );
  }
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '182655285084916', // App ID
      channelUrl : '//WWW.BADRACKET.COM/channel.html', // Channel File
      status     : true, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      xfbml      : true  // parse XFBML
    });

    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        // !!!!!! Initialize api calls here
        // get_music_listens();
        get_friends();
      } else if (response.status === 'not_authorized') {
        login();
      } else {
        login();
      }
     });

  };

  // Load the SDK Asynchronously
  (function(d){
     var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement('script'); js.id = id; js.async = true;
     js.src = "//connect.facebook.net/en_US/all.js";
     ref.parentNode.insertBefore(js, ref);
   }(document));