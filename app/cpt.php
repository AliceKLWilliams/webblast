<?php

add_action('init', function() {
	register_extended_post_type('speaker', [
		'menu_icon' => 'dashicons-universal-access'
	]);
	register_extended_post_type('event', [
		'menu_icon' => 'dashicons-calendar-alt'
	]);
	register_extended_post_type('favourite', [
		'menu_icon' => 'dashicons-star-filled',
		'has_archive' => false,
	]);
	register_extended_post_type('review', [
		'menu_icon' => 'dashicons-welcome-write-blog'
	]);
	register_extended_post_type('timeline-event', [
		'menu_icon' => 'dashicons-clock'
	]);
});