<?php


class Reviews {
	public function __construct()
	{
		add_action('rest_api_init', [$this, 'registerRoutes']);
		add_filter("wp_insert_post_data", [$this, 'sanitizeReview'], 10, 2);
	}

	public function sanitizeReview($data)
	{
		if ($data["post_type"] == "review"){
			$data["post_title"] = sanitize_text_field($data["post_title"]);
			$data["post_content"] = sanitize_textarea_field($data["post_content"]);
		}
	
		return $data;
	}

	public function registerRoutes()
	{
		register_rest_route("/webblast/v1", "review", array(
			"methods" => "post",
			"callback" => [$this, "addReview"]
		));
	
		register_rest_route("/webblast/v1", "review", array(
			"methods" => "delete",
			"callback" => [$this, "deleteReview"]
		));
	
		register_rest_route("/webblast/v1", "review", array(
			"methods" => "put",
			"callback" => [$this, "updateReview"]
		));
	}

	public function deleteReview($data)
	{
		$isOwner = get_current_user_id() == get_post_field("post_author", $data["reviewID"]);
	
		if(is_user_logged_in() && $isOwner){
			return wp_delete_post($data['reviewID'], true);
		} else{
			return new WP_Error("incorrect_permissions", "You need to  be logged in, and the review author to delete the review. ", array("status" => 403));
		}
	
	}

		
	public function updateReview($data)
	{
		$isOwner = get_current_user_id() == get_post_field("post_author", $data["review_id"]);
		if(is_user_logged_in() && $isOwner){
			return wp_update_post(array(
				"ID" => $data["review_id"],
				"post_title" => $data["title"],
				"post_content" => $data["content"],
				"meta_input" => array(
					"star_count" => $data["star_count"]
				)
			));
		} else{
			return new WP_Error("incorrect_permissions", "ou need to  be logged in, and the review author to update the review.", array("status" => 403));
		}
	}

		
	public function addReview($data)
	{
		// Check if the event has finished
		$currentDate = date("Ymd");
		$datePassed = get_field("start_date", $data["event_id"]) < $currentDate;

		if(get_field("end_date", $data["event_id"])){
			$datePassed = ((get_field("end_date", $data["event_id"]) < $currentDate) AND $datePassed);
		}

		if(!$datePassed){
			return new WP_Error("future_event", "Cannot review an event in the future.", array("status" => 403));
		}

		if(is_user_logged_in()){
			// Check to see if they have already added a review
			$userReviews = new WP_Query(array(
				"post_type" => "review",
				"author" => get_current_user_id(),
				"meta_query" => array(
					array(
						"key" => "event_id",
						"compare" => "=",
						"value" => $data["event_id"]
					)
				)
			));

			if($userReviews->found_posts){
				// User already has a review for this event
				return new WP_Error("already_reviewed", "User has already reviewed this event.", array("status" => 403));
			}


			return wp_insert_post(array(
				"post_type"=> "review",
				"post_status" => "publish",
				"post_content" => $data['content'],
				"post_title" => $data['title'],
				"meta_input" => array(
					"event_id"=> $data['event_id'],
					"star_count" => $data['star_count']
				)
			));
		} else {
			die("Invalid Action.");
		}
	}
}

new Reviews();