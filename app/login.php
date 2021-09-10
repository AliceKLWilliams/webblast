<?php


class Login
{
	public function __construct()
	{
		add_action("login_enqueue_scripts", [$this, 'enqueueLogin']);
		add_action("login_headertitle", [$this, 'title']);
		add_action("login_headerurl", [$this, 'url']);
	}
		
	public function enqueueLogin()
	{
		wp_enqueue_style("google_fonts", "//fonts.googleapis.com/css?family=Montserrat");
		wp_enqueue_style("font_awesome", "//use.fontawesome.com/releases/v5.3.1/css/all.css");
		wp_enqueue_style("main", get_theme_file_uri('dist/css/main.css'), NULL, microtime());
	}	

	public function title()
	{
		return "WebBlast";
	}

	public function url()
	{
		return home_url();
	}

}

new Login();