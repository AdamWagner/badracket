<?php 

/* =================================================================================================
Staff metaboxes
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


 ?>