<?php

/*
 Theme Name:   Aemi Child
 Theme URI:    http://github.com/aemi-dev/aemi
 Description:  Aemi Child Theme
 Author:       Guillaume COQUARD
 Author URI:   http://aemi.dev/
 Template:     aemi
 Version:      1.0.0
 Tested up to: 5.5
 Requires PHP: 7.2
 License:	   GPL-3.0
 License URI:  http://www.gnu.org/licenses/gpl-3.0.txt
 Tags:         one-column, custom-background, custom-menu, featured-image-header, featured-images, full-width-template, sticky-post, threaded-comments, translation-ready
 Text Domain:  aemichild
*/

function aemi_child_scripts()
{
	// -- Register Styles -- //
	wp_register_style( 'aemi-styles', get_template_directory_uri() . '/style.css' );
	wp_register_style( 'aemi-child-styles', get_stylesheet_uri() );
	
	// -- Register Scripts -- //
	wp_register_script( 'aemi-child-script', get_stylesheet_directory_uri() . '/assets/js/script.js', array( 'aemi-index', 'aemi-script' ), false, false );
	
	// -- Enqueue Styles -- //
	wp_enqueue_style( 'aemi-styles' );
	wp_enqueue_style( 'aemi-child-styles' );
	
	// -- Enqueue Scripts -- //
	wp_enqueue_script( 'aemi-child-script' );
	
	// -- Dequeue Default Styles -- //
	// -- Defer Scripts -- //
	aemi_defer_scripts([
		'aemi-child-script'
	]);
}
add_action( 'wp_enqueue_scripts', 'aemi_child_scripts' );
