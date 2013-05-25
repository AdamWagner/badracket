<?php
/**
 *
 * @package   WordPress
 * @subpackage  Starkers
 * @since     Starkers 4.0
 */
?>
<?php get_template_part('parts/clusters/page-bootstrap-top'); ?>




<?php
  $this_eng = get_the_title();
  $albums = array();

  query_posts(array('post_type' => 'album', 'posts_per_page' => 99  ) );

    while (have_posts()) : the_post();

    $engineer = wp_get_post_terms($post->ID, 'engineer', array("fields" => "names"));
    $eng_name = $engineer[0];

    if ($eng_name == $this_eng) {
      $title = get_the_title();
      $link = get_permalink();
      $artist = get_post_meta($post->ID, '_br_artist', true);
      $cover = get_post_meta($post->ID, '_br_cover_url', true);

      $this_album = array(
        'title' => $title,
        'link' => $link,
        'cover' => $cover,
        'artist' => $artist
      );

      array_push($albums, $this_album);
    }

  endwhile;
  wp_reset_query();
?>



<section class="pink-cream">
  <article class="longform-text">

  <?php if ( have_posts() ) while ( have_posts() ) : the_post(); ?>

  <?php // Main Bio
    $headshot = wp_get_attachment_url(get_post_meta($post->ID, '_br_headshot', true));
    $description = get_post_meta($post->ID, '_br_description', true);
    $client_list = get_post_meta($post->ID, '_br_client_list', true);
  ?>
  <div class="group staff-meta bottom2 border-bottom">
    <img class="pull-right staff-headshot lazyload_img fade" data-src="<?php echo $headshot; ?>" src="data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACH/C1hNUCBEYXRhWE1QAz94cAAsAAAAAAEAAQBAAgJEAQA7"  alt="">
    <div class="meta-text">
      <h1 class=" bottom0 album-page-title" data-album-title="<?php the_title();?>"><?php the_title(); ?></h1>
      <p class="bottom0 top05"><?php echo $description ?></p>

      <?php if ( count($client_list) > 1 ): ?>
      <p class="bottom0">Projects: <?php echo count($client_list) ?></p>
      <?php endif; ?>

    </div>
  </div>


  <div class="bio top1">
    <?php the_content(); ?>
  </div>



  <?php // Albums in store section ?>
  <?php if (count($albums)):?>
  <div class="section-divider"><div>Albums in store</div></div>
  <div class="top1 group p-5-9 s-2 m-3 b-4 h-5 padded ">
    <?php
      foreach ( $albums as $album ) {
     echo '<div class="grid album" data-album-title="'. $album['title'].'">
       <div class="album-cover playable">
         <div class="play"></div>
         <div class="pause"></div>
         <img class="album-cover-img lazyload_img fade" data-src="'. $album['cover'].'" alt="'. $album['title'].' - '. $album['artist'].'"src="data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACH/C1hNUCBEYXRhWE1QAz94cAAsAAAAAAEAAQBAAgJEAQA7"  alt="<?php echo $artist; ?> - <?php echo $albumName; ?>"/>
       </div>
       <a class="link-to-album" href="'. $album['link'].'">
           <div class="album-meta">
             <span data-icon="s" class="speaker-indicator"></span>
             <div class="album-title">'. $album['title'].'</div>
             <div class="artist-name">'. $album['artist'].'</div>
           </div>
       </a>
     </div>';
      } ?>
   </div>
   <?php endif; ?>



  <?php

  if ( count($client_list) > 1 ): ?>
  <div class="section-divider"><div>Client list</div></div>
  <?php
    echo '<ul class="client-list">';
      foreach ( $client_list as $client ) { echo '<li>'. $client . '</li>'; }
    echo '</ul>';
  endif;
  ?>

  <?php endwhile; ?>
  </article>
</section>
<?php get_template_part('parts/clusters/page-bootstrap-bottom'); ?>