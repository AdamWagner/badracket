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
require_once( 'external/album-page.php' );
require_once( 'external/meta-box/meta-box.php' );
require_once( 'external/stripe-php/lib/Stripe.php' );
require_once( 'external/shortcodes.php' );

 // remove_filter( 'the_content', 'wpautop' );


/* =================================================================================================
   Evironment Settings
================================================================================================= */

// Define Environments
$environments = array(
  'local'      => 'localhost',
  'staging'    => 'badracket.staging',
  'production' => 'badracket.wpengine.com',
);

// Set environment
$server_name = $_SERVER['SERVER_NAME'];
foreach($environments AS $key => $env){
  if(strstr($server_name, $env)){
    define('ENVIRONMENT', $key);
    break;
  }
}

// switch(ENVIRONMENT){
//   case 'local':
//     require_once( 'includes/env-local.php'); // environment getter functions
//     break;
//   case 'staging':
//     require_once( 'includes/env-staging.php'); // environment getter functions
//     break;
//   case 'production':
//     require_once( 'includes/env-production.php'); // production getter functions
//     break;
// }

/* ========================================================================================================================
Stripe
======================================================================================================================== */

if ($_POST) {
  Stripe::setApiKey("sk_test_5WPYe79f3ARl35CElPgwxV5y");
  $error = '';
  $success = '';
  try {
    if (!isset($_POST['stripeToken']))
      throw new Exception("The Stripe Token was not generated correctly");
    Stripe_Charge::create(array("amount" => $_POST['price'],
                                "currency" => "usd",
                                "card" => $_POST['stripeToken']));
    $success = 'Your payment was successful.';
  }
  catch (Exception $e) {
    $error = $e->getMessage();
  }
}




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

function my_excerpt($excerpt_length = 55, $id = false, $echo = true) {

    $text = '';

    if($id) {
      $the_post = & get_post( $my_id = $id );
      $text = ($the_post->post_excerpt) ? $the_post->post_excerpt : $the_post->post_content;
    } else {
      global $post;
      $text = ($post->post_excerpt) ? $post->post_excerpt : get_the_content('');
    }

    $text = strip_shortcodes( $text );
    $text = apply_filters('the_content', $text);
    $text = str_replace(']]>', ']]&gt;', $text);
    $text = strip_tags($text);

    $excerpt_more = ' ' . '[...]';
    $words = preg_split("/[\n\r\t ]+/", $text, $excerpt_length + 1, PREG_SPLIT_NO_EMPTY);
    if ( count($words) > $excerpt_length ) {
      array_pop($words);
      $text = implode(' ', $words);
      $text = $text . $excerpt_more;
    } else {
      $text = implode(' ', $words);
    }
  if($echo)
  echo apply_filters('the_content', $text);
  else
  return $text;
}

function get_my_excerpt($excerpt_length = 55, $id = false, $echo = false) {
 return my_excerpt($excerpt_length, $id, $echo);
}

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
'taxonomies' => array('engineer'),
'rewrite' => array(
          'with_front' => FALSE,
    ),
'supports'            => array( 'title', 'editor', 'custom-fields', 'revisions', )
));

add_taxonomy('Engineer', 'Engineers', 'album');

add_post_type('interview', 'interviews', array (
'taxonomies' => array('post_tag'),
'rewrite' => array(
          'with_front' => FALSE,
    ),
));

add_post_type('staff', 'staff', array (
'taxonomies' => array(''),
'rewrite' => array(
          'with_front' => FALSE,
    ),
'supports'            => array( 'title', 'editor', 'custom-fields', 'revisions', )
));

add_post_type('show', 'shows', array (
'taxonomies' => array(''),
'supports'            => array( 'title', 'editor', 'custom-fields', 'trackbacks','revisions')
));


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
      'id'      => $prefix . 'artist_twitter', // Field ID, i.e. the meta key
      'desc'    => 'Artist Twitter Handle (e.g. @badracket)', // Field description (optional)
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
    // DATETIME
    array(
      'name' => 'Release Date',
      'id'   => $prefix . 'release_date',
      'type' => 'datetime',

      // jQuery datetime picker options. See here http://trentrichardson.com/examples/timepicker/
      'js_options' => array(
        'stepMinute'     => 15,
        'showHour' => false,
        'showMinute' => false,
        'showTimepicker' => false,
        'showTime' => false,
        'alwaysSetTime' => false,
      ),
    ),
    array(
      'id'      => $prefix . 'recording_studio', // Field ID, i.e. the meta key
      'desc'    => 'Studio at which the album was recorded', // Field description (optional)
      'type'    => 'text',
    ),
    array(
      'id'      => $prefix . 'price', // Field ID, i.e. the meta key
      'desc'    => 'Price of the album. Use a single number only, e.g. "8"', // Field description (optional)
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
       'id'  => $prefix.'isSampleTrack-01',
       'type'  => 'checkbox',
       'desc'    => 'sampleTrack',
       'std'  => 1,
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
      'id'      => $prefix . 'songTitle-02',
      'type'    => 'text',
      'desc'    => 'songTitle',
    ),
    array(
      'id'      => $prefix . 'songTrackNumber-02',
      'type'    => 'text',
      'desc'    => 'songTrackNumber',
    ),
     array(
      'id'      => $prefix . 'duration-02',
      'type'    => 'text',
      'desc'    => 'duration',
    ),
    array(
      'id'      => $prefix . 'songUrl-02',
      'type'    => 'text',
      'desc'    => 'songUrl',
    ),
     array(
       'id'  => $prefix.'isSampleTrack-02',
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
       'id'  => $prefix.'isSampleTrack-03',
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
       'id'  => $prefix.'isSampleTrack-04',
       'type'  => 'checkbox',
       'desc'    => 'sampleTrack',
     ),
  ) //end fields array
); //end $meta_boxes array



// 1st meta box
$meta_boxes[] = array(
  'id'            => 'album-tracks-05', // $id
  'title'         => 'Track 05', // $title
  'pages'         => array('album'), // $Array of pages boxes will appear on
  'context'       => 'normal', // $context (normal, advanced, side)
  'priority'      => 'high', // position in editor (high, core, default, low)

  // List of meta fields
  'fields' => array(

    array(
      'id'      => $prefix . 'songTitle-05',
      'type'    => 'text',
      'desc'    => 'songTitle',
    ),
    array(
      'id'      => $prefix . 'songTrackNumber-05',
      'type'    => 'text',
      'desc'    => 'songTrackNumber',
    ),
     array(
      'id'      => $prefix . 'duration-05',
      'type'    => 'text',
      'desc'    => 'duration',
    ),
    array(
      'id'      => $prefix . 'songUrl-05',
      'type'    => 'text',
      'desc'    => 'songUrl',
    ),
     array(
       'id'  => $prefix.'isSampleTrack-05',
       'type'  => 'checkbox',
       'desc'    => 'sampleTrack',
     ),
  ) //end fields array
); //end $meta_boxes array

// 1st meta box
$meta_boxes[] = array(
  'id'            => 'album-tracks-06', // $id
  'title'         => 'Track 06', // $title
  'pages'         => array('album'), // $Array of pages boxes will appear on
  'context'       => 'normal', // $context (normal, advanced, side)
  'priority'      => 'high', // position in editor (high, core, default, low)

  // List of meta fields
  'fields' => array(

    array(
      'id'      => $prefix . 'songTitle-06',
      'type'    => 'text',
      'desc'    => 'songTitle',
    ),
    array(
      'id'      => $prefix . 'songTrackNumber-06',
      'type'    => 'text',
      'desc'    => 'songTrackNumber',
    ),
     array(
      'id'      => $prefix . 'duration-06',
      'type'    => 'text',
      'desc'    => 'duration',
    ),
    array(
      'id'      => $prefix . 'songUrl-06',
      'type'    => 'text',
      'desc'    => 'songUrl',
    ),
     array(
       'id'  => $prefix.'isSampleTrack-06',
       'type'  => 'checkbox',
       'desc'    => 'sampleTrack',
     ),
  ) //end fields array
); //end $meta_boxes array

// 1st meta box
$meta_boxes[] = array(
  'id'            => 'album-tracks-07', // $id
  'title'         => 'Track 07', // $title
  'pages'         => array('album'), // $Array of pages boxes will appear on
  'context'       => 'normal', // $context (normal, advanced, side)
  'priority'      => 'high', // position in editor (high, core, default, low)

  // List of meta fields
  'fields' => array(

    array(
      'id'      => $prefix . 'songTitle-07',
      'type'    => 'text',
      'desc'    => 'songTitle',
    ),
    array(
      'id'      => $prefix . 'songTrackNumber-07',
      'type'    => 'text',
      'desc'    => 'songTrackNumber',
    ),
     array(
      'id'      => $prefix . 'duration-07',
      'type'    => 'text',
      'desc'    => 'duration',
    ),
    array(
      'id'      => $prefix . 'songUrl-07',
      'type'    => 'text',
      'desc'    => 'songUrl',
    ),
     array(
       'id'  => $prefix.'isSampleTrack-07',
       'type'  => 'checkbox',
       'desc'    => 'sampleTrack',
     ),
  ) //end fields array
); //end $meta_boxes array


// 1st meta box
$meta_boxes[] = array(
  'id'            => 'album-tracks-08', // $id
  'title'         => 'Track 08', // $title
  'pages'         => array('album'), // $Array of pages boxes will appear on
  'context'       => 'normal', // $context (normal, advanced, side)
  'priority'      => 'high', // position in editor (high, core, default, low)

  // List of meta fields
  'fields' => array(

    array(
      'id'      => $prefix . 'songTitle-08',
      'type'    => 'text',
      'desc'    => 'songTitle',
    ),
    array(
      'id'      => $prefix . 'songTrackNumber-08',
      'type'    => 'text',
      'desc'    => 'songTrackNumber',
    ),
     array(
      'id'      => $prefix . 'duration-08',
      'type'    => 'text',
      'desc'    => 'duration',
    ),
    array(
      'id'      => $prefix . 'songUrl-08',
      'type'    => 'text',
      'desc'    => 'songUrl',
    ),
     array(
       'id'  => $prefix.'isSampleTrack-08',
       'type'  => 'checkbox',
       'desc'    => 'sampleTrack',
     ),
  ) //end fields array
); //end $meta_boxes array


// 1st meta box
$meta_boxes[] = array(
  'id'            => 'album-tracks-09', // $id
  'title'         => 'Track 09', // $title
  'pages'         => array('album'), // $Array of pages boxes will appear on
  'context'       => 'normal', // $context (normal, advanced, side)
  'priority'      => 'high', // position in editor (high, core, default, low)

  // List of meta fields
  'fields' => array(

    array(
      'id'      => $prefix . 'songTitle-09',
      'type'    => 'text',
      'desc'    => 'songTitle',
    ),
    array(
      'id'      => $prefix . 'songTrackNumber-09',
      'type'    => 'text',
      'desc'    => 'songTrackNumber',
    ),
     array(
      'id'      => $prefix . 'duration-09',
      'type'    => 'text',
      'desc'    => 'duration',
    ),
    array(
      'id'      => $prefix . 'songUrl-09',
      'type'    => 'text',
      'desc'    => 'songUrl',
    ),
     array(
       'id'  => $prefix.'isSampleTrack-09',
       'type'  => 'checkbox',
       'desc'    => 'sampleTrack',
     ),
  ) //end fields array
); //end $meta_boxes array

// 1st meta box
$meta_boxes[] = array(
  'id'            => 'album-tracks-10', // $id
  'title'         => 'Track 10', // $title
  'pages'         => array('album'), // $Array of pages boxes will appear on
  'context'       => 'normal', // $context (normal, advanced, side)
  'priority'      => 'high', // position in editor (high, core, default, low)

  // List of meta fields
  'fields' => array(

    array(
      'id'      => $prefix . 'songTitle-10',
      'type'    => 'text',
      'desc'    => 'songTitle',
    ),
    array(
      'id'      => $prefix . 'songTrackNumber-10',
      'type'    => 'text',
      'desc'    => 'songTrackNumber',
    ),
     array(
      'id'      => $prefix . 'duration-10',
      'type'    => 'text',
      'desc'    => 'duration',
    ),
    array(
      'id'      => $prefix . 'songUrl-10',
      'type'    => 'text',
      'desc'    => 'songUrl',
    ),
     array(
       'id'  => $prefix.'isSampleTrack-10',
       'type'  => 'checkbox',
       'desc'    => 'sampleTrack',
     ),
  ) //end fields array
); //end $meta_boxes array

// 1st meta box
$meta_boxes[] = array(
  'id'            => 'album-tracks-12', // $id
  'title'         => 'Track 12', // $title
  'pages'         => array('album'), // $Array of pages boxes will appear on
  'context'       => 'normal', // $context (normal, advanced, side)
  'priority'      => 'high', // position in editor (high, core, default, low)

  // List of meta fields
  'fields' => array(

    array(
      'id'      => $prefix . 'songTitle-12',
      'type'    => 'text',
      'desc'    => 'songTitle',
    ),
    array(
      'id'      => $prefix . 'songTrackNumber-12',
      'type'    => 'text',
      'desc'    => 'songTrackNumber',
    ),
     array(
      'id'      => $prefix . 'duration-12',
      'type'    => 'text',
      'desc'    => 'duration',
    ),
    array(
      'id'      => $prefix . 'songUrl-12',
      'type'    => 'text',
      'desc'    => 'songUrl',
    ),
     array(
       'id'  => $prefix.'isSampleTrack-12',
       'type'  => 'checkbox',
       'desc'    => 'sampleTrack',
     ),
  ) //end fields array
); //end $meta_boxes array

// 1st meta box
$meta_boxes[] = array(
  'id'            => 'album-tracks-13', // $id
  'title'         => 'Track 13', // $title
  'pages'         => array('album'), // $Array of pages boxes will appear on
  'context'       => 'normal', // $context (normal, advanced, side)
  'priority'      => 'high', // position in editor (high, core, default, low)

  // List of meta fields
  'fields' => array(

    array(
      'id'      => $prefix . 'songTitle-13',
      'type'    => 'text',
      'desc'    => 'songTitle',
    ),
    array(
      'id'      => $prefix . 'songTrackNumber-13',
      'type'    => 'text',
      'desc'    => 'songTrackNumber',
    ),
     array(
      'id'      => $prefix . 'duration-13',
      'type'    => 'text',
      'desc'    => 'duration',
    ),
    array(
      'id'      => $prefix . 'songUrl-13',
      'type'    => 'text',
      'desc'    => 'songUrl',
    ),
     array(
       'id'  => $prefix.'isSampleTrack-13',
       'type'  => 'checkbox',
       'desc'    => 'sampleTrack',
     ),
  ) //end fields array
); //end $meta_boxes array



/* =================================================================================================
Show metaboxes here
================================================================================================= */


// 1st meta box
$meta_boxes[] = array(
  'id'            => 'show-details', // $id
  'title'         => 'Show Details', // $title
  'pages'         => array('show'), // $Array of pages boxes will appear on
  'context'       => 'normal', // $context (normal, advanced, side)
  'priority'      => 'high', // position in editor (high, core, default, low)
  'autosave' => true,

  // List of meta fields
  'fields' => array(

    // DATETIME
    array(
      'name' => 'Show date',
      'id'   => $prefix . 'show-date',
      'type' => 'datetime',
      'js_options' => array(
        'stepMinute'     => 15,
        'showTimepicker' => true,
      ),
    ),


    array(
      'id'   => $prefix . 'advance-ticket-price',
      'type' => 'number',
      'desc' => 'Advance ticket price',

      'min'  => 0,
      'step' => 1,
    ),

    array(
      'id'   => $prefix . 'door-ticket-price',
      'type' => 'number',
      'desc' => 'At door ticket price',

      'min'  => 0,
      'step' => 1,
    ),

    array(
      'id'      => $prefix . 'facebook-event-url',
      'type'    => 'text',
      'desc'    => 'Facebook Event Link',
    ),

    array(
      'id'      => $prefix . 'ticket-url',
      'type'    => 'text',
      'desc'    => 'Ticket Purchase Link',
    ),

    array(
      'name'             => 'Plupload Image Upload',
      'id'               => "{$prefix}plupload",
      'type'             => 'plupload_image',
      'max_file_uploads' => 4,
    ),

  ) //end fields array
); //end $meta_boxes array



// 1st meta box
$meta_boxes[] = array(
  'id'            => 'bands', // $id
  'title'         => 'Supporting bands', // $title
  'pages'         => array('show'), // $Array of pages boxes will appear on
  'context'       => 'normal', // $context (normal, advanced, side)
  'priority'      => 'high', // position in editor (high, core, default, low)

  // List of meta fields
  'fields' => array(

    array(
      'id'      => $prefix . 'supporting-band-names',
      'type'    => 'text',
      'desc'    => 'Supporting Band Names',
      'clone'   => true
    ),
  ) //end fields array
); //end $meta_boxes array

// 1st meta box
$meta_boxes[] = array(
  'id'            => 'venue-details', // $id
  'title'         => 'Venue', // $title
  'pages'         => array('show'), // $Array of pages boxes will appear on
  'context'       => 'normal', // $context (normal, advanced, side)
  'priority'      => 'high', // position in editor (high, core, default, low)

  // List of meta fields
  'fields' => array(

    array(
      'id'      => $prefix . 'show-venue',
      'type'    => 'text',
      'desc'    => 'Venue name',
    ),

    array(
      'id'      => $prefix . 'show-venue-address-street',
      'type'    => 'text',
      'desc'    => 'Street Address',
    ),

    array(
      'id'      => $prefix . 'show-venue-address-city',
      'type'    => 'text',
      'desc'    => 'City',
    ),

    array(
      'id'      => $prefix . 'show-venue-address-state',
      'type'    => 'text',
      'desc'    => 'State',
    ),

    array(
      'id'      => $prefix . 'show-venue-address-zip',
      'type'    => 'text',
      'desc'    => 'Zip code',
    ),

  ) //end fields array
); //end $meta_boxes array

// 1st meta box
$meta_boxes[] = array(
  'id'            => 'show-tracks-01', // $id
  'title'         => 'Playlist Track 1', // $title
  'pages'         => array('show'), // $Array of pages boxes will appear on
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
      'id'      => $prefix . 'artist-01',
      'type'    => 'text',
      'desc'    => 'artistName',
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
  ) //end fields array
); //end $meta_boxes array

// 1st meta box
$meta_boxes[] = array(
  'id'            => 'show-tracks-02', // $id
  'title'         => 'Playlist Track 2', // $title
  'pages'         => array('show'), // $Array of pages boxes will appear on
  'context'       => 'normal', // $context (normal, advanced, side)
  'priority'      => 'high', // position in editor (high, core, default, low)

  // List of meta fields
  'fields' => array(

    array(
      'id'      => $prefix . 'songTitle-02',
      'type'    => 'text',
      'desc'    => 'songTitle',
    ),
    array(
      'id'      => $prefix . 'artist-02',
      'type'    => 'text',
      'desc'    => 'artistName',
    ),
    array(
      'id'      => $prefix . 'songTrackNumber-02',
      'type'    => 'text',
      'desc'    => 'songTrackNumber',
    ),
     array(
      'id'      => $prefix . 'duration-02',
      'type'    => 'text',
      'desc'    => 'duration',
    ),
    array(
      'id'      => $prefix . 'songUrl-02',
      'type'    => 'text',
      'desc'    => 'songUrl',
    ),

  ) //end fields array
); //end $meta_boxes array


// 1st meta box
$meta_boxes[] = array(
  'id'            => 'show-tracks-03', // $id
  'title'         => 'Playlist Track 3', // $title
  'pages'         => array('show'), // $Array of pages boxes will appear on
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
      'id'      => $prefix . 'artist-03',
      'type'    => 'text',
      'desc'    => 'artistName',
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
  ) //end fields array
); //end $meta_boxes array




/* =================================================================================================
Staff metaboxes here
================================================================================================= */


// 1st meta box
$meta_boxes[] = array(
  'id'            => 'staff-details', // $id
  'title'         => 'Headshot + personal details', // $title
  'pages'         => array('staff'), // $Array of pages boxes will appear on
  'context'       => 'normal', // $context (normal, advanced, side)
  'priority'      => 'high', // position in editor (high, core, default, low)
  'autosave' => true,

  // List of meta fields
  'fields' => array(

    array(
        'name'             => 'Plupload Image Upload',
        'id'               => $prefix . 'headshot',
        'type'             => 'plupload_image',
        'max_file_uploads' => 4,
      ),

    array(
      'id'   => $prefix . 'twitter',
      'type' => 'text',
      'desc' => 'Twitter handle',
    ),

    array(
      'id'   => $prefix . 'description',
      'type' => 'text',
      'desc' => 'Description / title / role',
    ),

    array(
      // Field name - Will be used as label
      'name'  => 'Text',
      'id'    => "{$prefix}client_list",
      'desc'  => 'List Clients here',
      'type'  => 'text',
      'clone' => true,
    ),

  )
 );

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

    // Define local asset paths
     $main_css_path     = 'style.css';
     $site_js_path      = 'prod/main-min.js';

    // Build filename from basename, hash, and extension
    // Format: basename + hash + extension
    function filename_builder($filename, $root) {
      $WP_relative_path = "/wp-content/themes/badracket/";

      $exploded_filename = explode('.', $filename);
      $extension = $exploded_filename[1];
      $basename = $exploded_filename[0];

      $WP_theme_path = get_template_directory_uri().'/'; 

      if (!$root) { $WP_theme_path = $WP_theme_path.$extension.'/'; }
      // echo $basename.".".hash_file('md5', $WP_theme_path.$filename).'.gzip.'.$extension;
      return $basename.".".hash_file('md5', $WP_theme_path.$filename).'.gzip.'.$extension;
  }
    // Build CDN file path
    // $root is a boolean and specifies if file is in subdirectory named after the extension
    function asset_file_path( $filename, $root ) {




      $exploded_filename = explode('.', $filename);
      $extension = $exploded_filename[1];
      $basename = $exploded_filename[0];

      if (!$root) { 
        $rel_path = "wp-content/themes/badracket/".$extension."/";
      } else {
        $rel_path = "wp-content/themes/badracket/";
      }

      switch (ENVIRONMENT){
        case 'local':
         return 'http://localhost:8888/brv5-prod/'.$rel_path.$filename;
         break;
        case 'staging':
          $s3_path  = "http://da6ki5l3xfcf0.cloudfront.net/";
          return $s3_path.$rel_path.filename_builder($filename, $root);
          break;
        case 'production':
         $s3_path  = "http://d245myou62vn42.cloudfront.net/";
         return $s3_path.$rel_path.filename_builder($filename, $root);
         break; 
      }
    }

  wp_deregister_script('jquery');

    wp_register_style( 'screen', asset_file_path( $main_css_path , true ), '', '', 'screen' );
    wp_enqueue_style( 'screen' );

    wp_enqueue_script( 'main', asset_file_path( $site_js_path , false ), '', '', true );
    wp_enqueue_script( 'main' );
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
          case 'send_mail':
               $output = send_mail($_REQUEST['subject'], $_REQUEST['message'], $_REQUEST['email'] );
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
   query_posts(array('post_type' => $post_type ) );
   $albums = array();
   while (have_posts()) : the_post();
     $meta = get_post_custom($post_id);
     $meta['albumName'] = get_the_title($post_id);;
     $meta['albumUrl'] = get_permalink($post_id);;
     array_push($albums, $meta);
   endwhile;
   return $albums;
}


function send_mail($subject, $message, $email){

   $headers[] = 'From: Bad Racket <team@badracket.com>';

   wp_mail( $email, $subject, $message, $headers);

   return;
}














