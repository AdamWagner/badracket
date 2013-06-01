<?php 

/* =======================================================================================================
Scripts Add scripts via wp_head() // CODEX: wp_register_script( $handle, $src, $deps, $ver, $in_footer );
======================================================================================================== */

function _remove_script_version( $src ){
    $parts = explode( '?', $src );
    return $parts[0];
}
add_filter( 'script_loader_src', '_remove_script_version', 15, 1 );
add_filter( 'style_loader_src', '_remove_script_version', 15, 1 );


function asset_file_path( $filename, $root ) {

  $exploded_filename = explode('.', $filename);
  $extension = $exploded_filename[3];
  $basename = $exploded_filename[0];

  if (!$root) { 
    $rel_path = "wp-content/themes/badracket/".$extension."/build/";
  } else {
    $rel_path = "wp-content/themes/badracket/";
  }

  switch (ENVIRONMENT){
    case 'local':
      return 'http://localhost:8888/brv5-prod/'.$rel_path.$filename;
      break;

    case 'staging':
      $s3_path  = "http://d1795rfny8s8fj.cloudfront.net/";
      return $s3_path.$rel_path.$filename;;
    break;

    case 'production':
      $s3_path  = "http://d245myou62vn42.cloudfront.net/";
      return $s3_path.$rel_path.$filename;;
    break; 
  }
}



function script_enqueuer() {

    // Define local asset paths
     $main_css_path     = 'style.css';
     $site_js_path      = 'f24e7322.base.min.js';

    // Build filename from basename, hash, and extension
    // Format: basename + hash + extension

    // Build CDN file path
    // $root is a boolean and specifies if file is in subdirectory named after the extension


  wp_deregister_script('jquery');

    wp_register_style( 'screen', get_template_directory_uri() . '/style.css' , '', '', 'screen' );
    wp_enqueue_style( 'screen' );

    wp_enqueue_script( 'main', asset_file_path( $site_js_path , false ), '', '', true );
    wp_enqueue_script( 'main' );
}

 ?>