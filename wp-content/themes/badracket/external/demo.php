<?php
/**
 * Registering meta boxes
 *
 * All the definitions of meta boxes are listed below with comments.
 * Please read them CAREFULLY.
 *
 * You also should read the changelog to know what has been changed before updating.
 *
 * For more information, please visit:
 * @link http://www.deluxeblogtips.com/meta-box/
 */

/********************* META BOX DEFINITIONS ***********************/

/**
 * Prefix of meta keys (optional)
 * Use underscore (_) at the beginning to make keys hidden
 * Alt.: You also can make prefix empty to disable it
 */
// Better has an underscore as last sign
$prefix = 'YOUR_PREFIX_';

global $meta_boxes;

$meta_boxes = array();


// Add the Meta Box
function add_custom_meta_box() {
    add_meta_box(
    'custom_meta_box', // $id
    'Custom Meta Box', // $title 
    'show_custom_meta_box', // $callback
    'post', // $page
    'normal', // $context
    'high'); // $priority
}



// 1st meta box
$meta_boxes[] = array(
	'id' 						=> 'personal', // $id
	'title' 				=> 'Personal Information', // $title 
	'pages' 				=> array( 'post', 'video' ), // $Array of pages boxes will appear on
	'context' 			=> 'normal', // $context (normal, advanced, side)
	'priority' 			=> 'high', // position in editor (high, core, default, low)

	// List of meta fields
	'fields' => array(

		// TEXT
		array(
			'name' 		=> 'Full name', // Field name - Will be used as label
			'id' 			=> $prefix . 'fname', // Field ID, i.e. the meta key
			'desc' 		=> 'Format: First Last', // Field description (optional)
			'clone' 	=> true, // CLONES: Add to make the field cloneable (i.e. have multiple value)
			'type'  	=> 'text',
			'std' 		=> 'Anh Tran', // Default value (optional)
		),

		// DATE
		array(
			'name' 		=> 'Day of Birth',
			'id'   		=> "{$prefix}dob",
			'type' 		=> 'date',
			'format' 	=> 'd MM, yy', // Date format, default yy-mm-dd. Optional. See: http://goo.gl/po8vf
			'clone' 	=> 'true',
		),

		// RADIO BUTTONS
		array(
			'name' 		=> 'Gender',
			'id'   		=> "{$prefix}gender",
			'type' 		=> 'radio',

			'options'	=> array( 	// Array of 'value' => 'Label' pairs for radio options. Note: the 'key' is stored in meta field, not the 'value'
					'm'			=> 'Male',
					'f'			=> 'Female',
				),
			'std'  		=> 'm',
			'desc' 		=> 'Need an explaination?',
		),

		// TEXTAREA
		array(
			'name' => 'Bio',
			'desc' => "What's your professions? What have you done so far?",
			'id'   => "{$prefix}bio",
			'type' => 'textarea',
			'std'  => "I'm a special agent from Vietnam.",
			'cols' => '40',
			'rows' => '8',
		),


		// SELECT BOX
		array(
			'name' 			=> 'Where do you live?',
			'id'   			=> "{$prefix}place",
			'type' 			=> 'select',
			
			'options' 	=> array( // Array of 'value' => 'Label' pairs for select box
					'usa'			=> 'USA',
					'vn'			=> 'Vietnam',
				),
			'multiple' 	=> true, // Select multiple values, optional. Default is false.
			'std'  			=> array( 'vn' ), 	// Default value, can be string (single value) or array (for both single and multiple values)
			'desc' 			=> 'Select the current place, not in the past',
		),


		// CHECKBOX
		array(
			'name' 		=> 'About WordPress',
			'id'   		=> "{$prefix}love_wp",
			'type' 		=> 'checkbox',
			'desc' 		=> 'I love WordPress',
			'std' 		=> 1, 			// Value can be 0 or 1
		),

		// HIDDEN
		array(
			'id'   		=> "{$prefix}invisible",
			'type' 		=> 'hidden',
			'std' 		=> "No, I'm visible", // Hidden field must have predefined value
		),

		// WYSIWYG/RICH TEXT EDITOR
		array(
			'name' => 'Your thoughts about Deluxe Blog Tips',
			'id'   => "{$prefix}thoughts",
			'type' => 'wysiwyg',
			'std'  => "It's great!",
			'desc' => 'Do you think so?',
		),

		// FILE UPLOAD
		array(
			'name' 	=> 'Upload your source code',
			'desc' 	=> 'Any modified code, or extending code',
			'id'   	=> "{$prefix}code",
			'type' 	=> 'file',
		),


		// IMAGE UPLOAD
		array(
			'name' => 'Screenshots',
			'desc' => 'Screenshots of problems, warnings, etc.',
			'id'   => "{$prefix}screenshot",
			'type' => 'image',
		),


		// PLUPLOAD IMAGE UPLOAD (WP 3.3+)
		array(
			'name'             => 'Screenshots (plupload)',
			'desc'             => 'Screenshots of problems, warnings, etc.',
			'id'               => "{$prefix}screenshot2",
			'type'             => 'plupload_image',
			'max_file_uploads' => 4,
		),


		// THICKBOX IMAGE UPLOAD (WP 3.3+)
		array(
			'name' => 'Screenshots (thickbox upload)',
			'desc' => 'Screenshots of problems, warnings, etc.',
			'id'   => "{$prefix}screenshot3",
			'type' => 'thickbox_image',
		),

		// COLOR
		array(
			'name' => 'Your favorite color',
			'id'   => "{$prefix}color",
			'type' => 'color',
		),


		// CHECKBOX LIST
		array(
			'name' 		=> 'Your hobby',
			'id'   		=> "{$prefix}hobby",
			'type' 		=> 'checkbox_list',
			
			'options' => array( // Options of checkboxes, in format 'value' => 'Label'
					'reading' => 'Books',
					'sport'   => 'Gym, Boxing',
				),

			'desc' 		=> 'What do you do in free time?',
		),


		// TIME
		array(
			'name' 		=> 'When do you get up?',
			'id'   		=> "{$prefix}getdown",
			'type' 		=> 'time',
			'format' 	=> 'hh:mm:ss', // Time format, default hh:mm. Optional. @link See: http://goo.gl/hXHWz
		),


		// DATETIME
		array(
			'name' 		=> 'When were you born?',
			'id'   		=> "{$prefix}born_time",
			'type' 		=> 'datetime',
			'format' 	=> 'hh:mm:ss', // Time format, default yy-mm-dd hh:mm. Optional. @link See: http://goo.gl/hXHWz
		),

		
		// TAXONOMY
		array(
			'name'    => 'Categories',
			'id'      => "{$prefix}cats",
			'type'    => 'taxonomy',
			'options' => array(
					'taxonomy' 	=> 'difficutly', // Taxonomy name
					'type' 			=> 'select_tree', // How to show taxonomy: 'checkbox_list' (default) or 'checkbox_tree', 'select_tree' or 'select'. Optional
					'args' 			=> array()	// Additional arguments for get_terms() function. Optional
				),
			'desc' 		=> 'Choose One Category',
		)



	) //end fields array
); //end $meta_boxes array



/********************* META BOX REGISTERING ***********************/

function YOUR_PREFIX_register_meta_boxes()
{
	global $meta_boxes;

	// Make sure there's no errors when the plugin is deactivated or during upgrade
	if ( class_exists( 'RW_Meta_Box' ) )
	{
		foreach ( $meta_boxes as $meta_box )
		{
			new RW_Meta_Box( $meta_box );
		}
	}
}
// Hook to 'admin_init' to make sure the meta box class is loaded before
// (in case using the meta box class in another plugin)
// This is also helpful for some conditionals like checking page template, categories, etc.
add_action( 'admin_init', 'YOUR_PREFIX_register_meta_boxes' );