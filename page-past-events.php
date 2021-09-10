<?php get_header(); 

archive_left("Past Events", "See what we've been up to.");

?>

<?php $pastEvents = new WP_Query(array(
	"post_type" => "event",
	"orderby" => "meta_value_num",
	"meta_key" => "start_date",
	"order" => "ASC",
	"meta_query" => array(
		array(
			"key" => "end_date",
			"compare" => "<",
			"value" => date("Ymd"),
			"type" => "numeric"
		)
	)
)); ?>
	
<div class="archive__right">
	<div class="posts">
		<?php if(!$pastEvents->have_posts()) { ?>
			<p>No past events.</p>
		<?php } else { 	
			while($pastEvents->have_posts()){
				$pastEvents->the_post();
				get_template_part("partials/content-event"); 
			}
		} wp_reset_postdata(); ?>

	
	<div class="pagination">
		<?php echo paginate_links(); ?>
	</div>
	</div>
</div>

<?php get_footer(); ?>