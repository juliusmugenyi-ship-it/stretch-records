// Step 1:
// GET http://localhost:3000/artists
// Status: 200 OK
// Content-Type: application/json

// Step 2:
// GET http://localhost:3000/not-found
// Status: 404 Not Found
// Content-Type: application/json

// Step 4:
// Fetch fulfilled even with a 404 response.
// response.ok was false.
// Throwing an Error allowed the catch block to handle it.

// With the server stopped, fetch rejected with a network error.
// A 404 returned a Response object, but a refused connection
// rejected the Promise.

// Step 5:
// When the server was stopped, fetch rejected because
// there was no connection.
// A 404 returned a Response object, but a refused connection
// rejected the Promise.

// EADDRINUSE occurred when attempting to start another server
// on port 3000 while the existing server was still running.

// Terminal 1:
// npx json-server artists.json
// http://localhost:3000/artists

// Terminal 2:
// npx json-server label.json --port 3001
// http://localhost:3001/artists

// The two servers run on different ports.
// Promise.all() fetches both datasets before rendering.

try {
  const [artistsResponse, labelResponse] = await Promise.all([
    fetch("http://localhost:3000/artists"),
    fetch("http://localhost:3001/artists"),
  ]);

  console.log("Artists Response:", artistsResponse);
  console.log("Label Response:", labelResponse);

  if (!artistsResponse.ok) {
    throw new Error(`Artists request failed: ${artistsResponse.status}`);
  }

  if (!labelResponse.ok) {
    throw new Error(`Label request failed: ${labelResponse.status}`);
  }

  const [artists, labelArtists] = await Promise.all([
    artistsResponse.json(),
    labelResponse.json(),
  ]);

  console.log("Artists:", artists);
  console.log("Label artists:", labelArtists);
  renderArtists(artists);
} catch (error) {
  console.error("Loading failed:", error);
  const errorMessage = document.querySelector("#error-message");

  if (errorMessage) {
    errorMessage.textContent =
      "Sorry, we couldn't load the artists right now try again later.";
  }
} finally {
  const loading = document.querySelector("#loading");

  if (loading) {
    loading.remove();
  }
}

const artistForm = document.querySelector("#artist-form");

artistForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(artistForm);

  const newArtist = {
    name: formData.get("name"),
    genre: formData.get("genre"),
  };

  try {
    const response = await fetch("http://localhost:3000/artists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newArtist),
    });

    console.log("POST status:", response.status);

    if (!response.ok) {
      throw new Error(`POST failed: ${response.status}`);
    }

    const savedArtist = await response.json();

    console.log("Created artist:", savedArtist);
  } catch (error) {
    console.error("Could not add artist:", error);
  }
});

function renderArtists(artists) {
  const artistList = document.querySelector("#artist-container");

  artists.forEach((artist) => {
    const li = document.createElement("li");
    li.textContent = `${artist.name} (${artist.genre})`;
    artistList.appendChild(li);
  });
}
