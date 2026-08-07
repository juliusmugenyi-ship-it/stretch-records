const container = document.querySelector("#artists");
const statusBox = document.querySelector("#status");
const form = document.querySelector("#artist-form");

const nameInput = document.querySelector("#name");
const genreInput = document.querySelector("#genre");
const totalInput = document.querySelector("#total");
const imageInput = document.querySelector("#image");
const blurbInput = document.querySelector("#blurb");

async function loadArtists() {
  statusBox.textContent = "Loading artists...";

  try {
    const response = await fetch("http://localhost:3000/artists");

    console.log(response);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const artists = await response.json();
    container.innerHTML = "";

    artists.forEach((artist) => {
      const section = document.createElement("section");
      section.className = "artist";

      section.innerHTML = `
        <img
          class="artist-avatar"
          src="${artist.image}"
          alt="Portrait of ${artist.name}."
        />

        <h2>${artist.name}</h2>

        <p class="meta">
          ${artist.genre} · 5 songs · Total: ${artist.total}
        </p>

        <p class="blurb">
          ${artist.blurb}
        </p>

        <ol class="songs">
          ${artist.songs
            .map(
              (song) => `
                <li class="song-card" ${song.lang ? `lang="${song.lang}"` : ""}>
                  ${song.title}
                </li>
              `,
            )
            .join("")}
        </ol>
      `;

      container.appendChild(section);
    });
  } catch (error) {
    console.error(error);
    statusBox.textContent = "Sorry, we couldn't load the artists right now.";
  } finally {
    if (statusBox.textContent === "Loading artists...") {
      statusBox.textContent = "";
    }
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const newArtist = {
    name: nameInput.value,
    genre: genreInput.value,
    total: totalInput.value,
    image: imageInput.value,
    blurb: blurbInput.value,
    songs: [],
  };

  try {
    const response = await fetch("http://localhost:3000/artists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newArtist),
    });

    console.log(response.status);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    form.reset();
    loadArtists();
  } catch (error) {
    console.error("Could not add artist:", error);
  }
});

loadArtists();
