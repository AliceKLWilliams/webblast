<?php get_header(); ?>

<?php while(have_posts()){
	the_post(); ?>	
	<div class="header">
		<h1 class="header__title"><?php the_title()?></h1>
		<div class="header__meta">
			<p><i class="fa fa-user icon"></i><a href="<?php echo get_author_posts_url(get_the_ID()); ?>"><?php the_author();?></a> </p>
			<p><i class="fa fa-clock icon"></i><?php the_time("d-m-Y")?></p>
		</div>
	</div>

	<div class="content">
		<p><?php the_content() ?></p>
	</div>
<?php } ?>


<?php get_footer(); ?>