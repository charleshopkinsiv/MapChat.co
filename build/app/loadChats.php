<?php
  include 'db.php';
  $db = new Database;

  $room = $_GET['room'];

    // Get messages from DB
    $db->query('SELECT * FROM room WHERE room_id = :room');
    $db->bind(':room', $room);
    $row = $db->single();
    echo $row->messages;
