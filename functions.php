<?php
/**
 * Starkers functions and definitions
 *
 * For more information on hooks, actions, and filters, see http://codex.wordpress.org/Plugin_API.
 *
	 * @package 	WordPress
	 * @subpackage 	Starkers
	 * @since 		Starkers 4.0
 */

/* ========================================================================================================================

Required external files

======================================================================================================================== */

require_once( 'external/starkers-utilities.php' );
require_once( 'external/cpt.php' );
require_once( 'external/meta-box/meta-box.php' );
// require_once( 'external/facebook_sdk/facebook.php' );
// require_once( 'external/brv5_facebook.php' );

/* ========================================================================================================================

Theme specific settings

Uncomment register_nav_menus to enable a single menu with the title of "Primary Navigation" in your theme

======================================================================================================================== */

add_theme_support('post-thumbnails');

// register_nav_menus(array('primary' => 'Primary Navigation'));

function removeHeadLinks() {
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
remove_action( 'wp_head', 'adjacent_posts_rel_link_wp_head' );
}
add_action('init', 'removeHeadLinks');



/* ========================================================================================================================

Actions and Filters

======================================================================================================================== */

add_action( 'wp_enqueue_scripts', 'script_enqueuer' );

add_filter( 'body_class', 'add_slug_to_body_class' );

/* ========================================================================================================================

Custom Post Types - include custom post types and taxonimies here e.g.
See external/cpt.php for builder functions.  $args options can be

add_post_type('name', 'plural_name', $args) - > $args is an optional array to overwrite defaults.

add_taxonomy('name', 'associated_post_type', $args optional: overwrite defaults)

======================================================================================================================== */


add_post_type('album', 'albums', array (
'taxonomies' => array('post_tag'),
));

// add_taxonomy('Video Category', 'Video Categories', 'video');


/* ========================================================================================================================

Configure custom meta boxes

// Use underscore (_) at the beginning of your Prefix to make keys hidden

======================================================================================================================== */

$prefix = '_br_';
function add_custom_meta_box(){ add_meta_box(); }

/* ========================================================================================================================

Add Meta Boxes Here

======================================================================================================================== */

// 1st meta box
$meta_boxes[] = array(
  'id'            => 'album-details', // $id
  'title'         => 'Album Details', // $title 
  'pages'         => array('album'), // $Array of pages boxes will appear on
  'context'       => 'normal', // $context (normal, advanced, side)
  'priority'      => 'high', // position in editor (high, core, default, low)

  // List of meta fields
  'fields' => array(

    // TEXT
    array(
      'cover_url'    => 'Album cover img URL', // Field name - Will be used as label
      'id'      => $prefix . 'cover_url', // Field ID, i.e. the meta key
      'desc'    => 'IMAGE FILE: Upload album cover to post and paste URL here', // Field description (optional)
      'type'    => 'text',
    ),
    // TEXT
    array(
      'audio_url'    => 'Link to audio file', // Field name - Will be used as label
      'id'      => $prefix . 'audio_url', // Field ID, i.e. the meta key
      'desc'    => 'AUDIO FILE: Upload song audio to post, paste URL here', // Field description (optional)
      'type'    => 'text',
    ),
    array(
      'audio_url'    => 'Link to full album zip', // Field name - Will be used as label
      'id'      => $prefix . 'zip_url', // Field ID, i.e. the meta key
      'desc'    => 'ZIP FILE: Upload full album zip file andl paste URL here', // Field description (optional)
      'type'    => 'text',
    ),
  ) //end fields array
); //end $meta_boxes array


/* ========================================================================================================================

Now, register them meta boxes!

======================================================================================================================== */

function AW_register_meta_boxes() { 
	global $meta_boxes;
  if ( class_exists( 'RW_Meta_Box' ) ) { 
	  foreach ( $meta_boxes as $meta_box ) {
	  	new RW_Meta_Box( $meta_box );
	  	}
	  }
	}
add_action( 'admin_init', 'AW_register_meta_boxes' );



/* ========================================================================================================================

Cache buster

======================================================================================================================== */
function cache_busting_path($path, $time_format = 'U') {
  if( $path[0] != '/' ) { //Checks for the first character in $path is a slash and adds it if it isn't. 
    $path = '/' . $path;
  }
  return get_bloginfo('template_url') . $path . '?' . date($time_format, filemtime( get_theme_root() ) );
}



/* ========================================================================================================================

Scripts Add scripts via wp_head() // CODEX: wp_register_script( $handle, $src, $deps, $ver, $in_footer ); 

======================================================================================================================== */

function script_enqueuer() {

  wp_deregister_script('jquery');

  wp_register_script('jquery', ("http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"),'','', false);
  wp_enqueue_script('jquery');

  // wp_deregister_script('jquery');
  // remember WP loads jQuery in no-conflict mode where the dollar-sign doesn't work

  
	wp_register_script( 'site', cache_busting_path('/js/prod/script.min.js'), 'jquery', '', true );
		wp_enqueue_script( 'site' );

	// wp_register_script( 'modernizr', get_template_directory_uri().'/js/modernizr.js', array( 'jquery' ) );
	// 	wp_enqueue_script( 'modernizr' );

	wp_register_style( 'screen', cache_busting_path('/style.css'), '', '', 'screen' );
  	wp_enqueue_style( 'screen' );
}	

/* ========================================================================================================================

Comments: Custom callback for outputting comments 

======================================================================================================================== */

function starkers_comment( $comment, $args, $depth ) {
	$GLOBALS['comment'] = $comment; 
	?>
	<?php if ( $comment->comment_approved == '1' ): ?>	
	<li>
		<article id="comment-<?php comment_ID() ?>">
			<?php echo get_avatar( $comment ); ?>
			<h4><?php comment_author_link() ?></h4>
			<time><a href="#comment-<?php comment_ID() ?>" pubdate><?php comment_date() ?> at <?php comment_time() ?></a></time>
			<?php comment_text() ?>
		</article>
	<?php endif;
}


/* ========================================================================================================================

Remove Admin Menu Items

======================================================================================================================== */
function remove_menus () {
global $menu;
  $restricted = array(__('Dashboard'),
   // __('Posts'),
   //__('Media'),
   __('Links')); // lack of double parens on last line is syntax error.
   // __('Pages'),
   // __('Appearance'),
   // __('Tools'),
   // __('Users'),
   // __('Settings'),
    // __('Plugins'),
   // __('Comments'));
  end ($menu);
  while (prev($menu)){
    $value = explode(' ',$menu[key($menu)][0]);
    if(in_array($value[0] != NULL?$value[0]:"" , $restricted)){unset($menu[key($menu)]);}
  }
}
add_action('admin_menu', 'remove_menus');