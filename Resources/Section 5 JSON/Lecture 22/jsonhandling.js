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
        if (j.followers > 0) { // if the user has followers (look at JSON followers key and its value)
          getFollowers(j.followers_url);
        }
        else { // may have to clear some followers - if prev search has followers and next doesnt, prev followers stay
          document.getElementById("fUl").innerHTML = ""; // clear the innerHTML of the followers-list element
        }
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

function getFollowers(followersUrl) {
  fetch(followersUrl)
    .then(function(r) {  // r is the response object (result of request)
      return r.json();
    })
    .then(function(j) {
      console.log(j); // array of followers
      var followersList = j;
      showFollowers(followersList); // call function to display the list on our site
    })
}

function showFollowers(listOfFollowers) {
  listOfFollowers.forEach(function(f) {
    var listItem = document.createElement('li');
    listItem.innerHTML = '<img src="' + f.avatar_url + '" alt="' + f.login +'">'; // put their avatar in a list item
    // make the above list item clickable (add a link -  to the persons github page when u click the picture)
    document.getElementById("fUl").appendChild(listItem); // add the list item to the existing list
  });
}
