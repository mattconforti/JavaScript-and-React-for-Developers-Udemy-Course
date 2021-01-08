fetch('https://api.github.com/users/cassidoo')
  .then(function(r) {
    console.log(r.status);
    return r.json();
  })
  .then(function(j) {
    console.log(j);
  })
