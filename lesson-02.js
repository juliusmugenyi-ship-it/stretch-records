// Lesson 2 standalone programs

/*
Prediction:

1. "Start" will print first. RIGHT
2. "Timer 1" will print second. WRONG
3. "End" will print third. WRONG

Corrections:
- Line 2 is wrong because setTimeout callbacks run after the current synchronous code finishes.
- Line 3 is wrong because "End" is logged immediately before the timer callback runs.
*/

console.log("Start");

setTimeout(() => {
  console.log("Timer 1");
}, 1000);

console.log("End");

/*
Observation:

The blocking loop occupied the JavaScript call stack on the main thread.
While it was running, the browser could not handle user interactions,
render updates, or other queued tasks because the event loop was blocked.
*/

// Lesson 02 Network observations:
// Total requests: 11
// Three requests:
// - index.html
// - script.js
//lesson-01.js
//artists.json
// - ws
//asake.jpg
//johnny-cash.jpg
//bob-marley.jpg
//pink-floyd.jpg
//adriano-celentano.jpg
//miyagi-and-andrews.jpg

// Lesson 01 Network observations:
// Total requests: 10
// Three requests:
// - index.html
// - ws

//const message = "Lesson 2 is starting";

//console.log(message);

/*
Observation:
JavaScript can store information in variables
and display it using console.log().
*/

//const artists = ["Bob Marley", "Fela Kuti", "Nina Simone"];

//console.log(artists.length);

/*
Observation:
Arrays store multiple values.
The length property tells us how many items are inside.
*/
