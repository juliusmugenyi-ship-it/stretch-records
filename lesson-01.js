// Lesson 01 Network observations:
// Total requests: 2
// Three requests:
// - index.html
// - ws

// Lesson 01 Network observations:
// Total requests: 10
// Three requests:
// - index.html
// - ws

// Changed: artists.json only.
// Did not change: script.js and index.html.
// This separation is the point because data can be updated independently
// from the code that renders it and the page structure.
// while the rendering logic and page structure remain reusable.

// JSON error observed:
// Uncaught SyntaxError: Unexpected token ']', ... is not valid JSON (On Bob marley)

// JSON round trip practice

const artist = {
  name: "Bob Marley",
  genre: "Reggae",
  songs: ["One Love", "Three Little Birds"],
};

// Convert object to JSON text
const artistText = JSON.stringify(artist);
console.log(artistText);

// Convert JSON text back into an object
const parsedArtist = JSON.parse(artistText);
console.log(parsedArtist.name);

// Page as a system:
// Client: The web browser (Chrome) requesting the Stretch Records page.
// Server: The local Live Server development server serving the project files.
// Request: The client asked the server for index.html, JavaScript files,
// CSS, images, and artists.json data needed to render the page.
// Response: The server returned the HTML, styles, scripts, images, and JSON data
// that the browser used to build and display the artist cards.
