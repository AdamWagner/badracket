<?php
/**
 * The Template for displaying all single posts
 *
 * Please see /external/starkers-utilities.php for info on get_template_parts()
 *
 * @package 	WordPress
 * @subpackage 	Starkers
 * @since 		Starkers 4.0
 */
?>

<?php get_template_part('parts/clusters/page-bootstrap-top'); ?>

<?php if ( have_posts() ) while ( have_posts() ) : the_post(); ?>

  <section class="cream album-page-section padded-mobile-1">
    <h1><?php the_title(); ?></h1>
    <?php the_content(); ?>
  </section>

<?php endwhile; ?>

<?php get_template_part('parts/clusters/page-bootstrap-bottom'); ?>