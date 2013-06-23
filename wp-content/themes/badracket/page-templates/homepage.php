<?php
/**
 * Template Name: homepage
 * @package   WordPress
 * @subpackage  Starkers
 * @since     Starkers 4.0
 */
?>


<?php get_template_part('parts/clusters/page-bootstrap-top'); ?>

<?php // get_template_part('parts/audio-player'); ?>


<ng-view></ng-view>



<?php get_template_part('parts/clusters/page-bootstrap-bottom'); ?>