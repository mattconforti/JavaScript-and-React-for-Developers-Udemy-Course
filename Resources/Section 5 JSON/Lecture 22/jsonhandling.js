fetch('https://api.github.com/users/cassidoo')
  .then(function(r) {
    return r.json();
  })
  .then(function(j) {
    console.log(j);
    document.getElementById('username').innerText = j.login;
  })
