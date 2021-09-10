<?php 

if(!is_user_logged_in()){
	wp_redirect("/");
	exit;
}

get_header(); 

get_template_part('partials/page-intro', null, [
	'title' => 'Your Favourites',
	'description' => 'See your favourited events.'
]);

?>

<div class="archive__right">
	<div class="posts">
			
	<?php 
		$favourites = new WP_Query(array(
			"post_type" => "favourite",
			"author" => get_current_user_id()
		));

		if($favourites->found_posts){
			$ids = array();
			foreach($favourites->posts as $favourite){
				array_push($ids, get_field("event_id", $favourite->ID));
			}

			$events = new WP_Query(array(
				"post_type" => "event",
				"post__in" => $ids
			));
	
			while($events->have_posts()){
				$events->the_post(); 
				get_template_part("partials/content-event");
			} ?>
			
			<div class="pagination">
				<?php echo paginate_links(); ?>
			</div>
		<?php } ?>
	</div>
</div>

<?php get_footer(); ?>