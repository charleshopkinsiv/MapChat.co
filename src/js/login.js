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