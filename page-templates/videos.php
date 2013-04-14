<?php
/**
 * Template Name: Videos
 * @package   WordPress
 * @subpackage  Starkers
 * @since     Starkers 4.0
 */
?>

<?php get_template_part('parts/clusters/page-bootstrap-top'); ?>

<div class="vimeo-container">
  <div class="loading-container"> <span class="loading-spinner style-2"> </span> <div class="loading-messages"></div> </div>
  <div class="iframe-wrap"></div>
</div>

<section class="red bottom1">
  <div class="video-container group">

    <div class="section-subtitle video-container-header group">
      <div class="video-name pull-left padded-sides">Videos</div>
    </div>

    <div id="video-container" class="s-1 m-3 b-3 h-4 padded group"> </div>

  </div>  <?php // end videos ?>
</section>
<?php get_template_part('parts/clusters/page-bootstrap-bottom'); ?>