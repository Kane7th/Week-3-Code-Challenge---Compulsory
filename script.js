// Wait for the DOM (HTML) to fully load before running the script
document.addEventListener("DOMContentLoaded", () => {
    // Fetch the movie data from the local server API
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
      .catch((error) => console.error("Error fetching films:", error)); // Handle any errors during fetch
  });
  
  /**
   * Function to populate the movie list dynamically.
   * @param {Array} films - List of movies fetched from the API
   */
  function populateFilmList(films) {
    const filmList = document.getElementById("films"); // Get the <ul> or <div> where films will be listed
    filmList.innerHTML = ""; // Clear any existing content to avoid duplicates
  
    // Loop through each film in the list and create a clickable item for it
    films.forEach((film) => {
      const listItem = document.createElement("li"); // Create a new <li> element for each film
      listItem.classList.add("film-item"); // Add a class for styling purposes
      listItem.textContent = film.title; // Set the text inside the <li> as the movie title
      listItem.dataset.id = film.id; // Store the film's unique ID as a dataset attribute
  
      // Add a click event so when a movie is clicked, its details are displayed
      listItem.addEventListener("click", () => displayFilmDetails(film));
  
      // Append the newly created list item to the film list container
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
    // Calculate the available tickets by subtracting sold tickets from capacity
    const availableTickets = film.capacity - film.tickets_sold;
  
    // Display the number of available tickets
    document.getElementById(
      "film-tickets"
    ).textContent = `Available Tickets: ${availableTickets}`;
  
    // Get the "Buy Ticket" button element
    const buyButton = document.getElementById("buy-ticket-btn");
  
    // Update the button text based on ticket availability
    buyButton.textContent = availableTickets > 0 ? "Buy Ticket" : "Sold Out";
  
    // Disable the button if no tickets are available
    buyButton.disabled = availableTickets === 0;
  
    // Add event listener for purchasing tickets
    buyButton.onclick = () => {
      if (availableTickets > 0) {
        film.tickets_sold++; // Increase the tickets sold count
        updateTicketInfo(film); // Update the ticket display after purchase
      }
    };
  }
  