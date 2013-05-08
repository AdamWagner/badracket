<?php
/**
 *
 * Template Name: Gear
 * @package   WordPress
 * @subpackage  Starkers
 * @since     Starkers 4.0
 */
?>
<?php get_template_part('parts/clusters/page-bootstrap-top'); ?>

<section class="pink-cream">
  <article >
  <?php if ( have_posts() ) while ( have_posts() ) : the_post(); ?>
    <h1><?php the_title(); ?></h1>
    <?php the_content(); ?>

  <?php endwhile; ?>
  </article>
</section>

<?php get_template_part('parts/clusters/page-bootstrap-bottom'); ?>