<?php 

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
  'id'            => 'album-tracks-11', // $id
  'title'         => 'Track 11', // $title
  'pages'         => array('album'), // $Array of pages boxes will appear on
  'context'       => 'normal', // $context (normal, advanced, side)
  'priority'      => 'high', // position in editor (high, core, default, low)

  // List of meta fields
  'fields' => array(

    array(
      'id'      => $prefix . 'songTitle-11',
      'type'    => 'text',
      'desc'    => 'songTitle',
    ),
    array(
      'id'      => $prefix . 'songTrackNumber-11',
      'type'    => 'text',
      'desc'    => 'songTrackNumber',
    ),
     array(
      'id'      => $prefix . 'duration-11',
      'type'    => 'text',
      'desc'    => 'duration',
    ),
    array(
      'id'      => $prefix . 'songUrl-11',
      'type'    => 'text',
      'desc'    => 'songUrl',
    ),
     array(
       'id'  => $prefix.'isSampleTrack-11',
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

// 1st meta box
$meta_boxes[] = array(
  'id'            => 'album-tracks-14', // $id
  'title'         => 'Track 14', // $title
  'pages'         => array('album'), // $Array of pages boxes will appear on
  'context'       => 'normal', // $context (normal, advanced, side)
  'priority'      => 'high', // position in editor (high, core, default, low)

  // List of meta fields
  'fields' => array(

    array(
      'id'      => $prefix . 'songTitle-14',
      'type'    => 'text',
      'desc'    => 'songTitle',
    ),
    array(
      'id'      => $prefix . 'songTrackNumber-14',
      'type'    => 'text',
      'desc'    => 'songTrackNumber',
    ),
     array(
      'id'      => $prefix . 'duration-14',
      'type'    => 'text',
      'desc'    => 'duration',
    ),
    array(
      'id'      => $prefix . 'songUrl-14',
      'type'    => 'text',
      'desc'    => 'songUrl',
    ),
     array(
       'id'  => $prefix.'isSampleTrack-14',
       'type'  => 'checkbox',
       'desc'    => 'sampleTrack',
     ),
  ) //end fields array
); //end $meta_boxes array
 ?>