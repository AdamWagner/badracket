<?php

function add_post_type($name, $plural, $args = array()) {
  add_action('init', function() use($name, $args, $plural) {
    
    $nameUpperCase = ucwords($name);
    $plural = ucwords($plural);
    $post_type = strtolower(str_replace(' ','_', $name));

    $labels = array( 
    'name'               => _x( "All $plural", $name ),
    'singular_name'      => _x( $nameUpperCase, $name ),
    'add_new'            => _x( "Add New $nameUpperCase", $name ),
    'add_new_item'       => _x( "Add New $nameUpperCase", $name  ),
    'edit_item'          => _x( "Edit $nameUpperCase", $name ),
    'new_item'           => _x( "New $nameUpperCase", $name ),
    'view_item'          => _x( "View $nameUpperCase", $name ),
    'search_items'       => _x( "Search $plural", $name ),
    'not_found'          => _x( "No $plural" . ' found', $name ),
    'not_found_in_trash' => _x( "No $plural" . ' found in Trash', $name ),
    'parent_item_colon'  => _x( "Parent $nameUpperCase:", $name ),
    'menu_name'          => _x( "All $plural", $name ),
    );

    $args = array_merge (
      array( 
        'labels'              => $labels,
        'hierarchical'        => true,
        'description'         => 'description',
        'taxonomies'          => array( 'category','post_tag' ),
        'public'              => true,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'menu_position'       => 5,
        //'menu_icon'         => '',
        'show_in_nav_menus'   => true,
        'publicly_queryable'  => true,
        'exclude_from_search' => false,
        'has_archive'         => true,
        'query_var'           => true,
        'can_export'          => true,
        'rewrite'             => true,
        'capability_type'     => 'post', 
        'supports'            => array( 'title', 'editor', 'author', 'thumbnail', 'custom-fields', 'trackbacks', 'comments', 'revisions', 'page-attributes', 'post-formats' )
      ), 
      $args
      );
    register_post_type($post_type, $args );
  });
} // close add_post_type function


/* ========================================================================================================================
  Add Taxonomy
======================================================================================================================== */

function add_taxonomy($name, $plural, $post_type, $args = array()) {
    add_action('init', function() use($name, $plural, $post_type, $args) {

    $nameUpperCase = ucwords($name);
    $plural = ucwords($plural);

    $name = strtolower(str_replace(' ', '_', $name));

    $labels = array(
      'name'                  => _x( $plural, 'taxonomy general name' ),
      'singular_name'         => _x( $nameUpperCase, 'taxonomy singular name' ),
      'search_items'          => __( "Search $plural" ),
      'popular_items'         => __( "Popular $plural" ),
      'all_items'             => __( "All $plural" ),
      'parent_item'           => __( "Parent $nameUpperCase" ),
      'parent_item_colon'     => __( "Parent $nameUpperCase:" ),
      'edit_item'             => __( "Edit $nameUpperCase" ),
      'update_item'           => __( "Update $nameUpperCase" ),
      'add_new_item'          => __( "Add New $nameUpperCase" ),
      'new_item_name'         => __( "New $nameUpperCase" ),
      'add_or_remove_items'   => __( "Add or remove $plural"),
      'choose_from_most_used' => __( "Choose from most used $plural"),
      'menu_name'             => __( $plural ),
    );
    $args = array_merge (
      array( 
        'labels'            => $labels,
        'public'            => true,
        'show_in_nav_menus' => true,
        'hierarchical'      => true,
        'show_tagcloud'     => true,
        'show_ui'           => true,
        'query_var'         => true,
        'rewrite'           => array( 'slug' => 'taxonomy slug' ),
        'query_var'         => true,
        //'capabilities'      => '',
        ),
        $args
      );
    register_taxonomy($name, $post_type, $args);
  });
}


