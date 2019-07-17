<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" type="text/css" href="style.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.min.css">
  <link href="https://fonts.googleapis.com/css?family=Nanum+Gothic|Noto+Sans&display=swap" rel="stylesheet">
  <title>Map Chat</title>
</head>
<body>

  <div id="logo"><h1>MapChat.Co <span id="beta">Beta</span></h1></div>

  <div id="backdrop" onclick="closeInfo()"></div>

  <div id="map"></div>

  <i id="info-button" class="fas fa-info-circle fa-4x" onclick="showInfo()"></i>

  <div id="info">
    <i id="info-exit" onclick="closeInfo()" class="fas fa-times"></i>
    <?php if(!isset($_COOKIE['user'])) : ?>
      <h1>Map Chat</h1>
      <p>Map chat is an awesome chat application that allows you to find friends on the map the chat with. Chat with your neighbors, chat with your pals at the pub, map chat is all about bringing people together around the places they love!</p>
      <p>Simply click a marker to join a chat room. To create a chat room simply click the map while you are logged in to place your chat room anywhere you want!</p>
      <div class="form-box">
        <h2>Sign Up</h2>
          <input type="email" id="signup-email" placeholder="Email">
          <input type="text" id="signup-username" placeholder="Username">
          <input type="password" id="signup-pw" placeholder="Password">
          <button onclick="signup()">Sign Up</button>
          <p id="signup-error"></p>
      </div>
      <div class="form-box">
        <h2>Login</h2>
          <input type="text" id="log-email" placeholder="Email">
          <input type="password" id="log-pw" placeholder="Password">
          <button onclick="login()">Login</button>
          <p id="login-error"></p>
      </div>
    <?php else: ?>
      <h1>Hey! Welcome back <?php echo $_COOKIE['user'] ?> <span onclick="logout()">Logout</span></h1>
    <?php endif; ?> 
  </div>


  <div id="chat-room">
    <header>
      <i id="info-exit" onclick="closeChat()" class="fas fa-times"></i>
      <h1><span id="chat-title">Users's</span> Chat Room</h1>
    </header>
    <div id="chat">
      <div id="chat-messages">
      </div>
      <div id="chat-input">
        <input name="Chat Input" id="chat-textbox">
        <button id="message-button" onclick="sendMessage()">Send Message</button>
      </div>
    </div>
  </div>

  <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBnkXfIl1sDabZcnzEdYgy9X-fAXIYcnY4&callback=initMap"
  async defer></script>

  <script src="app-min.js"></script>

</body>
</html>