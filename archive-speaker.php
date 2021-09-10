<?php get_header(); 

	get_template_part('partials/page-intro', null, [
		'title' => 'Speakers',
		'description' => 'Check out our talented speakers.'
	]);

?>

	
<div class="archive__right">
	<div class="posts">
		<?php while(have_posts()){
				the_post(); ?>

				<div class="post">
					<?php if(has_post_thumbnail()){ ?>
						<img src="<?php the_post_thumbnail_url('speaker-portrait');?>" alt="" class="post__img">
					<?php } ?>
					<div class="post__info">
						<h2 class="post__name  "><?php the_title(); ?></h2>
						<p class="post__desc"><?php the_field('biography')?></p>
						<a class="post__link" href="<?php the_permalink(); ?>">View Profile</a>
					</div>
				</div>

		<?php } ?>

	
	<div class="pagination">
		<?php echo paginate_links(); ?>
	</div>
	</div>
</div>

<?php get_footer(); ?>