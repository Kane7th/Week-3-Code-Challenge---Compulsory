// Handles most viewed films

document.addEventListener("DOMContentLoaded", () => {
    loadMostViewedFilms();
});

function loadMostViewedFilms() {
    const filmBookings = JSON.parse(localStorage.getItem("filmBookings")) || {};
    const sortedFilms = Object.entries(filmBookings).sort((a, b) => b[1] - a[1]);
    
    const mostViewedList = document.getElementById("most-viewed-list");
    mostViewedList.innerHTML = sortedFilms.length === 0 
        ? "<p>No bookings yet.</p>" 
        : sortedFilms.map(([title, bookings]) => `<li>${title} - ${bookings} tickets sold</li>`).join("");
}