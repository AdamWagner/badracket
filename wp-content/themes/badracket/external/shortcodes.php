<?php



// disable wpAutoP inside shortcodes

function parse_shortcode_content( $content ) {

   /* Parse nested shortcodes and add formatting. */
    $content = trim( do_shortcode( shortcode_unautop( $content ) ) );

    /* Remove '' from the start of the string. */
    if ( substr( $content, 0, 4 ) == '' )
        $content = substr( $content, 4 );

    /* Remove '' from the end of the string. */
    if ( substr( $content, -3, 3 ) == '' )
        $content = substr( $content, 0, -3 );

    /* Remove any instances of ''. */
    $content = str_replace( array( '<p></p>' ), '', $content );
    $content = str_replace( array( '<p>  </p>' ), '', $content );

    return $content;
}


remove_filter( 'the_content', 'wpautop' );
add_filter( 'the_content', 'wpautop' , 99);
add_filter( 'the_content', 'shortcode_unautop',100 );






//Carousel
function carousel($atts, $content = null) {

  extract(shortcode_atts(array("id" => ''), $atts) );

  return '
  <div id="'. $id . '" class="carousel">
    <div class="carousel-inner">'.do_shortcode($content).'</div>
    <a class="carousel-control left" href="#'. $id . '" data-slide="prev">&#9664;</a>
    <a class="carousel-control right" href="#'. $id . '" data-slide="next">&#9654;</a>
  </div> ';
}
add_shortcode('carousel','carousel');



// Inline Audio Player
function inline_audio($atts, $content = null) {
  extract(shortcode_atts(array("url" => '', "title" => ''), $atts));

  return '
  <div class="inline-player group" data-song-url="'.$url.'"><span data-icon="m" class="inline-play-pause"></span><span class="inline-player-title">'.$title.'</span></div>';
}
add_shortcode('inline-audio','inline_audio');


?>