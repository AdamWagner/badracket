<?php
/**
 * @package   WordPress
 * @subpackage  Starkers
 * @since     Starkers 4.0
 */
?>

<?php get_template_part('parts/shared/html-header'); ?>

<?php get_template_part('parts/clusters/page-bootstrap-top'); ?>
<section class="red bottom1">


  <div class="album-container ">

    <div class="section-subtitle album-container-header group ">
      <div class="album-name pull-left padded-sides">Albums</div>
    </div>

    <div class="overflow-carousel">
      <div class="overflow-wrapper group p-5-9 s-3 m-5 b-5 h-6 padded">

      <?php get_template_part('parts/content-loops/album-loop');?>

    </div>
  </div>
</div> <?php // end albums ?>

</section>

<?php get_template_part('parts/clusters/page-bootstrap-bottom'); ?>