// ===============================
// Lesson 3 - Step 3
// Promise handlers: then, catch, finally
// ===============================

function loadArtists() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(["Taylor Swift", "Drake", "Beyoncé"]);
    }, 2000);
  });
}

console.log("Loading artists...");

loadArtists()
  .then((artists) => {
    console.log("Artists:", artists);
  })
  .catch((error) => {
    console.log("Could not load artists:", error.message);
  })
  .finally(() => {
    console.log("Loading finished.");
  });

// ===============================
// Lesson 3 - Step 4
// Ordering puzzle
// ===============================

// Prediction:
// 1. Start
// 2. End
// 3. Promise
// 4. Timer

console.log("Start");

setTimeout(() => {
  console.log("Timer");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("End");

// Explanation:
// Promise callbacks run as microtasks before timer callbacks (macrotasks).

// ===============================
// Lesson 3 - Step 5
// Async / Await version
// ===============================

async function displayArtists() {
  console.log("Loading...");

  try {
    const artists = await loadArtists();
    console.log(artists);
  } catch (error) {
    console.log(error.message);
  } finally {
    console.log("Loading finished.");
  }
}

displayArtists();

// ===============================
// Lesson 3 - Step 6
// Custom Error
// ===============================

class MissingArtistError extends Error {
  constructor(message) {
    super(message);
    this.name = "MissingArtistError";
  }
}

function checkArtist(artist) {
  if (!artist.name) {
    throw new MissingArtistError("Artist record is missing a name.");
  }
}

try {
  checkArtist({});
} catch (error) {
  console.log("Please update the artist data before publishing.");
}

// ===============================
// Lesson 3 - Step 7
// Rethrowing
// ===============================

function loadPage() {
  try {
    throw new Error("Missing artist data");
  } catch (error) {
    throw new Error(`Artists page failed while loading data: ${error.message}`);
  }
}

try {
  loadPage();
} catch (error) {
  console.log(error.message);
}

// Final message:
// Artists page failed while loading data: Missing artist data

// ===============================
// Lesson 3 - Step 8
// Promise.all() and Promise.allSettled()
// ===============================

function delayedTask(name, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`${name} completed`);
    }, delay);
  });
}

// Three independent delayed tasks

const task1 = delayedTask("Artists", 1000);
const task2 = delayedTask("Albums", 1500);
const task3 = delayedTask("Songs", 2000);

Promise.all([task1, task2, task3]).then((results) => {
  console.log("Combined result:", results);
});

// Make one task reject

function failedTask(name, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(`${name} failed`);
    }, delay);
  });
}

const task4 = delayedTask("Artists", 1000);
const task5 = failedTask("Albums", 1500);
const task6 = delayedTask("Songs", 2000);

Promise.all([task4, task5, task6])
  .then((results) => {
    console.log(results);
  })
  .catch((error) => {
    console.log("Promise.all failed:", error);
  });

// Promise.allSettled keeps all outcomes

Promise.allSettled([task4, task5, task6]).then((results) => {
  console.log("All outcomes:", results);
});

// Observation:
// Promise.all fails when one promise rejects.
// Promise.allSettled waits for every promise and reports
// both successful and failed tasks, keeping the survivors.
