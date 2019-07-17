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