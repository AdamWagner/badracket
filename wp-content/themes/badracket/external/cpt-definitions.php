<?php 

/* ========================================================================================================================

Custom Post Types - include custom post types and taxonimies here e.g.
See external/cpt.php for builder functions.  $args options can be

add_post_type('name', 'plural_name', $args) - > $args is an optional array to overwrite defaults.

add_taxonomy('name', 'associated_post_type', $args optional: overwrite defaults)

======================================================================================================================== */

add_post_type('album', 'albums', array (
'taxonomies' => array('engineer'),
'rewrite' => array( 'with_front' => FALSE, ),
'supports' => array( 'title', /*'editor',*/ 'custom-fields', 'revisions', )
));

add_taxonomy('Engineer', 'Engineers', 'album');

add_post_type('interview', 'interviews', array (
'taxonomies' => array('post_tag'),
'rewrite' => array( 'with_front' => FALSE, ),
));

add_post_type('staff', 'staff', array (
'taxonomies' => array(''),
'rewrite' => array( 'with_front' => FALSE, ),
'supports' => array( 'title', 'editor', 'custom-fields', 'revisions', )
));

add_post_type('show', 'shows', array (
'taxonomies' => array(''),
'supports'   => array( 'title', 'editor', 'custom-fields', 'trackbacks','revisions')
));