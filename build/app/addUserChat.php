<?php
  include 'db.php';
  $db = new Database;

  $location = $_GET['location'];
  $username = $_COOKIE['user'];

  $db->query('INSERT INTO room (location, username) VALUES(:location, :username)');
  $db->bind(':location', $location);
  $db->bind(':username', $username);
  if($db->execute()) {
    $db->query('SELECT * FROM room WHERE username = :username');
    $db->bind(':username', $username);
    $row = $db->single();
    $room_id = $row->room_id;
    echo $room_id;

    $db->query('UPDATE users SET room_id = :room_id WHERE username = :username');
    $db->bind(':room_id', $room_id);
    $db->bind(':username', $username);
    if($db->execute()) {
      echo "success";
    }
  }