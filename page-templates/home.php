<?php
/**
 * Template Name: Home
 * @package   WordPress
 * @subpackage  Starkers
 * @since     Starkers 4.0
 */
?>





<?php get_template_part('parts/shared/html-header'); ?>

<body data-state="default-state">
  <?php wp_mail('me@example.net', 'The subject from local', 'The message'); ?>
  <div data-src="http://badracket.com/wp-content/themes/badracketv4/images/bad-racket-bg-image2.jpg" class="bg lazyload fade-this"></div>

  <div class="badracket-window">

     <?php  get_template_part('parts/header-desktop');?>
     <?php  get_template_part('parts/header-mobile');?>


    <div  class="app-main page-width group ">

     <?php  get_template_part('parts/nav');?>

      <div id="home-main"class="main-content scrollable group updatable">
      <section class="red bottom1">


      <?php // ALBUMS ?>
       <div class="album-container bottom1">
         <div class="section-subtitle album-container-header group ">
           <div class="album-name pull-left padded-sides">Albums</div>
           <a href="<?php echo get_post_type_archive_link( 'album' ); ?>" class="see-albums pull-right padded-sides">See All ></a>
         </div>
         <div class="overflow-carousel">
           <div class="overflow-wrapper group p-5-9 s-3 m-5 b-5 h-7 single-row padded">
           <?php get_template_part('parts/content-loops/album-loop');?>
         </div>
       </div>

       </div> <?php // end albums ?>

      <?php // VIDEOS ?>
        <div class="video-container group">
          <div class="section-subtitle video-container-header group">
            <div class="video-name pull-left padded-sides">Videos</div>
            <a href="" class="see-videos pull-right padded-sides">See All ></a>
          </div>
            <div id="video-container" class="s-1 m-3 b-3 h-4 single-row padded"> </div>
        </div>  <?php // end videos ?>

        </section>

        <section class="green bottom1" style="height:400px;">

           <div class="section-subtitle album-container-header group ">
             <div class="album-name pull-left padded-sides">Record</div>
             <a href="<?php echo get_post_type_archive_link( 'album' ); ?>" class="see-albums pull-right padded-sides">See All ></a>
           </div>



        </section>


        <section class="orange" style="height:400px;">

           <div class="section-subtitle album-container-header group ">
             <div class="album-name pull-left padded-sides">Team</div>
             <a href="<?php echo get_post_type_archive_link( 'album' ); ?>" class="see-albums pull-right padded-sides">See All ></a>
           </div>



        </section>

      </div> <?php // end home-main ?>
    </div> <?php // end app-main ?>
  </div> <?php //end badracket-window ?>






<?php get_template_parts( array( 'parts/shared/footer','parts/shared/html-footer') ); ?>

