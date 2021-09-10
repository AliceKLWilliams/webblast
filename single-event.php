<?php get_header(); ?>

<?php while(have_posts()){
	the_post(); 
	
	?>	
	<header class="header">
		<?php if(is_user_logged_in()){ 
			$isLiked = new WP_Query(array(
				"post_type" => "favourite",
				"author" => get_current_user(),
				"meta_query" => array(
					array(
						"key"=>"event_id",
						"compare"=>"=",
						"value" => get_the_ID()
					)
				)
			)); 

			$id = $isLiked->posts[0]->ID;
			
			$btnIcon = ($isLiked->found_posts) ? 'fas fa-heart' : 'far fa-heart';
			$btnData = ($isLiked->found_posts) ? 'yes' : 'no';
			wp_reset_postdata();
			?>
			<button class="btn btn--light btn-text favourite-btn" data-favid="<?php echo $id?>" data-favourited="<?php echo $btnData?>" data-event="<?php echo get_the_ID(); ?>"> <i class="fas fa-heart"></i> <i class="far fa-heart"></i> </button>
		<?php } ?>
		<div class="header__main">
			
			<div class="cal cal--light">
				<?php $startDate = new DateTime(get_field('start_date')); 
					$endDate = new DateTime(get_field("end_date"));

					$formattedMonth = $startDate->format("M");
					if($startDate->format("M") != $endDate->format("M")){
						$formattedMonth = $startDate->format("M") . " - " . $endDate->format("M");
					}

					$formattedDay = $startDate->format("d");
					if($startDate->format("d") != $endDate->format("d")){
						$formattedDay = $startDate->format("d") . " - " . $endDate->format("d");
					}

				?>

				<p><?php echo $formattedMonth; ?></p>
				<p><?php echo $formattedDay; ?></p>
			</div>

			<div>
				<h1><?php the_title()?></h1>
				<?php if(has_excerpt()){ ?>
					<p class="header__tagline"><?php the_excerpt(); ?></p>
				<?php } ?>
			</div>
		</div>

		<div class="header__meta">
			<p><i class="fa fa-map-marker-alt icon"></i><?php the_field('event_street'); ?>, <?php the_field('event_town'); ?>, <?php the_field('event_postcode'); ?></p>
			<?php if(get_field("start_time")){  
				$time = get_field("start_time");
				$time .= (get_field("end_time")) ? ' - '.get_field("end_time") : ''; 
				?> <p><i class="fa fa-clock icon"></i><?php echo $time; ?></p>
			<?php } ?>
		</div>
		
	</header>

	<section class="section">
		<h2 class="section__header  ">Description</h2>
	<p class="description"><?php $desc = (strlen(get_the_content()) != 0) ? get_the_content() : 'Description not provided.'; echo $desc; ?></p>
	</section>

	<?php if(get_field('featured_speakers')) { ?>
		<section class="section">
			<h2 class="section__header">Featured Speakers</h2>
			<div class="event-speakers">
				<?php $speakers = get_field('featured_speakers');
				foreach($speakers as $speaker){ 
					$imgSrc = (has_post_thumbnail($speaker)) ? get_the_post_thumbnail_url($speaker, 'speaker-portrait') : "https://via.placeholder.com/300x385";
					?>
					<div class="speaker-overlayed">
						<img src="<?php echo $imgSrc; ?>" alt="" class="speaker-overlayed__img">
						<div class="speaker-overlayed__overlay">
							<h3 class="speaker-overlayed__name"><?php echo get_the_title($speaker); ?></h3>
							<a class="btn btn--light" href="<?php echo get_the_permalink($speaker);?>"> See Profile</a>
						</div>
					</div>
				<?php } ?>
			</div>
		</section>
	<?php } ?>

	<?php 

	$currentDate = date("Ymd");
	$datePassed = get_field("start_date") < $currentDate;

	if(get_field("end_date")){
		$datePassed = ((get_field("end_date") < $currentDate) AND $datePassed);
	}

	// Cannot Review an event in the future
	if($datePassed) { ?>
		<section class="section reviews">
			<?php 
				$reviews = new WP_Query(array(
					"post_type" => "review",
					"orderby" => "publish_date",
					"order" => "ASC",
					"meta_query" => array(
						array(
							"key" => "event_id",
							"compare" => "=",
							"value" => get_the_ID()
						)
					)
				));
			?>
			<div class="reviews__header">
				<div>
					<h2 class="reviews__title">Reviews</h2>
					<?php 
					if($reviews->found_posts){
						$averageReview = 0;
						while($reviews->have_posts()){
							$reviews->the_post();
							$averageReview += get_field("star_count");
						}
						wp_reset_postdata();

						$averageReview /= $reviews->found_posts;
						?>

						<div class="reviews__avg">
							<p>Average Review: </p>
							<div class="stars stars--inline">
								<?php for($i = 0; $i < $averageReview; $i++) { ?>
									<i class="fa fa-star star"></i>
								<?php } ?>
							</div>
						</div>
					<?php }  else { ?>
						<div class="reviews__avg hidden" aria-hidden="true">
						</div>
					<?php } ?>
				</div>
				
				<?php if(is_user_logged_in()) {
					$foundReview = new WP_Query(array(
						"post_type" => "review",
						"author" => get_current_user_id(),
						"meta_query" => array(
							array(
								"key"=> "event_id",
								"compare" => "=",
								"value" => get_the_ID()
							)
						)
					));

					if($foundReview->found_posts){
						// User has already reviewed the event ?>
						<button class="btn reviews__add btn--hidden" aria-hidden="true">Add Review</button>
					<?php } else { ?>
						<button class="btn reviews__add">Add Review</button>
					<?php }
					
				}?>
			</div>
			
			<div class="reviews__content">
				<?php 
					if(!$reviews->found_posts){
						?> <p class="reviews__none">No Reviews Yet...</p> 
					<?php } else { ?>
						<p class="reviews__none hidden" aria-hidden="true">No Reviews Yet...</p> 
					<?php while($reviews->have_posts()){
						$reviews->the_post(); ?>
						<div class="review" data-id="<?php the_ID()?>">
							<h3 class="review__title"><?php the_title(); ?></h3>
							<?php if(get_current_user_id() == get_the_author_ID()){ ?>
								<div class="review__options">
									<button class="btn open-edit">Edit</button>
									<button class="btn btn--secondary delete-review">Delete</button>
								</div>
							<?php } ?>
							<div class="stars" data-count="<?php the_field('star_count')?>">
								<?php for($i = 0; $i < get_field('star_count'); $i++) { ?>
									<i class="fa fa-star star"></i>
								<?php } ?>
							</div>
							<p class="review__content"><?php echo get_the_content(); ?></p>
						</div>
					<?php } wp_reset_postdata();  }
				?>
			</div>
		</section>

		<div class="modal delete" aria-hidden="true">
			<div class="modal__header">
				<h2 class="modal__title">Delete Review</h2>
				<button class="btn btn--plain modal__close"><i class="fa fa-times"></i></button>
			</div>
			<div class="modal__content">
				<p class="modal__warning">Are you sure you want to delete your review?</p>
				<div class="modal__options">
					<button class="btn btn--secondary delete__no modal__btn">No</button>
					<button class="btn delete__yes modal__btn">Yes</button>
				</div>
			</div>
		</div>

		<div class="modal edit" aria-hidden="true">
			<div class="modal__header">
				<h2 class="modal__title">Edit Review</h2>
				<button class="btn btn--plain modal__close"><i class="fa fa-times"></i></button>
			</div>
			<div class="modal__content">
				<form class="form edit-review">
					<label for="title" class="form__label">Title</label>
					<input type="text" name="title" id="title" class="form__text edit__title">

					<label for="content" class="form__label">Content</label>
					<textarea name="content" id="content" class="form__textarea edit__content"></textarea>

					<label for="stars" class="form__label">Rating /5</label>
					<input type="number" name="stars" id="stars"  min="1" max="5" step="1" class="form__text edit__stars">

					<button class="btn btn--filled">Edit</button>

				</form>
			</div>
		</div>

		<div class="modal add" aria-hidden="true">
			<div class="modal__header">
				<h2 class="modal__title">Add Review</h2>
				<button class="btn btn--plain modal__close"><i class="fa fa-times"></i></button>
			</div>
			<div class="modal__content">
				<form class="form add-review" data-event="<?php echo get_the_ID();?>">
					<label for="title" class="form__label">Title</label>
					<input type="text" name="title" id="title" class="form__text add__title">

					<label for="content" class="form__label">Content</label>
					<textarea name="content" id="content" class="form__textarea add__content"></textarea>

					<label for="stars" class="form__label">Rating /5</label>
					<input type="number" name="stars" id="stars"  min="1" max="5" step="1" class="form__text add__stars">

					<button class="btn btn--filled">Add</button>

				</form>
			</div>
		</div>
	
	<?php } ?>
<?php } ?>

<?php get_footer(); ?>