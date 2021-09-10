<?php


class Enqueue
{
	public function __construct()
	{
		add_action("wp_enqueue_scripts", [$this, 'enqueue']);
	}

		
	public function enqueue()
	{
		wp_enqueue_script('main', get_theme_file_uri('dist/js/main.js'), NULL, microtime(), true);

		wp_enqueue_style("google_fonts", "//fonts.googleapis.com/css?family=Montserrat");
		wp_enqueue_style("font_awesome", "//use.fontawesome.com/releases/v5.3.1/css/all.css");
		wp_enqueue_style("main", get_theme_file_uri('dist/css/main.css'), NULL, microtime());

		wp_localize_script("main", "data", array(
			"root_url" => get_site_url(),
			"nonce" => wp_create_nonce("wp_rest")
		));
	}
}

new Enqueue();