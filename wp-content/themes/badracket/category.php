<?php
/**
 * The template for displaying Category Archive pages
 *
 * Please see /external/starkers-utilities.php for info on get_template_parts()
 *
 * @package 	WordPress
 * @subpackage 	Starkers
 * @since 		Starkers 4.0
 */
?>

<?php get_template_part('parts/clusters/page-bootstrap-top'); ?>

<section class="pink-cream">
		<?php if ( have_posts() ): ?>
		<h2>Tag Archive: <?php echo single_tag_title( '', false ); ?></h2>
		<ul class="posts">
		<?php while ( have_posts() ) : the_post(); ?>
		    <li class="post-item">
		      <header class="bottom0">
		        <h3 class="bottom0"><a href="<?php esc_url( the_permalink() ); ?>" title="Permalink to <?php the_title(); ?>" rel="bookmark"><?php the_title(); ?></a></h3>
		      </header>
		      <!-- <?php global $more; $more = 0;?> -->
		      <!-- <?php the_excerpt(); ?> -->
		      <span class="caption">Written by <?php the_author(); ?> on <time datetime="<?php the_time( 'Y-m-D' ); ?>" pubdate><?php the_date(); ?></time></span>
		    </li>		
		<?php endwhile; ?>
		</ul>
		<?php else: ?>
		<h2>No posts to display in <?php echo single_tag_title( '', false ); ?></h2>
		<?php endif; ?>
</section>
<?php get_template_part('parts/clusters/page-bootstrap-bottom'); ?>
