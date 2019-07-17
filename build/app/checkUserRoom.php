<?php
  include 'db.php';
  $db = new Database;

  $username = $_COOKIE['user'];

    $db->query('SELECT * FROM users WHERE username = :username');
    $db->bind(':username', $username);
    $row = $db->single();
    $room_id = $row->room_id;

    if($room_id != "") {
      echo true;
    }