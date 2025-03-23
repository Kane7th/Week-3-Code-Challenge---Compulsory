# 🎬 Flatdango - Movie Ticket App

A web application that allows users to browse movies, purchase tickets, and track the most viewed films. Built with **HTML, CSS, JavaScript**, and uses a **JSON server** for backend data.

---

## 📌 Features
✅ View a list of available movies
✅ See movie details (poster, runtime, description, showtime)
✅ Check the number of remaining tickets
✅ Purchase tickets (decreasing available count)
✅ Track most booked films in **Most Viewed Films** page
✅ Data persists using **localStorage**
✅ Fully responsive design
✅ Navigation menu for easy access between pages

---

## 🛠️ Tech Stack
- **HTML**: Structure
- **CSS**: Styling & Responsive Design
- **JavaScript**: Functionality
- **JSON Server**: Fake backend API
- **LocalStorage**: Data Persistence

---

## 💡 How It Works
1. The app fetches movie data from `db.json`.
2. Clicking a movie updates the details section.
3. Clicking **“Buy Ticket”** decreases the ticket count and saves data in **localStorage**.
4. The **Most Viewed Films** page ranks movies based on ticket sales.
5. Data persists even after refreshing the page.

---

## 📜 Files & Project Structure
```
📂 Flatdango
│── 📄 index.html       # Main page with movie selection
│── 📄 most_viewed.html # Page for most booked films
│── 📄 style.css        # Styling for all pages
│── 📄 script.js        # Main JavaScript file (handles ticket sales, fetching data)
│── 📄 most_viewed.js   # Handles ranking for most booked films
│── 📄 db.json          # JSON database (mock backend)
```

---

## 📑 What You Will Expect
✅ **Clean & Structured Code** - Readable and well-commented
✅ **Proper Use of JavaScript** - Fetch API, Event Listeners, DOM Manipulation
✅ **Data Persistence** - JSON Server & LocalStorage
✅ **Good UI/UX** - Navigation, Responsive Layout
✅ **Feature Implementation** - Movie selection, ticket booking, most viewed films
✅ **GitHub Repository** - Organized with proper commits
---