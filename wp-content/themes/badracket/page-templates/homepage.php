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

<section class="red bottom1">
<?php // ALBUMS ?>
 <div class="album-container bottom1">
   <div class="section-subtitle pt0 album-container-header group ">
     <div class="album-name pull-left padded-sides">Record store</div>
     <a href="<?php echo get_post_type_archive_link( 'album' ); ?>" class="pill-button see-albums pull-right padded-sides">All Albums &nbsp; <span>▶</span></a>
   </div>
   <div class="overflow-carousel">
     <div class="overflow-wrapper group p-5-9 s-3 m-5 b-5 h-6 single-row padded">
     <?php get_template_part('parts/content-loops/album-loop');?>
   </div>
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

  <section class="green bottom1 pb3">

     <div class="section-subtitle album-container-header group border-bottom">
       <div class="album-name pull-left padded-sides">Record</div>
       <a href="<?php echo get_page_link(9);?>" class="pill-button see-albums pull-right padded-sides">Explore our process&nbsp <span>▶</span></a>
     </div>
       <div class="txt-col-2 padded-sides limit-1">
       <p>We love seeing music live, when people get together and pour out lyrics over chords into a room full of strangers. There’s something essential in four walls that makes music sound so good. Our space is inspired by that idea. It’s not too fancy: a single acoustically treated live room with lots of space to play, a team of people that live for sound, and the tools to make silent smiles.</p>
       <p>We’ve also been lucky to record some great artists. Their talent makes this whole thing worthwhile.</p>
       <p>We’re accepting new projects.</p>
       <p>Hours are from noon to 12am Monday-Saturday, 6pm-12pm Sunday. You can find more information on rates here, give us a call, or schedule a time to come over and take a tour of the studio.</p>
     </div>



  </section>


  <section class="orange pb3">

     <div class="section-subtitle album-container-header group border-bottom">
       <div class="album-name pull-left padded-sides">Team</div>
       <a href="<?php echo get_post_type_archive_link( 'staff' ); ?>" class="pill-button see-albums pull-right padded-sides">Staff profiles &nbsp; <span>▶</span></a>
     </div>
     <div class=" group p-5-9 s-3 m-5 b-5 h-6 padded">
      <?php get_template_part('parts/content-loops/staff-loop');?>
      <div class="txt-col-2 padded-sides limit-1">
       <p>We love seeing music live, when people get together and pour out lyrics over chords into a room full of strangers. There’s something essential in four walls that makes music sound so good. Our space is inspired by that idea. It’s not too fancy: a single acoustically treated live room with lots of space to play, a team of people that live for sound, and the tools to make silent smiles.</p>
       <p>We’ve also been lucky to record some great artists. Their talent makes this whole thing worthwhile.</p>
       <p>We’re accepting new projects.</p>
       <p>Hours are from noon to 12am Monday-Saturday, 6pm-12pm Sunday. You can find more information on rates here, give us a call, or schedule a time to come over and take a tour of the studio.</p>
     </div>


  </section>
<?php get_template_part('parts/clusters/page-bootstrap-bottom'); ?>

