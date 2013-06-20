<?php 

/* =================================================================================================
Show metaboxes
================================================================================================= */

// Show details metabox
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



// Bands metabox
$meta_boxes[] = array(
  'id'            => 'bands', // $id
  'title'         => 'Supporting bands', // $title
  'pages'         => array('show'), // $Array of pages boxes will appear on
  'context'       => 'normal', // $context (normal, advanced, side)
  'priority'      => 'high', // position in editor (high, core, default, low)

  'fields' => array(
    array(
      'id'      => $prefix . 'supporting-band-names',
      'type'    => 'text',
      'desc'    => 'Supporting Band Names',
      'clone'   => true
    ),
  )
);

// Venue metabox
$meta_boxes[] = array(
  'id'            => 'venue-details', // $id
  'title'         => 'Venue', // $title
  'pages'         => array('show'), // $Array of pages boxes will appear on
  'context'       => 'normal', // $context (normal, advanced, side)
  'priority'      => 'high', // position in editor (high, core, default, low)

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
  )
);

// Show playlist metaboxes
for ($i=1; $i<=3; $i++) {

  $enumerator = ($i < 10) ? '0'.$i : $i;
  $is_sample_default = ($i === 1) ? 1 : 0;

  $meta_boxes[] = array(
    'id'            => 'show-tracks-' . $enumerator, // $id
    'title'         => 'Playlist Track ' . $enumerator, // $title
    'pages'         => array('show'), // $Array of pages boxes will appear on
    'context'       => 'normal', // $context (normal, advanced, side)
    'priority'      => 'high', // position in editor (high, core, default, low)

    'fields' => array(

      array(
        'id'      => $prefix . 'songTitle-' . $enumerator,
        'type'    => 'text',
        'desc'    => 'songTitle',
      ),
      array(
        'id'      => $prefix . 'artist-' . $enumerator,
        'type'    => 'text',
        'desc'    => 'artistName',
      ),
      array(
        'id'      => $prefix . 'songTrackNumber-' . $enumerator,
        'type'    => 'text',
        'desc'    => 'songTrackNumber',
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
    )
  );
}