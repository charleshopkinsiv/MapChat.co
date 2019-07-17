<?php
  include 'db.php';
  $db = new Database;

  $username = $_COOKIE['user'];

  $db->query('UPDATE users SET room_id = "" WHERE username = :username');
  $db->bind(':username', $username);
  if($db->execute()) {
    $db->query('DELETE FROM room WHERE username=:username');
    $db->bind(':username', $username);
    if($db->execute()) {
      echo "Success";
    }
  }