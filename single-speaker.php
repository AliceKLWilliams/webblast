<?php get_header(); ?>

<?php while(have_posts()){
	the_post(); ?>	
	<div class="header">
		<h1><?php the_title()?></h1>
	</div>

	<div class="thirds user">
		<div class="one-third">
			<img class="user__image" src="<?php echo the_post_thumbnail_url();?>" alt="">
			<ul class="user__social">
				<?php if(get_field("twitter_handle")) { ?>
					<li><a class="user__link" href="http://www.twitter.com/<?php the_field("twitter_handle");?>"><i class="fab fa-twitter user__icon"></i>@<?php the_field("twitter_handle"); ?></a></li>
				<?php } ?>
				<?php if(get_field("github")) { ?>
					<li><a class="user__link" href="http://<?php the_field("github");?>"><i class="fab fa-github user__icon"></i><?php the_field("github"); ?></a></li>
				<?php } ?>
				<?php if(get_field("personal_site")) { ?>
					<li><a class="user__link" href="http://<?php the_field("personal_site");?>"><i class="fa fa-globe-americas user__icon"></i><?php the_field("personal_site");?></a></li>
				<?php } ?>
			</ul>
		</div>

		<div class="two-thirds">
			<section class="user__section">
				<h2 class="section__header">Biography</h2>
				<p><?php the_field('biography') ?></p>
			</section>
		</div>
	</div>



	<?php $speakerEvents = new WP_Query(array(
		"post_type" => "event",
		"meta_query" => array(
			array(
				"key" => "featured_speakers",
				"compare" => "LIKE",
				"value" => '"'.get_the_ID().'"'
			),
			array(
				"key" => "start_date",
				"compare" => ">=",
				"value" => date("Ymd"),
				"type" => "numeric"
			)
		)
	)); ?>

	<?php if($speakerEvents->posts) { ?>
		<section class="section">
			<h2 class="section__header  ">Upcoming Events</h2>
			<div class="speaker-events">
				<?php while($speakerEvents->have_posts()) {
					$speakerEvents->the_post(); 
					get_template_part("components/content-event");
				}  wp_reset_postdata(); ?>
			</div>
		</section>
	<?php } ?>
<?php } ?>


<?php get_footer(); ?>