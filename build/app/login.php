<?php
include 'db.php';

$db = new Database;

$data = json_decode($_POST['data']);

$email = $data->email;
$password = $data->password;

$db->query('SELECT * FROM users WHERE email = :email');
$db->bind(':email', $email);

$row = $db->single();

if(password_verify($password, $row->password)){
  $cookie_name = "user";
  $cookie_value = $row->username;
  setcookie($cookie_name, $cookie_value, time() + (86400 * 365), "/"); 
  echo "Success";
} else {
  echo "Invalid login";
}