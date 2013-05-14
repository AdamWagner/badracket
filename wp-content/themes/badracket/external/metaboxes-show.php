<?php 

/* =================================================================================================
Show metaboxes
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


 ?>