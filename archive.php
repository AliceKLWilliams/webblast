<?php get_header(); 

archive_left(the_archive_title(), the_archive_description());

?>

<div class="archive__right">
	<div class="posts">
		<?php while(have_posts()){
				the_post(); ?>
				<div class="post">
					<div class="post__info">
						<h2 class="post__name  "><?php the_title() ?></h2>
						<p class="meta">
							<span class="meta__item" ><i class="fa fa-user meta__icon"></i> <?php the_author_posts_link()?></span>
							<span class="meta__item" ><i class="fa fa-clock meta__icon"></i><?php the_time("d-m-Y")?></span>
						</p>
						<p class="post__desc"><?php echo wp_trim_words(get_the_content(), 20)?></p>
						<a href="<?php the_permalink(); ?>" class="post__link">Read More</a>
					</div>
				</div>

		<?php } ?>
	</div>
	
	<div class="pagination">
		<?php echo paginate_links(); ?>
	</div>
	</div>
</div>

<?php get_footer(); ?>