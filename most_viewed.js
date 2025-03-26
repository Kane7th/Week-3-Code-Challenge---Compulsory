// Handles most viewed films
document.addEventListener("DOMContentLoaded", () => {
    loadMostViewedFilms();
});

const API_URL = "https://api.jsonbin.io/v3/b/67e3d49c8a456b79667cfd3f/latest"; // JSONBin URL
const API_KEY = "$2a$10$7KDfF8TWUXGmAT5uOz9tFuz9EWcuVj0Q40scSBFwydDyGcTIJTBti"; // API Key

function loadMostViewedFilms() {
    fetch(API_URL, {
        headers: { "X-Master-Key": API_KEY }
    })
    .then(response => response.json())
    .then(data => {
        const films = data.record.films; // Extract films array from JSONBin record
        const sortedFilms = films
            .sort((a, b) => b.tickets_sold - a.tickets_sold) // Sort by tickets sold (highest first)
            .slice(0, 10); // Limit to top 10 most booked films

        const mostViewedList = document.getElementById("most-viewed-list");
        mostViewedList.innerHTML = sortedFilms.length === 0 
            ? "<p>No bookings yet.</p>" 
            : sortedFilms.map(film => `<li>${film.title} - ${film.tickets_sold} tickets sold</li>`).join("");
    })
    .catch(error => console.error("Error fetching most viewed films:", error));
}
