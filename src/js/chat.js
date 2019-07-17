let chatRoom = document.getElementById('chat-room');
let messageButton = document.getElementById('message-button');

let openChat = (room_id) => {
  // If not logged in make them choose a username first which will be saved as session
  chatRoom.style.display = "block";
  infoBtn.style.display = "none";
  backdrop.style.display = "block";
  backdrop.setAttribute("onclick", "closeChat()");
  messageButton.setAttribute("onclick", "sendMessage(" + room_id + ")");
  loadChats(room_id);
}

let closeChat = () => {
  chatRoom.style.display = "none";
  infoBtn.style.display = "block";
  backdrop.style.display = "none";
}

let loadChats = (room_id) => {
  let html = ""
  fetch(urlRoot + '/app/loadChats.php?room=' + room_id)
    .then(res => res.json())
    .then(messages => {
      console.log("Hello");
      for (var i = 0; i < messages.length; i++) {
        let message = messages[i];
        html += `<div class="chat-message"><div class="message-author">${message[0]}</div><div class="message-text">${message[1]}</div></div>`;
      }
    })
    .then(() => {
      document.getElementById('chat-messages').innerHTML = html;
    })
}

let sendMessage = (room_id) => {
  let chInput = document.getElementById('chat-textbox').value;
  fetch(urlRoot + '/app/sendMessage.php?message=' + chInput + "&room=" + room_id)
    .then(() => {
      document.getElementById('chat-textbox').value = "";
      loadChats(room_id);
      
    })
    .catch(error => console.error('Error:', error));
}