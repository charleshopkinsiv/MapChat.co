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

