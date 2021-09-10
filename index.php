<?php get_header(); 

get_template_part('partials/page-intro', null, [
	'title' => 'Updates',
	'description' => 'Read our newest updates.'
]);

?>

	
<div class="archive__right">
	<div class="posts">
		<?php while(have_posts()){
				the_post(); ?>

				<div class="post">
					<div class="post__info">
						<h2 class="post__name  "><?php the_title() ?></h2>
						<p class="meta">
							<span class="meta__item"><i class="fa fa-user meta__icon"></i><a href="<?php echo get_author_posts_url(get_the_ID())?>" class="meta__link"><?php echo get_the_author();?></a></span>
							<span class="meta__item"><i class="fa fa-clock meta__icon"></i><?php the_time("d-m-Y")?></span>
						</p>
						<p class="post__desc"><?php echo wp_trim_words(get_the_content(), 20)?></p>
						<a href="<?php the_permalink(); ?>" class="post__link">Read More</a>
					</div>
				</div>

		<?php } ?>

	<div class="pagination">
		<?php echo paginate_links(); ?>
	</div>
	</div>
</div>


<?php get_footer(); ?>