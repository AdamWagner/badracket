<!DOCTYPE HTML>
<html xmlns:fb="http://www.facebook.com/2008/fbml">
<head>
  <title><?php  global $page, $paged; wp_title( '|', true, 'right' );   ?></title> <!-- Title optimized for use with Yoast SEO plugin -->
  <meta charset="<?php bloginfo( 'charset' ); ?>" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1 maximum-scale=1">

  <!-- <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" /> -->
  <!-- <link rel="shortcut icon" href="<?php echo get_stylesheet_directory_uri(); ?>/img/favicon.ico"/> -->

  <!--[if lte IE 9]>
  	<link href="<?php echo get_stylesheet_directory_uri(); ?>/css/ie.css" rel="stylesheet" type="text/css">
  <![endif]-->

  <?php wp_head(); ?>

</head>

<body <?php body_class(); ?>>

<div class="ie-message">
	<h1>Your browser is not supported</h1>
	<p>We're sorry, but badracket.com supports modern browsers only. To use the site, switch to Chrome, Firefox, or IE10.</p>
</div>

<div id="fb-root"></div>