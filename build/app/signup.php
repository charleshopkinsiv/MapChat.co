<?php
include 'db.php';

$db = new Database;

$data = json_decode($_POST['data']);

$email = $data->email;
$username = $data->username;
$password = password_hash($data->password, PASSWORD_DEFAULT);

// Check that username isn't already there
$db->query('SELECT * FROM users WHERE username = :username');
$db->bind(':username', $username);
$row = $db->single();
if($db->rowCount() > 0){
  echo "Username Already in Use";
  return;
}

// Check that email isn't already there
$db->query('SELECT * FROM users WHERE email = :email');
$db->bind(':email', $email);
$row = $db->single();
if($db->rowCount() > 0){
  echo "Email Already in Use";
  return;
}

// Submit new user to DB
$db->query('INSERT INTO users (email, username, password) VALUES(:email, :username, :password)');
$db->bind(':email', $email);
$db->bind(':username', $username);
$db->bind(':password', $password);
if($db->execute()) {echo "Success";};