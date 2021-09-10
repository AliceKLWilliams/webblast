<?php 

require __DIR__ . '/vendor/autoload.php';

include "app/cpt.php";
include "app/reviews.php";
include "app/favourites.php";
include "app/admin.php";
include "app/enqueue.php";
include "app/login.php";
include "app/events.php";
include "app/misc.php";


// Reusable Components

function archive_left($title, $description){
	?>	
	<div class="archive__left">
		<div class="archive__intro">
			<h1><?php echo $title; ?></h1>
			<p><?php echo $description; ?></p>
		</div>
	</div>
<?php }

?>