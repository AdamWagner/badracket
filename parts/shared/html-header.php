<!DOCTYPE HTML>
<head>
	<title><?php  global $page, $paged; wp_title( '|', true, 'right' );   ?></title> <!-- Title optimized for use with Yoast SEO plugin -->
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
  	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0"><!-- Remove if you're not building a responsive site. (But then why would you do such a thing?) -->
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
	<link rel="shortcut icon" href="<?php echo get_stylesheet_directory_uri(); ?>/img/favicon.ico"/>
	<?php wp_head(); ?>
  <script>
  var BADRACKET_themePath = '<?php echo get_bloginfo('template_directory');?>';
  </script>
</head>
<body <?php body_class(); ?>
<div id="fb-root"></div>




<!-- Just for experimentation.  Redo this. -->

<script>
  function login() {
      FB.login(function(response) {
          if (response.authResponse) {
              console.log(response);
          } else {
              // cancelled
          }
      }, { scope:'email,user_actions.music,friends_actions.music'});
  }
  
  function testAPI() {
      console.log('Welcome!  Fetching your information.... ');
      FB.api('/me', function(response) {
          // console.log('Good to see you, ' + response.name + '.');
          // console.log(response);
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
        get_music_listens();
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
</script>




<!-- End facebook experiment -->





