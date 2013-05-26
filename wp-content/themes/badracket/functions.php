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


require_once( 'external/starkers-utilities.php' );
require_once( 'external/cpt.php' );
require_once( 'external/album-page.php' );
require_once( 'external/meta-box/meta-box.php' );
require_once( 'external/stripe-php/lib/Stripe.php' );
require_once( 'external/shortcodes.php' );


require_once( 'external/stripe.php' );
require_once( 'external/cpt-definitions.php' );


/* =================================================================================================
   Metaboxes
   // Use underscore (_) at the beginning of your Prefix to make keys hidden
================================================================================================= */

$prefix = '_br_';
function add_custom_meta_box(){ add_meta_box(); }

require_once( 'external/metaboxes-album.php' );
require_once( 'external/metaboxes-show.php' );
require_once( 'external/metaboxes-staff.php' );

/* Now, register them meta boxes! */
function AW_register_meta_boxes() {
  global $meta_boxes;
  if ( class_exists( 'RW_Meta_Box' ) ) {
    foreach ( $meta_boxes as $meta_box ) {
      new RW_Meta_Box( $meta_box );
      }
    }
  }
add_action( 'admin_init', 'AW_register_meta_boxes' );




/* Move gravity forms jQuery call to footer so jQuery is loaded */
add_filter("gform_init_scripts_footer", "init_scripts");
  function init_scripts() {
  return true;
}






/* Enqueue static Assets */
require_once( 'external/enqueue-static-assets.php' );


/* WordPress --> Javascript API */
require_once( 'external/js-api.php' );




/* =========================================================================================================
Theme specific settings
========================================================================================================= */

add_theme_support('post-thumbnails');

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

/* ==========================================================================================================
Actions and Filters
========================================================================================================== */

add_action( 'wp_enqueue_scripts', 'script_enqueuer' );

add_filter( 'body_class', 'add_slug_to_body_class' );

/* ===========================================================================================================
Comments: Custom callback for outputting comments
============================================================================================================ */

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


/* ===========================================================================================================
Remove Admin Menu Items
=========================================================================================================== */

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

















