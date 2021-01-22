var x = 'hello, world!'; // this is in the global scope!

////////////////////

function greet(thing) {
  console.log(this + " says greetings, " + thing);
}

greet.call("Cami", "earthlings") // Cami says greetings, earthlings

////////////////////

var person = {
  name: "Samantha",
  greet: function(thing) {
    console.log(this.name + " says greetings, " + thing);
  }
}

person.greet('neighbor'); // Samantha says greetings, neighbor
person.greet.call(person, 'neighbor'); // Samantha says greetings, neighbor

////////////////////

function greet2(thing1, thing2) {
  console.log(this + " says greetings, " + thing1);
  console.log("But " + thing2 + " doesn't like " + this);
}

greet2.call('Samantha', 'Maya', 'Angelina')
// Samantha says greetings, Maya
// But Angelina doesn't like Samantha

greet2.apply('Samantha', ['Maya', 'Angelina'])
// Samantha says greetings, Maya
// But Angelina doesn't like Samantha

////////////////////

var boundGreeting = greet2.bind('Noah')

boundGreeting('Christian', 'Ben')
// Noah says greetings, Christian
// But Ben doesn't like Noah
