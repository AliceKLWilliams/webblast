<?php get_header(); ?>

<?php while(have_posts()) {
	the_post(); ?>
	<div class="header">
		<h1 class="header__title"><?php the_title(); ?></h1>
		<p class="header__tagline">Read more about our history.</p>
	</div>

	<?php $timelineEvents = new WP_Query(array(
			"post_type" => "timeline-event",
			"posts_per_page" => -1,
			"order" => "ASC",
			"orderby" => "meta_value",
			"meta_key" => "event_year"
		)); 
		
		if($timelineEvents->found_posts){?>
			<section class="section timeline"> 
			<?php while($timelineEvents->have_posts()){
				$timelineEvents->the_post();?>		
					<div class="timeline__event">
						<h2 class="timeline__title"><?php the_title(); ?></h2> <span class="timeline__year"><?php the_field("event_year")?></span>
						<p class="timeline__content timeline__content--short"><?php echo wp_trim_words(get_the_content(), 20); ?></p>
						<p class="timeline__content timeline__content--long timeline__content--hide"><?php echo get_the_content(); ?></p>
						<button class="btn btn--plain timeline__more">Read More</button>
					</div>
			<?php } ?>	
			</section>
			<?php wp_reset_postdata();
		}
	?>

	
		

	
<?php } ?>

<?php get_footer(); ?>