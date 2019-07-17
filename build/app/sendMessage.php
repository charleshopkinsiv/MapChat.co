<?php
  include 'db.php';
  $db = new Database;

  $message = $_GET['message'];
  if(isset($_COOKIE['user'])){$username = $_COOKIE['user'];}
  else{$username = "Guest";}
  
  $room = $_GET['room'];

  // Get messages from DB
  $db->query('SELECT * FROM room WHERE room_id = :room');
  $db->bind(':room', $room);
  $row = $db->single();
  $messages = $row->messages;
  if($messages == "") {
    $messages = array();
  } else {
    $messages = json_decode($messages);
  }

  $message_arr = array();
  array_push($message_arr, $username, $message);

  array_push($messages, $message_arr);

  $messages = json_encode($messages);

  $db->query('UPDATE room SET messages = :messages WHERE room_id = :room');
  $db->bind(':messages', $messages);
  $db->bind(':room', $room);
  if($db->execute()) {
    echo "Success";
  }