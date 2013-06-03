<?php
/**
 * The template for displaying Author Archive pages
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

	<?php if ( have_posts() ): the_post(); ?>

	<h2>Author Archives: <?php echo get_the_author() ; ?></h2>

	<?php if ( get_the_author_meta( 'description' ) ) : ?>
	<?php echo get_avatar( get_the_author_meta( 'user_email' ) ); ?>
	<h3>About <?php echo get_the_author() ; ?></h3>
	<?php the_author_meta( 'description' ); ?>
	<?php endif; ?>

	<ul class="posts">
	<?php rewind_posts(); while ( have_posts() ) : the_post(); ?>
		<li class="post-item">
			<header class="bottom0">
			  <h3 class="bottom0"><a href="<?php esc_url( the_permalink() ); ?>" title="Permalink to <?php the_title(); ?>" rel="bookmark"><?php the_title(); ?></a></h3>
			</header>
		    <span class="caption">Written by <?php the_author(); ?> on <time datetime="<?php the_time( 'Y-m-D' ); ?>" pubdate><?php the_date(); ?></time></span>
			<?php the_excerpt(); ?>
		</li>
	<?php endwhile; ?>
	</ul>

	<?php else: ?>
	<h2>No posts to display for <?php echo get_the_author() ; ?></h2>	
	<?php endif; ?>

</section>

<?php get_template_part('parts/clusters/page-bootstrap-bottom'); ?>
