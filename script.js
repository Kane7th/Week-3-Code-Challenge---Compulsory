// Handles fetching, displaying, and updating films
document.addEventListener("DOMContentLoaded", () => {
    fetchFilms();
});

const API_URL = "https://api.jsonbin.io/v3/b/67e3d49c8a456b79667cfd3f/latest";
const API_PUT_URL = "https://api.jsonbin.io/v3/b/67e3d49c8a456b79667cfd3f"; // Used for updates
const API_KEY = "$2a$10$7KDfF8TWUXGmAT5uOz9tFuz9EWcuVj0Q40scSBFwydDyGcTIJTBti"; 

// Fetches all films (GET)
function fetchFilms() {
    fetch(API_URL, {
        headers: { "X-Master-Key": API_KEY }
    })
    .then(response => response.json())
    .then(data => {
        const films = data.record.films; // JSONBin stores the entire object inside `record`
        console.log("Fetched films:", films);
        populateFilmList(films);
        if (films.length > 0) displayFilmDetails(films[0]);
    })
    .catch(error => console.error("Error fetching films:", error));
}

// Adds a new film (POST equivalent using PUT)
function addFilm(newFilm) {
    fetch(API_URL, {
        headers: { "X-Master-Key": API_KEY }
    })
    .then(response => response.json())
    .then(data => {
        const updatedFilms = [...data.record.films, newFilm]; // Append new film

        return fetch(API_PUT_URL, {
            method: "PUT",
            headers: { 
                "Content-Type": "application/json",
                "X-Master-Key": API_KEY
            },
            body: JSON.stringify({ films: updatedFilms }) // Overwrite entire dataset
        });
    })
    .then(() => fetchFilms()) // Refresh UI
    .catch(error => console.error("Error adding film:", error));
}

// Updates film data (PUT instead of PATCH)
function updateFilm(id, updates) {
    fetch(API_URL, {
        headers: { "X-Master-Key": API_KEY }
    })
    .then(response => response.json())
    .then(data => {
        const updatedFilms = data.record.films.map(film =>
            film.id === id ? { ...film, ...updates } : film
        );

        return fetch(API_PUT_URL, {
            method: "PUT",
            headers: { 
                "Content-Type": "application/json",
                "X-Master-Key": API_KEY
            },
            body: JSON.stringify({ films: updatedFilms }) // Overwrite dataset
        });
    })
    .then(() => fetchFilms()) // Refresh UI
    .catch(error => console.error("Error updating film:", error));
}

// Deletes a film (PUT with filtered array)
function deleteFilm(id) {
    fetch(API_URL, {
        headers: { "X-Master-Key": API_KEY }
    })
    .then(response => response.json())
    .then(data => {
        const updatedFilms = data.record.films.filter(film => film.id !== id); // Remove film

        return fetch(API_PUT_URL, {
            method: "PUT",
            headers: { 
                "Content-Type": "application/json",
                "X-Master-Key": API_KEY
            },
            body: JSON.stringify({ films: updatedFilms }) // Overwrite dataset
        });
    })
    .then(() => fetchFilms()) // Refresh UI
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
