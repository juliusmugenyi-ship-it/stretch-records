const container = document.querySelector("#artists");
const statusBox = document.querySelector("#status");

statusBox.textContent = "Loading artists...";

fetch("artists.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Could not load artist data.");
    }

    return response.json();
  })
  .then((artists) => {
    setTimeout(() => {
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
    }, 2000);
  })
  .catch((error) => {
    statusBox.textContent =
      "Sorry, we couldn't load the artists. Please refresh the page and try again.";

    console.error(error);
  })
  .finally(() => {
    statusBox.textContent = "";
  });
