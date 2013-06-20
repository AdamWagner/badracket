<?php 
/* ================================================================================================

Add Meta Boxes Here

=================================================================================================== */

// Album details metaboxes
$meta_boxes[] = array(
  'id'            => 'album-details', // $id
  'title'         => 'Album Details', // $title
  'pages'         => array('album'), // $Array of pages boxes will appear on
  'context'       => 'normal', // $context (normal, advanced, side)
  'priority'      => 'high', // position in editor (high, core, default, low)

  'fields' => array(
    // CHECKBOX
    array(
        'id'   => $prefix.'is_compilation',
        'type' => 'checkbox',
        'desc' => 'Is compilation?',
        'std'  => 0,
    ),
    // TEXT
    array(
      'id'      => $prefix . 'artist', // Field ID, i.e. the meta key
      'desc'    => 'Artist Name. Use "Compilation" if the album is a compilation.', // Field description (optional)
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
      'desc'    => '(Optional) Studio at which the album was recorded', // Field description (optional)
      'type'    => 'text',
    ),
    array(
      'id'      => $prefix . 'price', // Field ID, i.e. the meta key
      'desc'    => 'Price of the album. Use a single number only, e.g. "8". If free, use "0".', // Field description (optional)
      'type'    => 'text',
    ),
  ) //end fields array
); //end $meta_boxes array


// Song metaboxes
for ($i=1; $i<=14; $i++) {

  $enumerator = ($i < 10) ? '0'.$i : $i;
  $is_sample_default = ($i === 1) ? 1 : 0;

  $meta_boxes[] = array(
    'id'            => 'album-tracks-' . $enumerator, // $id
    'title'         => 'Track ' . $enumerator, // $title
    'pages'         => array('album'), // $Array of pages boxes will appear on
    'context'       => 'normal', // $context (normal, advanced, side)
    'priority'      => 'high', // position in editor (high, core, default, low)

    'fields' => array(
      array(
        'id'      => $prefix . 'songTitle-' . $enumerator,
        'type'    => 'text',
        'desc'    => 'songTitle',
        'class' => 'test'
      ),
      array(
        'id'      => $prefix . 'songArtist-' . $enumerator,
        'type'    => 'text',
        'desc'    => 'songArtist',
      ),
      array(
        'id'      => $prefix . 'duration-' . $enumerator,
        'type'    => 'text',
        'desc'    => 'duration',
      ),
      array(
        'id'      => $prefix . 'songUrl-' . $enumerator,
        'type'    => 'text',
        'desc'    => 'songUrl',
      ),
      array(
         'id'  => $prefix.'isSampleTrack-' . $enumerator,
         'type'  => 'checkbox',
         'desc'    => 'sampleTrack',
         'std'  => $is_sample_default,
       ),
    )
  );
}