<?php get_header(); ?>

<?php function filterEvents($array) {
	return get_post_type($array) == "event";
} ?>

<?php function filterSpeakers($array) {
	return get_post_type($array) == "speaker";
} ?>

<?php function filterPosts($array) {
	return get_post_type($array) == "post";
} ?>

<div class="header">
	<h1>Results for "<?php echo esc_html(get_search_query(false)); ?>"</h1>
</div>

<div class="results">

	<section>
		<h2 class=" " >Events</h2>
		<div class="results__list">
			<?php if(!array_filter($wp_query->posts, "filterEvents")){
				echo "<p>No events matched that phrase.</p>";
			} ?>
			<?php while(have_posts()) {
				the_post(); 
				if(get_post_type() == "event"){ 
					get_template_part("partials/content-event");
				} 
			} ?>
		</div>
	</section>

	<section>
		<h2 class=" " >Speakers</h2>
		<div class="results__list">
			<?php if(!array_filter($wp_query->posts, "filterSpeakers")){
				echo "<p>No speakers matched that phrase.</p>";
			} ?>
			<?php while(have_posts()) {
				the_post(); 
				if(get_post_type() == "speaker"){ ?>
					<div class="post">
						<img src="<?php the_post_thumbnail_url('speaker-portrait');?>" alt="" class="post__img">
						<div class="post__info">
							<h3 class="post__name"><?php the_title(); ?></h3>
							<p class="post__desc"><?php the_field('biography')?></p>
							<a class="post__link" href="<?php the_permalink(); ?>">View Profile</a>
						</div>
					</div>
				<?php } 
			} ?>
		</div>
	</section>

	<section>
	<h2 class=" " >Updates</h2>
		<div class="results__list">
			<?php if(!array_filter($wp_query->posts, "filterPosts")){
				echo "<p>No updates matched that phrase.</p>";
			} ?>
			<?php while(have_posts()) {
				the_post(); 
				if(get_post_type() == "post"){ ?>
					<div class="post">
						<div class="post__info">
							<h3 class="post__name"><?php the_title() ?></h3>
							<p class="meta">
								<span class="meta__item" ><i class="fa fa-user meta__icon"></i> <?php the_author_posts_link()?></span>
								<span class="meta__item" ><i class="fa fa-clock meta__icon"></i><?php the_time("d-m-Y")?></span>
							</p>
							<p class="post__desc"><?php echo wp_trim_words(get_the_content(), 20)?></p>
							<a href="<?php the_permalink(); ?>" class="post__link">Read More</a>
						</div>
					</div>
				<?php } 
			} ?>
		</div>
	</section>
	
</div>

<?php get_footer(); ?>