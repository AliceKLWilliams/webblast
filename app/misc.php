<?php

function setup_site(){
	add_theme_support("title-tag");

	// Thumbnail Setup
	add_theme_support("post-thumbnails");
	add_image_size("speaker-portrait", 300, 385, true);
}

add_action("after_setup_theme", "setup_site");