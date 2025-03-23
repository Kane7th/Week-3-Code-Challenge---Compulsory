document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3002/films")
    .then((response) => response.json())
    .then((data) => {
      console.log("Fetched films:", data); // Debugging line
      populateFilmList(data);
    })
    .catch((error) => console.error("Error fetching films:", error));
});

function populateFilmList(films) {
  const filmList = document.getElementById("films");
  filmList.innerHTML = "";

  films.forEach((film) => {
    const listItem = document.createElement("li");
    listItem.classList.add("film-item");
    listItem.textContent = film.title;
    listItem.dataset.id = film.id;
    listItem.addEventListener("click", () => displayFilmDetails(film));
    filmList.appendChild(listItem);
  });
}

function displayFilmDetails(film) {
  document.getElementById("film-title").textContent = film.title;
  document.getElementById("film-poster").src = film.poster;
  document.getElementById(
    "film-runtime"
  ).textContent = `Runtime: ${film.runtime} minutes`;
  document.getElementById(
    "film-showtime"
  ).textContent = `Showtime: ${film.showtime}`;
  document.getElementById("film-description").textContent = film.description;
  updateTicketInfo(film);
}

function updateTicketInfo(film) {
  const availableTickets = film.capacity - film.tickets_sold;
  document.getElementById(
    "film-tickets"
  ).textContent = `Available Tickets: ${availableTickets}`;
  const buyButton = document.getElementById("buy-ticket-btn");
  buyButton.textContent = availableTickets > 0 ? "Buy Ticket" : "Sold Out";
  buyButton.disabled = availableTickets === 0;

  buyButton.onclick = () => {
    if (availableTickets > 0) {
      film.tickets_sold++;
      updateTicketInfo(film);
    }
  };
}
