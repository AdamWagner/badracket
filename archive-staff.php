<?php
/**
 * @package   WordPress
 * @subpackage  Starkers
 * @since     Starkers 4.0
 */
?>

<?php get_template_part('parts/clusters/page-bootstrap-top'); ?>


<section class="cream">

<h2>Staff</h2>

<ul class="posts">
<?php while (have_posts() ) : the_post(); ?>
    <li>
      <header class="bottom0">
        <h3><a href="<?php esc_url( the_permalink() ); ?>" title="Permalink to <?php the_title(); ?>" rel="bookmark"><?php the_title(); ?></a></h3>
      </header>
      <?php global $more; $more = 0;?>
      <?php the_excerpt(); ?>
    </li>

   <?php endwhile; // end of loop ?>
</ul>



</section>

<?php get_template_part('parts/clusters/page-bootstrap-bottom'); ?>