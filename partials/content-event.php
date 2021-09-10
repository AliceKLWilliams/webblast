<div class="post">
	<div class="cal">
		<?php $startDate = new DateTime(get_field('start_date')); 
			$endDate = new DateTime(get_field("end_date"));

			$formattedMonth = $startDate->format("M");
			$areMonthsEqual = $startDate->format("M") == $endDate->format("M");
			$areDaysEqual = $startDate->format("d") == $endDate->format("d");

			if(!$areMonthsEqual){
				$formattedMonth = $startDate->format("M") . " - " . $endDate->format("M");
			}
			$formattedDay = $startDate->format("d");
			if(!$areDaysEqual OR ((!$areMonthsEqual) AND $areDaysEqual)){
				$formattedDay = $startDate->format("d") . " - " . $endDate->format("d");
			}

			if(get_field("start_time")){ 
				$time = get_field("start_time");
				$time .= (get_field("end_time")) ? ' - '.get_field("end_time") : '';
			}
		?>

		<p><?php echo $formattedMonth; ?></p>
		<p><?php echo $formattedDay; ?></p>
	</div>

	<div class="post__info">
		<h3 class="post__name  lined"><?php the_title();?></h3>
		<p class="meta">
			<span class="meta__item"><i class="fa fa-map-marker-alt meta__icon"></i><?php the_field('event_town');?></span>
			<?php if(get_field("start_time")) { ?>
				<span class="meta__item"><i class="fa fa-clock meta__icon"></i><?php echo $time; ?></span>
			<?php } ?>
		</p>
		<p class="post__desc"><?php echo wp_trim_words(get_the_content(),20); ?></p>
		<a href="<?php the_permalink();?>" class="post__link">Find Out More</a>
	</div>
</div>