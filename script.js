const searchInput = document.getElementById("search");
const outputDiv = document.getElementById("out");
const searchIcon = document.querySelector("#searchbar i");

// Replace this with your actual OMDb API key
const apiKey = "f7a4b11e";

function searchMovie() {
  const query = searchInput.value.trim();

  if (query === "") {
    outputDiv.innerHTML = "<p>Please enter a movie name.</p>";
    return;
  }

  const url = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(
    query
  )}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.Response === "True") {
        outputDiv.innerHTML = `
          <h3>${data.Title} (${data.Year})</h3>
          <img src="${data.Poster}" alt="Poster" style="width:200px; border-radius:10px; margin:20px;">
          <p><strong>Genre:</strong> ${data.Genre}</p>
          <p><strong>Director:</strong> ${data.Director}</p>
          <p><strong>IMDb Rating:</strong> ${data.imdbRating}</p>
        `;
      } else {
        outputDiv.innerHTML = `<p>Movie not found: ${data.Error}</p>`;
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      outputDiv.innerHTML = `<p>Something went wrong. Please try again later.</p>`;
    });
}

searchIcon.addEventListener("click", searchMovie);

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchMovie();
  }
});
