<?php 

require __DIR__ . '/vendor/autoload.php';

include "app/cpt.php";
include "app/reviews.php";

function site_scripts(){
	wp_enqueue_script('main', get_theme_file_uri('dist/js/main.js'), NULL, microtime(), true);

	wp_enqueue_style("google_fonts", "//fonts.googleapis.com/css?family=Montserrat");
	wp_enqueue_style("font_awesome", "//use.fontawesome.com/releases/v5.3.1/css/all.css");
	wp_enqueue_style("main", get_theme_file_uri('dist/css/main.css'), NULL, microtime());

	wp_localize_script("main", "data", array(
		"root_url" => get_site_url(),
		"nonce" => wp_create_nonce("wp_rest")
	));
}

add_action("wp_enqueue_scripts", "site_scripts");

function login_styles(){
	wp_enqueue_style("google_fonts", "//fonts.googleapis.com/css?family=Montserrat");
	wp_enqueue_style("font_awesome", "//use.fontawesome.com/releases/v5.3.1/css/all.css");
	wp_enqueue_style("main", get_theme_file_uri('dist/css/main.css'), NULL, microtime());
}

add_action("login_enqueue_scripts", "login_styles");

function login_title(){
	return "WebBlast";
}

add_action("login_headertitle", "login_title");

function login_url(){
	return home_url();
}

add_action("login_headerurl", "login_url");

function setup_site(){
	add_theme_support("title-tag");

	// Thumbnail Setup
	add_theme_support("post-thumbnails");
	add_image_size("speaker-portrait", 300, 385, true);
}

add_action("after_setup_theme", "setup_site");


function edit_queries($query){
	if(!is_admin() AND is_post_type_archive('event') AND $query->is_main_query()){
		// Edit the event archive to only show current events
		$query->set("meta_query", array(
			array(
				"key" => "start_date",
				"compare" => "<=",
				"value" => date("Ymd"),
				"type" => "numeric"
			),
			array(
				"key" => "end_date",
				"compare" => ">=",
				"value" => date("Ymd"),
				"type" => "numeric"
			)
		));

		$query->set("relation", "AND");

		$query->set("orderby", "meta_value_num");
		$query->set("meta_key", "start_date");
		$query->set("order", "ASC");
	}
}

add_action("pre_get_posts", "edit_queries");


function redirect_home(){
	$user = wp_get_current_user();
	if(count($user->roles) == 1 AND $user->roles[0] == "subscriber"){
		wp_redirect("/");
		exit;
	}
}

add_action("admin_init", "redirect_home");

function remove_admin_bar(){
	show_admin_bar(false);
}

add_action("wp_loaded", "remove_admin_bar");

function add_rest_routes(){

	// FAVOURITES

	register_rest_route("/webblast/v1", "favourite", array(
		"methods" => "post",
		"callback" => "add_favourite"
	));

	register_rest_route("/webblast/v1", "favourite", array(
		"methods" => "delete",
		"callback" => "remove_favourite"
	));
}

add_action("rest_api_init", "add_rest_routes");

function add_favourite($data){
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

function remove_favourite($data){
	// Check if user owns the favourite
	$isOwner = get_current_user_id() == get_post_field("post_author", $data["favouriteID"]);

	// Check if user is logged in
	if(is_user_logged_in() AND $isOwner){
		wp_delete_post($data["favouriteID"], true);
	}
}


// Reusable Components

function archive_left($title, $description){
	?>	
	<div class="archive__left">
		<div class="archive__intro">
			<h1><?php echo $title; ?></h1>
			<p><?php echo $description; ?></p>
		</div>
	</div>
<?php }

?>