<?php get_header(); ?>

<?php while(have_posts()) {
	the_post(); ?>
	<div class="header">
		<h1><?php the_title(); ?></h1>
	</div>

	<section class="section">
		<p><?php the_content();?></p>
	</section>
<?php } ?>

<?php get_footer(); ?>