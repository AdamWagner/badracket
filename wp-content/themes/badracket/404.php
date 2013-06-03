<?php
/**
 * The template for displaying 404 pages (Not Found)
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
	<article class="longform-text">
		<h2 class="bottom1">Uh-oh</h2>
		<p>We couldn't find this page. Try heading to the <a href="<?php echo get_bloginfo('url'); ?>">homepage</a> to find what you're looking for or email us at <a href="mailto:play@badracket.com">play@badracket.com</a>.</p>
	</article>
</section>

<?php get_template_part('parts/clusters/page-bootstrap-bottom'); ?>
