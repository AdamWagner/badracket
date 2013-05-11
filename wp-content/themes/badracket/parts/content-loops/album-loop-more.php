<?php
    query_posts(array('post_type' => 'album' ) );

    while (have_posts()) : the_post();

    $albumName = get_the_title();
    $artist = get_post_meta($post->ID, '_br_artist', true);
    $cover = get_post_meta($post->ID, '_br_cover_url', true);
    ?>

    <a data-album="<?php echo $albumName; ?>"href="<?php echo the_permalink();?>">
        <div class="grid album">
            <div class="album-cover-img lazyload fade ratio-1-1" data-src="<?php echo $cover; ?>" alt="<?php echo $artist; ?> - <?php echo $albumName; ?>"> </div>

           <div class="album-meta">
             <div class="album-title"><?php echo $albumName; ?></div>
             <div class="artist-name"><?php echo $artist; ?></div>
           </div>
       </div> 
    </a>
    <?php endwhile; ?>