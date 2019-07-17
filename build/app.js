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
const urlRoot = "http://localhost/dev/map-chat/build";
let info = document.getElementById('info');
let infoBtn = document.getElementById('info-button');
let backdrop = document.getElementById('backdrop');

setTimeout(() => {
  showInfo();
}, 1000);

let showInfo = () => {
  info.style.display = "block";
  infoBtn.style.display = "none";
  backdrop.style.display = "block";
  backdrop.setAttribute("onclick", "closeInfo()");
}

let closeInfo = () => {
  info.style.display = "none";
  infoBtn.style.display = "block";
  backdrop.style.display = "none";
}
let login = () => {
  let email = document.getElementById('log-email').value;
  let password = document.getElementById('log-pw').value;

  if(email == "") {
    document.getElementById('login-error').innerHTML = "Enter your Email!";
    return;
  }
  if(password == "") {
    document.getElementById('login-error').innerHTML = "Enter your Password!";
    return;
  }

  let loginInfo = {
    "email": email,
    "password": password
  };

  loginInfo = JSON.stringify(loginInfo);
  let formData = new FormData();
  formData.append("data", loginInfo);
  
  fetch(urlRoot + '/app/login.php', {
    method: 'POST', // or 'PUT'
    mode: 'cors',
    body: formData // data can be `string` or {object}!
  })
    .then(res => res.text()
    .then(text => {
      if(text == "Success"){
        // Reload page
        window.location.href = window.location.pathname + window.location.search + window.location.hash;
      } else {
        document.getElementById('login-error').innerHTML = "Login Info is Incorrect!";
      }
    })
  )
  .catch(error => console.error('Error:', error));
}

let logout = () => {
  fetch(urlRoot + '/app/logout.php')
    .then(() => window.location.href = window.location.pathname + window.location.search + window.location.hash)
    .catch(error => console.error('Error:', error));
}
var map;
function initMap() {
  
  // GENERATING THE MAP ------------------------------------------------------------------------
  let mapData = {
    center: {lat: 34.274646, lng: -119.2290316},
    zoom: 8,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false
  }
  map = new google.maps.Map(document.getElementById('map'),  mapData);


  // ADDING NEW CHAT ROOM TO THE MAP ----------------------------------------------
  // See if user is logged in
  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  map.addListener('click', (e) => {
    // If user has no chat in the DB ask if they want to create a chat
    if(getCookie('user')) {
      fetch(urlRoot + '/app/checkUserRoom.php')
        .then((res) => res.text())
        .then((text) => {
          if(text != true) {
            if(confirm("Do you want to create a new chat room?")) {
              
              // Add chat to User DB and Chat DB
              fetch(urlRoot + '/app/addUserChat.php?location=' + e.latLng)
                .then((res) => res.text())
                .then((text) => {
                  console.log(text);
                  // Reload map with new marker on it
                  placeMarkerAndPanTo(e.latLng, map);
                })
                .catch(error => console.error('Error:', error));
            }
          } else {
            if(confirm("Do you want to delete you old chat room to create a new one?")) {
              
              // Remove old chat room
              fetch(urlRoot + '/app/removeUserRoom.php')
                .then(res => res.text())
                .then(text => {
                  console.log(text);

                  // Create new chat room
                  fetch(urlRoot + '/app/addUserChat.php?location=' + e.latLng)
                  .then((res) => res.text())
                  .then((text) => {
                    window.location.href = window.location.pathname + window.location.search + window.location.hash;
                  })
                  .catch(error => console.error('Error:', error)); 
                });
            }
          }
        })
        .catch(error => console.error('Error:', error));
    }
  });

  setMarkers(map);



}


function setMarkers(map) {
  fetch(urlRoot + '/app/getChatRooms.php')
    .then(res => res.json())
    .then(locations => {
      console.log("test");
      for (var i = 0; i < locations.length; i++) {
        var location = locations[i];
        let coordinates = location[0]
          .replace("(", "")
          .replace(")", "")
          .split(", ");
        let lat = Number(coordinates[0]);
        let lng = Number(coordinates[1]);
        console.log(lat + ", " + lng);
        var marker = new google.maps.Marker({
          position: {lat: lat, lng: lng},
          map: map,
          title: location[1],
          icon: 'images/speach-bubble.png'
        });
        marker.addListener('click', (e) => {
          let roomId = marker.getTitle();
          openChat(roomId);
        });
      }
    })
}
let signup = () => {
  let email = document.getElementById('signup-email').value;
  if(email == "") {
    document.getElementById('signup-error').innerHTML = "Enter Your Email!";
    return;
  }
  let username = document.getElementById('signup-username').value;
  if(username == "") {
    document.getElementById('signup-error').innerHTML = "Enter Your Username!";
    return;
  }
  let password = document.getElementById('signup-pw').value;
  if(password == "") {
    document.getElementById('signup-error').innerHTML = "Enter Your Password!";
    return;
  }


  let signupInfo = {
    "email": email,
    "username": username,
    "password": password
  };

  signupInfo = JSON.stringify(signupInfo);
  let formData = new FormData();
  formData.append("data", signupInfo);
  
  fetch(urlRoot + '/app/signup.php', {
    method: 'POST', // or 'PUT'
    mode: 'cors',
    body: formData // data can be `string` or {object}!
  }).then(res => res.text()
  .then(text => {
    if(text == "success"){

    } else {
      document.getElementById('signup-error').innerHTML = text;
    }
  })
  )
  .catch(error => console.error('Error:', error));

}

