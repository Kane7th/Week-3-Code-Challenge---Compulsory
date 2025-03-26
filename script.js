// Handles fetching, displaying, updating, adding, deleting films, and most viewed films
document.addEventListener("DOMContentLoaded", () => {
    fetchFilms();
    loadMostViewedFilms();
    
    const deleteBtn = document.getElementById("delete-film-btn");
    const submitBtn = document.getElementById("submit-film-btn");

    if (deleteBtn) deleteBtn.addEventListener("click", deleteSelectedFilm);
    if (submitBtn) submitBtn.addEventListener("click", addNewFilm);
});

const API_URL = "https://api.jsonbin.io/v3/b/67e3dd2f8a456b79667d02ae/latest"; // GET latest data
const API_PUT_URL = "https://api.jsonbin.io/v3/b/67e3dd2f8a456b79667d02ae"; // PUT full data
let selectedFilmId = null; // Store the selected film ID

// Fetch all films (GET)
function fetchFilms() {
    console.log("Fetching films from JSONBin...");

    fetch(API_URL, { method: "GET", headers: { "Content-Type": "application/json" } })
        .then(response => {
            console.log("Response received:", response);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            console.log("JSON Data:", data);
            if (!data.record || !Array.isArray(data.record.films)) {
                throw new Error("Invalid API response: 'films' not found.");
            }
            const films = data.record.films;
            console.log("Fetched films:", films);
            populateFilmList(films);
            if (films.length > 0) displayFilmDetails(films[0]);
        })
        .catch(error => console.error("Error fetching films:", error));
}

// Load most viewed films
function loadMostViewedFilms() {
    console.log("Fetching most viewed films from JSONBin...");

    fetch(API_URL, { method: "GET", headers: { "Content-Type": "application/json" } })
        .then(response => {
            console.log("Response received:", response);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            console.log("JSON Data:", data);
            if (!data.record || !Array.isArray(data.record.films)) {
                throw new Error("Invalid API response: 'films' not found.");
            }

            const sortedFilms = data.record.films
                .sort((a, b) => b.tickets_sold - a.tickets_sold) // Sort by most tickets sold
                .slice(0, 10); // Limit to top 10 films

            const mostViewedList = document.getElementById("most-viewed-list");
            if (mostViewedList) {
                mostViewedList.innerHTML = sortedFilms.length === 0
                    ? "<p>No bookings yet.</p>"
                    : sortedFilms.map(film => `<li>${film.title} - ${film.tickets_sold} tickets sold</li>`).join("");
            }
        })
        .catch(error => console.error("Error fetching most viewed films:", error));
}

// Populate film list
function populateFilmList(films) {
    const filmList = document.getElementById("film-list");
    if (!filmList) return;
    filmList.innerHTML = "";
    films.forEach(film => {
        const listItem = createFilmListItem(film);
        filmList.appendChild(listItem);
    });
}

// Create a film list item
function createFilmListItem(film) {
    const listItem = document.createElement("li");
    listItem.classList.add("film-item");
    listItem.textContent = film.title;
    listItem.dataset.id = film.id;
    listItem.addEventListener("click", () => {
        displayFilmDetails(film);
        selectedFilmId = film.id; // Store selected film ID for deletion
    });
    return listItem;
}

// Display film details
function displayFilmDetails(film) {
    const titleElement = document.getElementById("film-title");
    const posterElement = document.getElementById("film-poster");
    const runtimeElement = document.getElementById("film-runtime");
    const showtimeElement = document.getElementById("film-showtime");
    const descriptionElement = document.getElementById("film-description");

    if (titleElement) titleElement.textContent = film.title;
    if (posterElement) posterElement.src = film.poster;
    if (runtimeElement) runtimeElement.textContent = `Runtime: ${film.runtime} minutes`;
    if (showtimeElement) showtimeElement.textContent = `Showtime: ${film.showtime}`;
    if (descriptionElement) descriptionElement.textContent = film.description;

    updateTicketInfo(film); // ✅ Ensure ticket info is updated
}

// Delete selected film
function deleteSelectedFilm() {
    if (!selectedFilmId) {
        alert("Please select a film to delete.");
        return;
    }

    fetch(API_URL, { method: "GET", headers: { "Content-Type": "application/json" } })
        .then(response => response.json())
        .then(data => {
            if (!data.record || !Array.isArray(data.record.films)) {
                throw new Error("Invalid API response.");
            }

            const updatedFilms = data.record.films.filter(film => film.id !== selectedFilmId);

            return fetch(API_PUT_URL, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ films: updatedFilms }),
            });
        })
        .then(() => {
            selectedFilmId = null;
            fetchFilms(); // Refresh list
        })
        .catch(error => console.error("Error deleting film:", error));
}

// Open and close the add film modal
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("film-modal");
    const closeModalBtn = document.querySelector(".close-btn");
    const addFilmBtn = document.getElementById("add-film-btn");

    if (addFilmBtn) {
        addFilmBtn.addEventListener("click", () => {
            modal.style.display = "block"; // Show modal
        });
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", () => {
            modal.style.display = "none"; // Hide modal
        });
    }

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none"; // Close modal if clicked outside
        }
    });
});

// Add new film function
function addNewFilm() {
    const newFilm = {
        id: Date.now().toString(),
        title: document.getElementById("film-title-input").value,
        runtime: document.getElementById("film-runtime-input").value,
        capacity: document.getElementById("film-capacity-input").value,
        showtime: document.getElementById("film-showtime-input").value,
        description: document.getElementById("film-description-input").value,
        poster: document.getElementById("film-poster-input").value,
        tickets_sold: 0,
    };

    fetch(API_URL, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })
    .then((response) => response.json())
    .then((data) => {
        if (!data.record || !Array.isArray(data.record.films)) {
            throw new Error("Invalid API response.");
        }

        const updatedFilms = [...data.record.films, newFilm];

        return fetch(API_PUT_URL, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ films: updatedFilms }),
        });
    })
    .then(() => {
        fetchFilms(); // Refresh film list
        document.getElementById("film-modal").style.display = "none"; // Close modal
    })
    .catch((error) => console.error("Error adding new film:", error));
}

function updateTicketInfo(film) {
    const availableTickets = film.capacity - film.tickets_sold;
    const ticketInfo = document.getElementById("film-tickets");
    
    if (ticketInfo) {
        ticketInfo.textContent = `Available Tickets: ${availableTickets}`;
    }

    const buyButton = document.getElementById("buy-ticket-btn");
    if (buyButton) {
        buyButton.textContent = availableTickets > 0 ? "Buy Ticket" : "Sold Out";
        buyButton.disabled = availableTickets === 0;
        buyButton.onclick = () => buyTicket(film);
    }
}

function buyTicket(film) {
    if (film.capacity - film.tickets_sold > 0) {
        const updatedTickets = film.tickets_sold + 1;

        fetch(API_URL, { method: "GET", headers: { "Content-Type": "application/json" } })
            .then(response => response.json())
            .then(data => {
                if (!data.record || !Array.isArray(data.record.films)) {
                    throw new Error("Invalid API response.");
                }

                const updatedFilms = data.record.films.map(f =>
                    f.id === film.id ? { ...f, tickets_sold: updatedTickets } : f
                );

                return fetch(API_PUT_URL, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ films: updatedFilms }),
                });
            })
            .then(() => {
                fetchFilms(); // ✅ Refresh UI with new ticket data
            })
            .catch(error => console.error("Error updating tickets:", error));
    }
}
