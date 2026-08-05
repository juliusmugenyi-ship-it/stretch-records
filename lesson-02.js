// Lesson 2 standalone programs

// question: 1: What will be printed to the console and in what order?
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

/* question: 2: What will be printed to the console and in what order?
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

/* question: 3: What happens when the button is clicked? 
Observation:

The blocking loop occupied the JavaScript call stack on the main thread.
While it was running, the browser could not handle user interactions,
render updates, or other queued tasks because the event loop was blocked.
*/

/* question: 4: What will be printed to the console and in what order?

Call stack diagram: Before the error occurs, the call stack will look like this:

1. Push global execution context
2. Push firstFunction()
3. Push secondFunction()
4. Push thirdFunction()
5. Error occurs inside thirdFunction()
6. Pop thirdFunction()
7. Pop secondFunction()
8. Pop firstFunction()

The stack trace should list the innermost function first because
that is where the error happened.
*/

/* after running the code, the console will display the following error message:
Uncaught Error: Test error
    at thirdFunction (lesson-02.js:28)
    at secondFunction (lesson-02.js:24)
    at firstFunction (lesson-02.js:20)
    at lesson-02.js:32 
Call stack diagram:

1. Push global execution context
2. Push firstFunction()
3. Push secondFunction()
4. Push thirdFunction()
5. Error occurs inside thirdFunction()
6. thirdFunction() is popped because it throws an error
7. secondFunction() is popped
8. firstFunction() is popped

Confirmation:
The console stack trace matches the diagram:
thirdFunction → secondFunction → firstFunction

The innermost function appears first because it is where the error occurred.
*/

/*function firstFunction() {
  secondFunction();
}

function secondFunction() {
  thirdFunction();
}

function thirdFunction() {
  throw new Error("Test error");
}

firstFunction();
*/

// Countdown using setInterval() question: 5: What will be printed to the console and in what order?

let count = 10;

const countdown = setInterval(() => {
  console.log(count);

  count--;

  if (count < 0) {
    clearInterval(countdown);
    console.log("Countdown stopped");
  }
}, 1000);
