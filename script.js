// Handles fetching, displaying, and updating films

document.addEventListener("DOMContentLoaded", () => {
    fetchFilms();
});

const API_URL = "http://localhost:3002/films";

// Fetches all films (GET)
function fetchFilms() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            console.log("Fetched films:", data);
            populateFilmList(data);
            if (data.length > 0) displayFilmDetails(data[0]);
        })
        .catch(error => console.error("Error fetching films:", error));
}

// Adds a new film (POST)
function addFilm(film) {
    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(film)
    })
    .then(response => response.json())
    .then(newFilm => {
        console.log("Film added:", newFilm);
        fetchFilms();
    })
    .catch(error => console.error("Error adding film:", error));
}

// Updates film data (PATCH)
function updateFilm(id, updates) {
    fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates)
    })
    .then(response => response.json())
    .then(updatedFilm => {
        console.log("Film updated:", updatedFilm);
        fetchFilms();
    })
    .catch(error => console.error("Error updating film:", error));
}

// Deletes a film (DELETE)
function deleteFilm(id) {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
    .then(() => {
        console.log("Film deleted");
        fetchFilms();
    })
    .catch(error => console.error("Error deleting film:", error));
}

function populateFilmList(films) {
    const filmList = document.getElementById("film-list");
    filmList.innerHTML = "";
    films.forEach(film => {
        const listItem = createFilmListItem(film);
        filmList.appendChild(listItem);
    });
}

function createFilmListItem(film) {
    const listItem = document.createElement("li");
    listItem.classList.add("film-item");
    listItem.textContent = film.title;
    listItem.dataset.id = film.id;
    listItem.addEventListener("click", () => displayFilmDetails(film));
    return listItem;
}

function displayFilmDetails(film) {
    document.getElementById("film-title").textContent = film.title;
    document.getElementById("film-poster").src = film.poster;
    document.getElementById("film-runtime").textContent = `Runtime: ${film.runtime} minutes`;
    document.getElementById("film-showtime").textContent = `Showtime: ${film.showtime}`;
    document.getElementById("film-description").textContent = film.description;
    updateTicketInfo(film);
}

function updateTicketInfo(film) {
    const availableTickets = film.capacity - film.tickets_sold;
    document.getElementById("film-tickets").textContent = `Available Tickets: ${availableTickets}`;
    const buyButton = document.getElementById("buy-ticket-btn");
    buyButton.textContent = availableTickets > 0 ? "Buy Ticket" : "Sold Out";
    buyButton.disabled = availableTickets === 0;
    buyButton.onclick = () => buyTicket(film);
}

function buyTicket(film) {
    if (film.capacity - film.tickets_sold > 0) {
        updateFilm(film.id, { tickets_sold: film.tickets_sold + 1 });
    }
}
