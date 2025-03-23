// Wait for the DOM (HTML) to fully load before running the script
document.addEventListener("DOMContentLoaded", () => {
    // Fetch movie data from the local server API
    fetch("http://localhost:3002/films")
        .then((response) => response.json()) // Convert the response to JSON format
        .then((data) => {
            console.log("Fetched films:", data); // Log fetched film data for debugging
            populateFilmList(data); // Call function to populate the list of films

            // Automatically display the first movie in the list on page load (if available)
            if (data.length > 0) {
                displayFilmDetails(data[0]);
            }
        })
        .catch((error) => console.error("Error fetching films:", error)); // Handle errors during fetch
});

/**
 * Function to populate the movie list dynamically.
 * @param {Array} films - List of movies fetched from the API
 */
function populateFilmList(films) {
    const filmList = document.getElementById("films"); // Get the <ul> or <div> where films will be listed
    filmList.innerHTML = ""; // Clear any existing content to avoid duplicates

    // Loop through each film and create a clickable item for it
    films.forEach((film) => {
        const listItem = document.createElement("li"); // Create a new <li> element for each film
        listItem.classList.add("film-item"); // Add a class for styling
        listItem.textContent = film.title; // Set text inside the <li> as the movie title
        listItem.dataset.id = film.id; // Store the film's unique ID as a dataset attribute

        // Add a click event so when a movie is clicked, its details are displayed
        listItem.addEventListener("click", () => displayFilmDetails(film));

        // Append the new list item to the film list container
        filmList.appendChild(listItem);
    });
}

/**
 * Function to display details of a selected movie.
 * Updates various sections with the movie's information.
 * @param {Object} film - The movie object containing details (title, poster, runtime, etc.)
 */
function displayFilmDetails(film) {
    // Set the movie title
    document.getElementById("film-title").textContent = film.title;

    // Set the movie poster image source
    document.getElementById("film-poster").src = film.poster;

    // Set the movie runtime in minutes
    document.getElementById("film-runtime").textContent = `Runtime: ${film.runtime} minutes`;

    // Set the showtime details
    document.getElementById("film-showtime").textContent = `Showtime: ${film.showtime}`;

    // Set the movie description
    document.getElementById("film-description").textContent = film.description;

    // Update the ticket information (availability & button state)
    updateTicketInfo(film);
}

/**
 * Function to update ticket availability and button state.
 * Allows users to buy tickets if available.
 * @param {Object} film - The movie object containing ticket details.
 */
function updateTicketInfo(film) {
    // Calculate available tickets by subtracting sold tickets from total capacity
    const availableTickets = film.capacity - film.tickets_sold;

    // Display the number of available tickets
    document.getElementById("film-tickets").textContent = `Available Tickets: ${availableTickets}`;

    // Get the "Buy Ticket" button element
    const buyButton = document.getElementById("buy-ticket-btn");

    // Update the button text based on ticket availability
    buyButton.textContent = availableTickets > 0 ? "Buy Ticket" : "Sold Out";

    // Disable the button if no tickets are available
    buyButton.disabled = availableTickets === 0;

    // Add event listener for purchasing tickets
    buyButton.onclick = () => {
        if (availableTickets > 0) {
            film.tickets_sold++; // Increase the number of sold tickets

            // Retrieve current booking data from localStorage (or create an empty object if none exists)
            const filmBookings = JSON.parse(localStorage.getItem("filmBookings")) || {};

            // Update the number of tickets sold for this film
            filmBookings[film.title] = (filmBookings[film.title] || 0) + 1;

            // Save the updated booking data back to localStorage
            localStorage.setItem("filmBookings", JSON.stringify(filmBookings));

            // Refresh ticket info display with updated data
            updateTicketInfo(film);
        }
    };
}
