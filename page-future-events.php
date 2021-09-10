<?php get_header(); 

archive_left("Future Events", "See what we have up and coming.");

?>

<?php $futureEvents = new WP_Query(array(
	"post_type" => "event",
	"orderby" => "meta_value_num",
	"meta_key" => "start_date",
	"order" => "ASC",
	"meta_query" => array(
		array(
			"key" => "start_date",
			"compare" => ">",
			"value" => date("Ymd"),
			"type" => "numeric"
		)
	)
)); ?>
	
<div class="archive__right">
	<div class="posts">
		<?php if(!$futureEvents->have_posts()) { ?>
			<p>No events coming up.</p>
		<?php } else {
			while($futureEvents->have_posts()){
				$futureEvents->the_post();
				get_template_part("partials/content-event");
			} wp_reset_postdata(); 
		} ?>

	
	<div class="pagination">
		<?php echo paginate_links(); ?>
	</div>
	</div>
</div>

<?php get_footer(); ?>