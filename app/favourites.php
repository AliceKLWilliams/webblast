<?php

class Favourites {
	public function __construct()
	{
		add_action('rest_api_init', [$this, 'registerRoutes']);
	}

	public function registerRoutes()
	{
		register_rest_route("/webblast/v1", "favourite", array(
			"methods" => "post",
			"callback" => [$this, "addFavourite"]
		));
	
		register_rest_route("/webblast/v1", "favourite", array(
			"methods" => "delete",
			"callback" => [$this, "removeFavourite"]
		));
	}

	public function addFavourite($data)
	{
		// Check if user has 'favourited' this post
		$isFavourited = new WP_Query(array(
			"post_type" => "favourite",
			"author" => get_current_user_id(),
			"meta_query" => array(
				array(
					"key" => "event_id",
					"compare" => "=",
					"value" => $data["eventID"]
				)
			)
		));
	
		if(is_user_logged_in() AND (!$isFavourited->found_posts) AND get_post_type($data["eventID"]) == "event"){
			return wp_insert_post(array(
				"post_type" => "favourite",
				"post_status" => "publish",
				"meta_input" => array(
					"event_id" => $data["eventID"]
				)
			));
		} else{
			die("Invalid Action.");
		}
	}
	
	public function removeFavourite($data)
	{
		// Check if user owns the favourite
		$isOwner = get_current_user_id() == get_post_field("post_author", $data["favouriteID"]);
	
		// Check if user is logged in
		if(is_user_logged_in() AND $isOwner){
			wp_delete_post($data["favouriteID"], true);
		}
	}
}

new Favourites();