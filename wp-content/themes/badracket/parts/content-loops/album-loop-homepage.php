<?php
    query_posts(array('post_type' => 'album', 'posts_per_page' => 7 ) );

    while (have_posts()) : the_post();

    $albumName = get_the_title();
    $artist = get_post_meta($post->ID, '_br_artist', true);
    $cover = get_post_meta($post->ID, '_br_cover_url', true);
    ?>

    <div class="grid album" data-album-title="<?php echo $albumName; ?>">
       <div class="album-cover playable">
         <div class="play"></div>
         <div class="pause"></div>
         <!-- <div class="album-cover-img lazyload fade ratio-1-1" data-src="<?php echo $cover; ?>" alt="<?php echo $artist; ?> - <?php echo $albumName; ?>"> </div> -->
         <img class="album-cover-img lazyload_img fade" data-src="<?php echo $cover; ?>" src="data:image/gif;base64,R0lGODdhAQABAPAAAP///wAAACH/C1hNUCBEYXRhWE1QAz94cAAsAAAAAAEAAQBAAgJEAQA7"  alt="<?php echo $artist; ?> - <?php echo $albumName; ?>"/>
       </div>
       <a class="link-to-album" href="<?php echo the_permalink(); ?>">
           <div class="album-meta">
             <span data-icon="s" class="speaker-indicator"></span>
             <div class="album-title"><?php echo $albumName; ?></div>
             <div class="artist-name"><?php echo $artist; ?></div>
           </div>
       </a>
     </div>
    <?php endwhile; ?>