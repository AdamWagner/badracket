<?php
/**
 * Template Name: blog-archive
 * @package   WordPress
 * @subpackage  Starkers
 * @since     Starkers 4.0
 */
?>

<?php get_template_part('parts/clusters/page-bootstrap-top'); ?>

<?php
  $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;


  if ($paged == 1) { // if on first page, use offset
     $args = array(
         'offset'         =>'1',
         'paged'          => $paged,
         'posts_per_page' =>'6',
     );
  } else { // if not on first page, don't use offset b/c it breaks pagination
      $args = array(
          'posts_per_page' =>'6',
          'paged'          => $paged,
      );
  }

  $wp_query = new WP_Query($args);
?>

<section class="pink-cream">

<h2>News & Articles</h2>

<ul class="posts">
<?php while (have_posts() ) : the_post(); ?>
    <li>
      <header class="bottom0">
        <h3><a href="<?php esc_url( the_permalink() ); ?>" title="Permalink to <?php the_title(); ?>" rel="bookmark"><?php the_title(); ?></a></h3>
      </header>
      <?php global $more; $more = 0;?>
      <?php the_excerpt(); ?>
      <span class="caption">Written on <time datetime="<?php the_time( 'Y-m-D' ); ?>" pubdate><?php the_date(); ?></time> by <?php the_author(); ?></span>
    </li>

   <?php endwhile; // end of loop ?>
</ul>

  <?php
  global $wp_query;

$big = 999999999; // need an unlikely integer

echo paginate_links( array(
  'base' => str_replace( $big, '%#%', esc_url( get_pagenum_link( $big ) ) ),
  'format' => '?paged=%#%',
  'current' => max( 1, get_query_var('paged') ),
  'total' => $wp_query->max_num_pages
) );

  ?>
  <?php wp_reset_query()?>




</section>

<?php get_template_part('parts/clusters/page-bootstrap-bottom'); ?>