<?php

class Admin {
	public function __construct()
	{		
		add_action("wp_loaded", [$this, 'removeAdminBar']);
		add_action("admin_init", [$this, 'redirectSubscribers']);
	}

	public function removeAdminBar()
	{
		show_admin_bar(false);
	}

	public function redirectSubscribers()
	{
		$user = wp_get_current_user();
		if(count($user->roles) == 1 AND $user->roles[0] == "subscriber"){
			wp_redirect("/");
			exit;
		}
	}
}

new Admin();