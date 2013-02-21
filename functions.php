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


add_post_type('albumTest', 'albumTests', array (
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
      'id'      => $prefix . 'artist', // Field ID, i.e. the meta key
      'desc'    => 'Artist Name', // Field description (optional)
      'type'    => 'text',
    ),
    array(
      'id'      => $prefix . 'cover_url', // Field ID, i.e. the meta key
      'desc'    => 'IMAGE FILE: Upload album cover to post and paste URL here', // Field description (optional)
      'type'    => 'text',
    ),
    array(
      'id'      => $prefix . 'zip_file', // Field ID, i.e. the meta key
      'desc'    => 'ZIP FILE: Upload full album zip file andl paste URL here', // Field description (optional)
      'type'    => 'text',
    ),
    array(
      'id'      => $prefix . 'release_date', // Field ID, i.e. the meta key
      'desc'    => 'The Release date of the album:  mm - dd - yyyy', // Field description (optional)
      'type'    => 'text',
    ),
    array(
      'id'      => $prefix . 'recording_studio', // Field ID, i.e. the meta key
      'desc'    => 'Studio at which the album was recorded', // Field description (optional)
      'type'    => 'text',
    ),
    array(
      'id'      => $prefix . 'buy_url', // Field ID, i.e. the meta key
      'desc'    => 'Link to purchase page for this album', // Field description (optional)
      'type'    => 'text',
    ),
  ) //end fields array
); //end $meta_boxes array

// 1st meta box
$meta_boxes[] = array(
  'id'            => 'album-tracks', // $id
  'title'         => 'Track 01', // $title 
  'pages'         => array('album'), // $Array of pages boxes will appear on
  'context'       => 'normal', // $context (normal, advanced, side)
  'priority'      => 'high', // position in editor (high, core, default, low)

  // List of meta fields
  'fields' => array(

    array(
      'id'      => $prefix . 'songTitle-01',
      'type'    => 'text',
      'desc'    => 'songTitle',
    ),
    array(
      'id'      => $prefix . 'songTrackNumber-01', 
      'type'    => 'text',
      'desc'    => 'songTrackNumber',
    ),
     array(
      'id'      => $prefix . 'duration-01', 
      'type'    => 'text',
      'desc'    => 'duration',
    ),   
    array(
      'id'      => $prefix . 'songUrl-01', 
      'type'    => 'text',
      'desc'    => 'songUrl',
    ),
     array(
       'id'  => $prefix.'checkbox-01',
       'type'  => 'checkbox',
       'desc'    => 'sampleTrack',
     ),
  ) //end fields array
); //end $meta_boxes array



// 1st meta box
$meta_boxes[] = array(
  'id'            => 'album-tracks-02', // $id
  'title'         => 'Track 02', // $title 
  'pages'         => array('album'), // $Array of pages boxes will appear on
  'context'       => 'normal', // $context (normal, advanced, side)
  'priority'      => 'high', // position in editor (high, core, default, low)

  // List of meta fields
  'fields' => array(

    array(
      'id'      => $prefix . 'songTitle-2',
      'type'    => 'text',
      'desc'    => 'songTitle',
    ),
    array(
      'id'      => $prefix . 'songTrackNumber-2', 
      'type'    => 'text',
      'desc'    => 'songTrackNumber',
    ),
     array(
      'id'      => $prefix . 'duration-2', 
      'type'    => 'text',
      'desc'    => 'duration',
    ),   
    array(
      'id'      => $prefix . 'songUrl-2', 
      'type'    => 'text',
      'desc'    => 'songUrl',
    ),       
     array(
       'id'  => $prefix.'checkbox-2',
       'type'  => 'checkbox',
       'desc'    => 'sampleTrack',
     ),
  ) //end fields array
); //end $meta_boxes array



// 1st meta box
$meta_boxes[] = array(
  'id'            => 'album-tracks-03', // $id
  'title'         => 'Track 03', // $title 
  'pages'         => array('album'), // $Array of pages boxes will appear on
  'context'       => 'normal', // $context (normal, advanced, side)
  'priority'      => 'high', // position in editor (high, core, default, low)

  // List of meta fields
  'fields' => array(

    array(
      'id'      => $prefix . 'songTitle-03',
      'type'    => 'text',
      'desc'    => 'songTitle',
    ),
    array(
      'id'      => $prefix . 'songTrackNumber-03', 
      'type'    => 'text',
      'desc'    => 'songTrackNumber',
    ),
     array(
      'id'      => $prefix . 'duration-03', 
      'type'    => 'text',
      'desc'    => 'duration',
    ),   
    array(
      'id'      => $prefix . 'songUrl-03', 
      'type'    => 'text',
      'desc'    => 'songUrl',
    ),
     array(
       'id'  => $prefix.'checkbox-03',
       'type'  => 'checkbox',
       'desc'    => 'sampleTrack',
     ),
  ) //end fields array
); //end $meta_boxes array



// 1st meta box
$meta_boxes[] = array(
  'id'            => 'album-tracks-04', // $id
  'title'         => 'Track 04', // $title 
  'pages'         => array('album'), // $Array of pages boxes will appear on
  'context'       => 'normal', // $context (normal, advanced, side)
  'priority'      => 'high', // position in editor (high, core, default, low)

  // List of meta fields
  'fields' => array(

    array(
      'id'      => $prefix . 'songTitle-04',
      'type'    => 'text',
      'desc'    => 'songTitle',
    ),
    array(
      'id'      => $prefix . 'songTrackNumber-04', 
      'type'    => 'text',
      'desc'    => 'songTrackNumber',
    ),
     array(
      'id'      => $prefix . 'duration-04', 
      'type'    => 'text',
      'desc'    => 'duration',
    ),   
    array(
      'id'      => $prefix . 'songUrl-04', 
      'type'    => 'text',
      'desc'    => 'songUrl',
    ),
     array(
       'id'  => $prefix.'checkbox-04',
       'type'  => 'checkbox',
       'desc'    => 'sampleTrack',
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

Scripts Add scripts via wp_head() // CODEX: wp_register_script( $handle, $src, $deps, $ver, $in_footer ); 

======================================================================================================================== */

function _remove_script_version( $src ){
    $parts = explode( '?', $src );
    return $parts[0];
}
add_filter( 'script_loader_src', '_remove_script_version', 15, 1 );
add_filter( 'style_loader_src', '_remove_script_version', 15, 1 );


function script_enqueuer() {

  wp_deregister_script('jquery');

	wp_register_style( 'screen', get_template_directory_uri().'/style.css', '', '', 'screen' );
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



/* ========================================================================================================================
Ajax Action hooks
======================================================================================================================== */
add_action('wp_ajax_nopriv_do_ajax', 'our_ajax_function');
add_action('wp_ajax_do_ajax', 'our_ajax_function');

function our_ajax_function(){

   // the first part is a SWTICHBOARD that fires specific functions
   // according to the value of Query Var 'fn'

     switch($_REQUEST['fn']){
          case 'get_latest_posts':
               $output = ajax_get_latest_posts($_REQUEST['count'], $_REQUEST['post_type'] );
          break;
          default:
              $output = 'No function specified, check your jQuery.ajax() call';
          break;

     }

    $output=json_encode($output);

    if(is_array($output)){
      print_r($output); 
    } else {
      echo $output;
    } die;
}

function ajax_get_latest_posts($count, $post_type){
   query_posts(array('post_type' => 'album' ) );
   $albums = array();
   while (have_posts()) : the_post();
     $meta = get_post_custom($post_id);
     $meta['albumName'] = get_the_title($post_id);;
     array_push($albums, $meta);
   endwhile;
   return $albums;
}
















