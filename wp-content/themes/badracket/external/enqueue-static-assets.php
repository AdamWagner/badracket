<?php 

/* =======================================================================================================
Scripts Add scripts via wp_head() // CODEX: wp_register_script( $handle, $src, $deps, $ver, $in_footer );
========+=============================================================================================== */

function _remove_script_version( $src ){
    $parts = explode( '?', $src );
    return $parts[0];
}
add_filter( 'script_loader_src', '_remove_script_version', 15, 1 );
add_filter( 'style_loader_src', '_remove_script_version', 15, 1 );


$test = 'b506d51d.br_facebook.min.cache.js';



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
      $s3_path  = "http://d1795rfny8s8fj.cloudfront.net/";
      return $s3_path.$rel_path.filename_builder($filename, $root);
    break;

    case 'production':
      $s3_path  = "http://d245myou62vn42.cloudfront.net/";
      return $s3_path.$rel_path.filename_builder($filename, $root);
    break; 
  }
}



function script_enqueuer() {

    // Define local asset paths
     $main_css_path     = 'style.css';
     $site_js_path      = 'prod/main-min.js';

    // Build filename from basename, hash, and extension
    // Format: basename + hash + extension

    // Build CDN file path
    // $root is a boolean and specifies if file is in subdirectory named after the extension


  wp_deregister_script('jquery');

    wp_register_style( 'screen', asset_file_path( $main_css_path , true ), '', '', 'screen' );
    wp_enqueue_style( 'screen' );

    wp_enqueue_script( 'main', asset_file_path( $site_js_path , false ), '', '', true );
    wp_enqueue_script( 'main' );
}

 ?>