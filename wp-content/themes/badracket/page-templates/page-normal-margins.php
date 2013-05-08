<?php
/**
 *
 * Template Name: Normal margin page
 * @package   WordPress
 * @subpackage  Starkers
 * @since     Starkers 4.0
 */
?>
<?php get_template_part('parts/clusters/page-bootstrap-top'); ?>

<section class="pink-cream">
  <article class="longform-text">
  <?php if ( have_posts() ) while ( have_posts() ) : the_post(); ?>
    <h2><?php the_title(); ?></h2>
    <?php the_content(); ?>
  <?php endwhile; ?>
  </article>
</section>

<?php get_template_part('parts/clusters/page-bootstrap-bottom'); ?>