<?php
  include 'db.php';
  $db = new Database;

  $db->query('SELECT * 
  FROM room
  ');

  $results = $db->resultSet();

  $locations = array();

  foreach($results as $location) {
    $loc_array = array();
    array_push($loc_array, $location->location, $location->room_id);

    array_push($locations, $loc_array);
  }

  $locations = json_encode($locations);

  print_r($locations);