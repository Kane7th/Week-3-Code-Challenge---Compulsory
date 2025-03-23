// Runs when the page is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    loadMostViewedFilms(); // Calls function to fetch and display most booked films
});

// Function to load and display most booked films
function loadMostViewedFilms() {
    // Retrieve film booking data from localStorage (if available), otherwise use an empty object
    const filmBookings = JSON.parse(localStorage.getItem("filmBookings")) || {};

    // Convert the object into an array and sort films by the number of tickets sold (highest first)
    const sortedFilms = Object.entries(filmBookings)
        .sort((a, b) => b[1] - a[1]);

    // Select the HTML element where the sorted films will be displayed
    const mostViewedList = document.getElementById("most-viewed-list");
    mostViewedList.innerHTML = ""; // Clear previous content

    // If no films have been booked yet, display a message
    if (sortedFilms.length === 0) {
        mostViewedList.innerHTML = "<p>No bookings yet.</p>";
        return;
    }

    // Loop through the sorted films and add them to the list
    sortedFilms.forEach(([title, bookings]) => {
        const listItem = document.createElement("li"); // Create a new list item
        listItem.textContent = `${title} - ${bookings} tickets sold`; // Set the text content
        mostViewedList.appendChild(listItem); // Append it to the list
    });
}
