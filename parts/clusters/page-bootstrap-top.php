<?php get_template_part('parts/shared/html-header'); ?>
<body data-state="default-state" >
<div data-src="http://badracket.com/wp-content/themes/badracketv4/images/bad-racket-bg-image2.jpg" class="bg lazyload fade-this"></div>

<div class="badracket-window welcome-state">

  <div class="logo" align="center">
      <div class="name"> <img src="<?php echo get_bloginfo('template_url') ?>/images/logo-big.svg" alt=""> </div>

    <section class="red welcome" >
      <h1>Welcome to the new Bad Racket</h1>
      <p class="top1">We've upgraded the site to champion Cleveland music scene. Inside, you can listen to new local music, buy records, watch music videos, and rsvp to upcoming shows and concerts. It's all been built to be fast, easy, and better than before.</p>
      <p class="bottom0">Enjoy,</p>
      <p class="top0 bottom0"><em>The Bad Racket Team</em></p>
    </section>

    <div class="welcome-button">
      Step inside
    </div>

  </div>



<div  class="app-main page-width group ">
<?php  get_template_part('parts/header-desktop');?>
<?php  get_template_part('parts/header-mobile');?>



<?php  get_template_part('parts/nav');?>
<?php  get_template_part('parts/info');?>

<div id="home-main"class="main-content scrollable group updatable">
