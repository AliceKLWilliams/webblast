<?php

class Events
{
	public function __construct()
	{
		add_action("pre_get_posts", [$this, 'currentEventsOnArchive']);
	}
		
	public function currentEventsOnArchive($query)
	{
		if(!is_admin() AND is_post_type_archive('event') AND $query->is_main_query()){
			// Edit the event archive to only show current events
			$query->set("meta_query", array(
				array(
					"key" => "start_date",
					"compare" => "<=",
					"value" => date("Ymd"),
					"type" => "numeric"
				),
				array(
					"key" => "end_date",
					"compare" => ">=",
					"value" => date("Ymd"),
					"type" => "numeric"
				)
			));
	
			$query->set("relation", "AND");
	
			$query->set("orderby", "meta_value_num");
			$query->set("meta_key", "start_date");
			$query->set("order", "ASC");
		}
	}
}

new Events();