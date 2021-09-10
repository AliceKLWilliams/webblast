<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<?php wp_head(); ?>
</head>
<body>
	<button class="nav__open">
		<i class="fa fa-bars"></i>
	</button>
	<nav class="nav">
		<button class="nav__close">
			<i class="fa fa-times"></i>
		</button>
			<ul class="nav__links">
				<li class="nav__item"><a href="<?php echo site_url(); ?>"class="nav__link">Home</a></li>
				<li class="nav__item dropdown">
					<button class="nav__link btn-text dropdown__btn">Events<i class="fas fa-angle-down dropdown__icon"></i></button>
					<ul class="dropdown__list">
						<li><a href="<?php echo get_post_type_archive_link('event');?>" class="dropdown__link">Current Events</a></li>
						<li><a href="<?php echo esc_url(site_url("/future-events"));?>" class="dropdown__link">Future Events</a></li>
						<li><a href="<?php echo esc_url(site_url("/past-events"));?>" class="dropdown__link">Past Events</a></li>
					</ul>
				</li>
				<li class="nav__item"><a href="<?php echo get_post_type_archive_link('speaker')?>"class="nav__link">Speakers</a></li>
				<li class="nav__item"><a href="<?php echo site_url('/blog')?>" class="nav__link">Updates</a></li>
				<?php if(!is_user_logged_in()){ ?>
					<li class="nav__item"><a href="<?php echo wp_login_url(); ?>" class="nav__link">Login</a></li>
					<li class="nav__item"><a href="<?php echo wp_registration_url(); ?>" class="nav__link">Register</a></li>
				<?php } else { ?>
					<li class="nav__item dropdown">
						<button class="nav__link btn-text dropdown__btn">User<i class="fas fa-angle-down dropdown__icon"></i></button>
						<ul class="dropdown__list">
							<li><a href="<?php echo wp_logout_url(get_permalink()); ?>" class="dropdown__link">Logout</a></li>
							<li><a href="<?php echo esc_url(site_url("/favourites"))?>" class="dropdown__link">Favourites</a></li>
						</ul>
					</li>
				<?php } ?>

				<li class="nav__item"><a href="<?php echo esc_url(site_url("/about-us"))?>" class="nav__link">About Us</a></li>
			</ul>
			<? get_search_form(); ?>
	</nav>
