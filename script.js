fetch("artists.json")
  .then((response) => response.json())
  .then((artists) => {
    const container = document.querySelector("#artists");

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
  });
