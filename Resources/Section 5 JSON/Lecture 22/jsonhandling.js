// hide the image (because it has no src currently and we don't want
// to create the whole element and add to page in JS)
var avatarElem = document.getElementById("avatarElem");
avatarElem.style.display = "none";

// when button1 is clicked, call getUser() with username input
document.getElementById("b1").addEventListener('click', function(e) {
  var username = document.getElementById("in1").value;
  getUser(username);
});

function getUser(username) {
  if (username === "") {
    alert("Username is BLANK! Please type in a valid GitHub username!");
  }
  else {
    fetch('https://api.github.com/users/' + username)
      .then(function(r) {
        return r.json(); // r is response object. gets assigned result of anon function
                         // called when Promise in fetch() gets resolved (fulfilled)
      })
      .then(function(j) { // once the Promise inside the first .then() is resolved, go into this one
        console.log(j); // j is the json response returned by the last .then(). (aka print the response)
        assignValues(j); // get all data and put into correct places on page
      })
  }
}

function assignValues(j) { // takes in JSON from last .then() resolved
  avatarElem.style.display = "initial";  // put back display to normal (not hidden)
  avatarElem.src = j.avatar_url;
  document.getElementById("username").innerText = "Username: " + j.login;
  document.getElementById("realname").innerText = "Real Name: " + j.name;
  document.getElementById("location").innerText = "Location: " + j.location;
  document.getElementById("bio").innerText = "Bio: " + j.bio;
  document.getElementById("followers").innerText = "Followers: " + j.followers;
}
