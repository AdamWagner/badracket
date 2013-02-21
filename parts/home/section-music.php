<div class="album-container ">

  <div class="section-subtitle album-container-header group ">
    <div class="album-name pull-left padded-sides">Albums</div>
    <a href="" class="see-albums pull-right padded-sides">See All ></a>
  </div>

  <div class="overflow-carousel">
    <div class="overflow-wrapper group p-5-9 s-3 m-5 b-5 h-7 single-row padded">

    <?php
        global $page_albums;
        $page_albums = array();
        query_posts(array('post_type' => 'album' ) );

        while (have_posts()) : the_post();

        $albumName = get_the_title();
        $artist = get_post_meta($post->ID, '_br_artist', true);
        $cover = get_post_meta($post->ID, '_br_cover_url', true);


        echo '<div class="grid album">
           <div class="album-cover img-container playable"> 
             <div class="play"></div> 
             <div class="album-cover-img lazyload fade" data-src="'.$cover.'" alt="'.$artist.' - '.$albumName.'">
                <img class="placeholder" src="'.get_template_directory_uri().'/images/ratio-1-1.gif" alt="">
             </div> 
           </div> 
           <div class="album-meta">
             <div class="album-title">'.$albumName.'</div>
             <div class="artist-name">'.$artist.'</div>
           </div>
         </div>';

        endwhile;

        // read id3 tag of uploaded mp3
        // http://code.google.com/p/php-reader/wiki/ID3v2
        // http://www.codediesel.com/pear/reading-mp3-file-tags-in-php/
    ?>
  </div>
</div>


</div> <?php // end albums ?> 

