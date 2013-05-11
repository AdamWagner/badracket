<?php
/**
 * @package   WordPress
 * @subpackage  Starkers
 * @since     Starkers 4.0
 */
?>

<?php get_template_part('parts/clusters/page-bootstrap-top'); ?>


<section class="orange padded-mobile-1">

<div class=" group p-5-9 s-1 m-3 b-4 h-5 padded ">
<?php while (have_posts() ) : the_post();
   $headshot = wp_get_attachment_url(get_post_meta($post->ID, '_br_headshot', true));
   $description = get_post_meta($post->ID, '_br_description', true);
?>

  <a href="<?php esc_url( the_permalink() ); ?>" title="Permalink to <?php the_title(); ?>" rel="bookmark">
    <div class="grid">
       <img class="album-cover-img lazyload_img fade" data-src="<?php echo $headshot; ?>" src="data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACH/C1hNUCBEYXRhWE1QAz94cAAsAAAAAAEAAQBAAgJEAQA7"  alt="<?php echo $artist; ?> - <?php echo $albumName; ?>"/>
      <header class="bottom0">
        <h3 class="bottom0"><?php the_title(); ?></h3>
        <p class="staff-description top0"><?php echo $description; ?></p>
      </header>
    </div>
    </a>

   <?php endwhile; // end of loop ?>


</div>

</section>

<?php get_template_part('parts/clusters/page-bootstrap-bottom'); ?>