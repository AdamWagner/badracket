<?php get_template_part('parts/shared/html-header'); ?>
<body data-state="default-state" >
<div data-src="http://badracket.com/wp-content/themes/badracketv4/images/bad-racket-bg-image2.jpg" class="bg lazyload fade-this"></div>

<div class="badracket-window">

  <div class="logo" align="center">
      <div class="name"> <img src="<?php echo get_bloginfo('template_url') ?>/images/logo-big.svg" alt=""> </div>
  </div>



<div  class="app-main page-width group ">
<?php  get_template_part('parts/header-desktop');?>
<?php  get_template_part('parts/header-mobile');?>



<?php  get_template_part('parts/nav');?>
<?php  get_template_part('parts/info');?>

<div id="home-main"class="main-content scrollable group updatable">
