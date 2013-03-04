<?php
/**
 * Template Name: Videos
 * @package   WordPress
 * @subpackage  Starkers
 * @since     Starkers 4.0
 */
?>

<?php get_template_part('parts/shared/html-header'); ?>


<body data-state="default-state">
  <div data-src="http://badracket.com/wp-content/themes/badracketv4/images/bad-racket-bg-image2.jpg" class="bg lazyload fade-this"></div>

  <div class="badracket-window">

     <?php  get_template_part('parts/header-desktop');?>
     <?php  get_template_part('parts/header-mobile');?>

    <div  class="app-main page-width group ">

     <?php  get_template_part('parts/nav');?>

      <div id="home-main"class="main-content scrollable group updatable">
      <div class="loading-fade"> <?php get_template_part('parts/loading');?> </div>
      <section class="red bottom1">
        <div class="video-container group">

          <div class="section-subtitle video-container-header group">
            <div class="video-name pull-left padded-sides">Videos</div>
          </div>

            <div class="s-1 m-3 b-3 h-4 padded">
              <?php get_template_part('parts/content-loops/video-loop');?>
            </div>

        </div>  <?php // end videos ?>
      </section>
      </div>
    </div> <?php // end app-main ?>
  </div> <?php //end badracket-window ?>




<?php get_template_parts( array( 'parts/shared/footer','parts/shared/html-footer') ); ?>

