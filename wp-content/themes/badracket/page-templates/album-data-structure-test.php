<?php
/**
 * Template Name: album-data-stucture-test
 * @package   WordPress
 * @subpackage  Starkers
 * @since     Starkers 4.0
 */
?>

<?php get_template_part('parts/shared/html-header'); ?>

<?php  get_template_part('parts/shared/header'); ?>


<h1>Album data structure test</h1>

<a id="json_click_handler" href="#"> Click here to do JSON request! We'll get the 10 most recent posts as JSON </a>
<div id="json_response_box"></div>


<?php 
    // read id3 tag of uploaded mp3
    // http://code.google.com/p/php-reader/wiki/ID3v2
    // http://www.codediesel.com/pear/reading-mp3-file-tags-in-php/
?>






<?php get_template_parts( array( 'parts/shared/footer','parts/shared/html-footer') ); ?>
