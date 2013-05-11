<?php

	/**
	 * Starkers Utility Functions v.1.0
	 *
	 * @package 	WordPress
	 * @subpackage 	Starkers
	 * @since 		Starkers 4.0
	 *
	 * We've included a number of helper functions that we use in every theme we produce.
	 * The main one that is used in Starkers is 'add_slug_to_body_class', this will add the page or post slug to the body class
	 */

	/**
	 * Print a pre formatted array to the browser - very useful for debugging
	 *
	 * @param 	array
	 * @return 	void
	 * @author 	Keir Whitaker
	 **/
	function print_a( $a ) {
		print( '<pre>' );
		print_r( $a );
		print( '</pre>' );
	}

	/**
	 * Simple wrapper for native get_template_part()
	 * Allows you to pass in an array of parts and output them in your theme
	 * e.g. <?php get_template_parts(array('part-1', 'part-2')); ?>
	 *
	 * @param 	array 
	 * @return 	void
	 * @author 	Keir Whitaker
	 **/
	function get_template_parts( $parts = array() ) {
		foreach( $parts as $part ) {
			get_template_part( $part );
		};
	}

	/**
	 * Pass in a path and get back the page ID
	 * e.g. get_page_id_from_path('about/terms-and-conditions');
	 *
	 * @param 	string 
	 * @return 	integer
	 * @author 	Keir Whitaker
	 **/
	function get_page_id_from_path( $path ) {
		$page = get_page_by_path( $path );
		if( $page ) {
			return $page->ID;
		} else {
			return null;
		};
	}

	/**
	 * Append page slugs to the body class
	 * NB: Requires init via add_filter('body_class', 'add_slug_to_body_class');
	 *
	 * @param 	array 
	 * @return 	array
	 * @author 	Keir Whitaker
	 */
	function add_slug_to_body_class( $classes ) {
		global $post;
	   
		if( is_home() ) {			
			$key = array_search( 'blog', $classes );
			if($key > -1) {
				unset( $classes[$key] );
			};
		} elseif( is_page() ) {
			$classes[] = sanitize_html_class( $post->post_name );
		} elseif(is_singular()) {
			$classes[] = sanitize_html_class( $post->post_name );
		};

		return $classes;
	}
	
	/**
	 * Get the category id from a category name
	 *
	 * @param 	string 
	 * @return 	string
	 * @author 	Keir Whitaker
	 */
	function get_category_id( $cat_name ){
		$term = get_term_by( 'name', $cat_name, 'category' );
		return $term->term_id;
	}

  /* ========================================================================================================================
  
  Actions from oneblackcrayon
  
  ======================================================================================================================== */

// disable the admin bar
show_admin_bar(false);

// kill the admin nag
function hide_update_notice() {
    global $user_login , $user_email;
    get_currentuserinfo();
    if ($user_login != "") {
    remove_action( 'admin_notices', 'update_nag', 3 );
 }
}
add_action( 'admin_notices', 'hide_update_notice', 1 );

// category id in body and post class
function category_id_class($classes) {
	global $post;
	foreach((get_the_category($post->ID)) as $category)
		$classes [] = 'cat-' . $category->cat_ID . '-id';
		return $classes;
}
add_filter('post_class', 'category_id_class');
add_filter('body_class', 'category_id_class');


// get the first category id
function get_first_category_ID() {
	$category = get_the_category();
	return $category[0]->cat_ID;
}

// custom excerpt length
function custom_excerpt_length($length) {
	return 10;
}
add_filter('excerpt_length', 'custom_excerpt_length');


// custom excerpt ellipses for 2.9+
function custom_excerpt_more($more) {
	return '...';
}
add_filter('excerpt_more', 'custom_excerpt_more');

// remove junk from head
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'feed_links', 2);
remove_action('wp_head', 'index_rel_link');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'feed_links_extra', 3);
remove_action('wp_head', 'start_post_rel_link', 10, 0);
remove_action('wp_head', 'parent_post_rel_link', 10, 0);
remove_action('wp_head', 'adjacent_posts_rel_link', 10, 0);


// remove version info from head and feeds
function complete_version_removal() {
	return '';
}
add_filter('the_generator', 'complete_version_removal');

// remove nofollow from comments
function xwp_dofollow($str) {
$str = preg_replace(
'~<a ([^>]*)\s*(["|\']{1}\w*)\s*nofollow([^>]*)>~U',
'<a ${1}${2}${3}>', $str);
return str_replace(array(' rel=""', " rel=''"), '', $str);
}
remove_filter('pre_comment_content',     'wp_rel_nofollow');
add_filter   ('get_comment_author_link', 'xwp_dofollow');
add_filter   ('post_comments_link',      'xwp_dofollow');
add_filter   ('comment_reply_link',      'xwp_dofollow');
add_filter   ('comment_text',            'xwp_dofollow');


// delay feed update
function publish_later_on_feed($where) {
global $wpdb;

if (is_feed()) {
// timestamp in WP-format
$now = gmdate('Y-m-d H:i:s');

// value for wait; + device
$wait = '5'; // integer

// http://dev.mysql.com/doc/refman/5.0/en/date-and-time-functions.html#function_timestampdiff
$device = 'MINUTE'; // MINUTE, HOUR, DAY, WEEK, MONTH, YEAR

// add SQL-sytax to default $where
$where .= " AND TIMESTAMPDIFF($device, $wpdb->posts.post_date_gmt, '$now') > $wait ";
}
return $where;
}
add_filter('posts_where', 'publish_later_on_feed');

// Add CSS to Visual Editor
add_editor_style('style.css');

// Add body class to Visual Editor to match class used live
function mytheme_mce_settings( $initArray ){
 $initArray['body_class'] = 'post';
 return $initArray;
}
add_filter( 'tiny_mce_before_init', 'mytheme_mce_settings' );

// add google analytics to footer
// function add_google_analytics() {
// 	echo '<script src="http://www.google-analytics.com/ga.js" type="text/javascript"></script>';
// 	echo '<script type="text/javascript">';
// 	echo 'var pageTracker = _gat._getTracker("UA-XXXXX-X");';
// 	echo 'pageTracker._trackPageview();';
// 	echo '</script>';
// }
// add_action('wp_footer', 'add_google_analytics');
