<?php

add_action('init', function() {
	register_extended_post_type('speaker');
	register_extended_post_type('event');
	register_extended_post_type('favourite');
	register_extended_post_type('review');
	register_extended_post_type('timeline-event');
});