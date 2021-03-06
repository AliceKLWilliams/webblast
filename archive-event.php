<?php get_header(); 

	get_template_part('partials/page-intro', null, [
		'title' => 'Current Events',
		'description' => 'Check out what events we have going on.'
	]);

?>
	
<div class="archive__right">
	<div class="posts">
		<?php if(!have_posts()) { ?>
			<p>No Current Events.</p>
		<?php } else { 
			while(have_posts()){
				the_post();
				get_template_part("partials/content-event");
			} 
		} ?>
		
	<div class="pagination">
		<?php echo paginate_links(); ?>
	</div>
	</div>
</div>

<?php get_footer(); ?>