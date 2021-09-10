<?php get_header(); ?>

	<div class="landing">

		<div class="landing__left">
			<div class="left__content">
				<h1>Web Blast</h1>
				<p>Running web workshops and events since 1998.</p>
			</div>
		</div>
		<img src="<?php echo get_theme_file_uri('dist/img/splash.jpg')?>" alt="" class="landing__right">
	</div>

	<?php

		$upcomingEvents = new WP_Query(array(
			"post_type" => "event",
			"posts_per_page" => 4,
			"meta_query" =>  array(
				array(
					"key" => "start_date",
					"compare" => ">=",
					"value" => date("Ymd"),
					"type" => "numeric"
				)
			),
			"order" => "ASC",
			"orderby" => "meta_value_num",
			"meta_key" => "start_date",
		)); 

	?>

	<section class="front-section">
		<h2 class="front__heading  ">Upcoming Events</h2>
		<div class="events">
			<?php while($upcomingEvents->have_posts()) {
				$upcomingEvents->the_post();
				get_template_part("components/content-event");
			} wp_reset_postdata(); ?>

			<?php if(!$upcomingEvents->found_posts){ ?>
				<p>No Upcoming Events.</p>
			<?php } ?>
		</div>
	</section>

	
	<section class="front-section statistics">
		<div class="stat">
			<p class="stat__num">20'000</p>
			<p class="stat__unit">Learners per Year</p>
		</div>
		<div class="stat">
			<p class="stat__num">1'000</p>
			<p class="stat__unit">Events</p>
		</div>
		<div class="stat">
			<p class="stat__num">5</p>
			<p class="stat__unit">Countries</p>
		</div>
		<div class="stat">
			<p class="stat__num">Free</p>
			<p class="stat__unit">For All</p>
		</div>
	</section>


	<section class="front-section">
		<h2 class="front__heading  ">
			Some of Our Speakers
		</h2>

		<div class="front-speakers">
			<?php $speakers = new WP_Query(array(
				"post_type" => "speaker",
				"posts_per_page" => 4,
				"orderby" => "rand"
			));

			while($speakers->have_posts()) { 
				$speakers->the_post();
				$imgSrc = (has_post_thumbnail()) ? get_the_post_thumbnail_url(get_the_ID(), 'speaker-portrait') : "https://via.placeholder.com/300x385";
				?>
				<div class="speaker-overlayed front-speaker">
					<img src="<?php echo $imgSrc; ?>" alt="" class="speaker-overlayed__img">
					<div class="speaker-overlayed__overlay">
						<h3 class="speaker-overlayed__name"><?php the_title(); ?></h3>
						<a class="btn btn--light" href="<?php the_permalink() ;?>"> See Profile</a>
					</div>
				</div>

			<?php } wp_reset_postdata(); ?>
			
		</div>
	</section>

	


<?php get_footer(); ?>