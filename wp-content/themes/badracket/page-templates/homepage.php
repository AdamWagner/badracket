<?php
/**
 * Template Name: homepage
 * @package   WordPress
 * @subpackage  Starkers
 * @since     Starkers 4.0
 */
?>


<?php get_template_part('parts/clusters/page-bootstrap-top'); ?>

<!-- <section class="dark" id="welcome">
  <h1>Welcome to the new Bad Racket.</h1>
  <p></p>

</section> -->

<section class="red border-bottom-red border-top-red">
<?php // ALBUMS ?>
 <div class="album-container bottom1">
   <div class="section-subtitle pt0 album-container-header group ">
     <div class="hidden-mobile album-name pull-left padded-sides">Music from our recording community</div>
     <div class="hidden-big album-name pull-left padded-sides">Record store</div>
     <a href="<?php echo get_post_type_archive_link( 'album' ); ?>" class="pill-button see-albums pull-right padded-sides">All Albums &nbsp; <span>▶</span></a>
   </div>
   <div class="group p-5-9 s-3 m-5 b-5 h-6 single-row padded">
    <?php get_template_part('parts/content-loops/album-loop');?>
   </div>

 </div> <?php // end albums ?>

<?php // VIDEOS ?>
  <div class="video-container group">
    <div class="section-subtitle video-container-header group">
      <!-- <div class="video-name pull-left padded-sides">Videos</div> -->
      <a href="<?php echo get_page_link(160);?>" class="pill-button see-videos pull-right padded-sides">All Videos &nbsp; <span>▶</span></a>
    </div>
      <div id="video-container" class="s-1 m-3 b-3 h-4 single-row padded">
        <div class="loading grid">Loading videos...</div>
      </div>
  </div>  <?php // end videos ?>

  </section>

  <section class="green border-bottom-green pb3">

     <div class="section-subtitle album-container-header group border-bottom">
       <div class="album-name pull-left padded-sides">Record with Bad Racket</div>
       <a href="<?php echo get_page_link(9);?>" class="pill-button see-albums pull-right padded-sides">Explore our process&nbsp <span>▶</span></a>
     </div>
     <div class="group s-1 m-2">
       <div class="grid padded-sides limit-1 shortform-text">
         <p>A recording studio is first and foremost a performance space, and that’s where we begin. Although getting tones with fascinating audio gear and tweaking levels to make great sound excites our <a href="<?php echo get_page_link(2476);?>">inner nerd</a>, recordings are ultimately a capture of your performance. </p>
         <p>We’re very lucky to have an amazing <a href="<?php echo get_post_type_archive_link( 'staff' ); ?>">team of engineers</a> and even more fortunate to have the culture, energy, and talent of the Cleveland music community at our back. </p>
         <p><a href="mailto:play@badracket.com">Book studio time</a> by the day or a short day, not on the hour, and spend some time emerged in the music. We’ll take care of the rest. </p>
         <p>Learn more about our team and our <a href="<?php echo get_page_link(9);?>">recording process</a>, and get in touch with us to schedule a session.</p>
         
       </div>
       <div class="grid padded-sides-2">
         <img class="recording-process-image lazyload_img" src="http://d245myou62vn42.cloudfront.net/wp-content/uploads/2013/05/recording-process1.jpg" alt="Recording studio, Cleveland style">
       </div>
     </div>



  </section>


  <section class="orange pb3">

     <div class="section-subtitle album-container-header group border-bottom">
       <div class="album-name pull-left padded-sides">Community</div>
       <a href="<?php echo get_post_type_archive_link( 'staff' ); ?>" class="pill-button see-albums pull-right padded-sides">Team profiles &nbsp; <span>▶</span></a>
     </div>
     <div class="group s-1 m-2">
       <div class="grid padded-sides-2">
         <img class="recording-process-image lazyload_img" src="http://d245myou62vn42.cloudfront.net/wp-content/uploads/2013/05/community1.jpg" alt="Recording studio, Cleveland style">
       </div>
       <div class="grid padded-sides limit-1 shortform-text">
         <p>Music Fans, you can find lots of <a href="<?php echo get_post_type_archive_link( 'album' ); ?>">music</a> and <a href="<?php echo get_page_link(160);?>">videos</a> here at Bad Racket. Musicians there’s ton’s of toys and time to make some awesome recordings, shows, videos with our team of recording engineers.</p> 
         <p>The Cleveland music community works together in a simple, amazing way. Thanks to you for being a part of it. </p>
         
       </div>
     </div>


  </section>
<?php get_template_part('parts/clusters/page-bootstrap-bottom'); ?>

