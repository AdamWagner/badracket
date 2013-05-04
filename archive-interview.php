<?php
/**
 * @package   WordPress
 * @subpackage  Starkers
 * @since     Starkers 4.0
 */
?>

<?php get_template_part('parts/clusters/page-bootstrap-top'); ?>


<section class="pink-cream padded-mobile-1">
  <h2>Interviews</h2>

  <ul class="posts">
  <?php while (have_posts() ) : the_post(); ?>
      <li class="post-item">
        <header class="bottom0">
          <h3 class="bottom0"><a href="<?php esc_url( the_permalink() ); ?>" title="Permalink to <?php the_title(); ?>" rel="bookmark"><?php the_title(); ?></a></h3>
        </header>
        <span class="caption">Interviewed by <?php the_author(); ?> on <time datetime="<?php the_time( 'Y-m-D' ); ?>" pubdate><?php the_date(); ?></time></span>
      </li>

     <?php endwhile; // end of loop ?>
  </ul>

</section>

<?php get_template_part('parts/clusters/page-bootstrap-bottom'); ?>