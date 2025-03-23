
# Flatdango - Movie Ticket App 🎟️
A web app that allows users to browse movies and purchase tickets.

🚀 Features
✅ View a list of available movies
✅ See movie details (poster, runtime, description, showtime)
✅ Check the number of remaining tickets
✅ Purchase tickets (which decreases available ticket count)
✅ Responsive design

🛠️ Tech Stack
- HTML: Structure

- CSS: Styling

- JavaScript: Functionality

- JSON Server: Fake backend

📂 Setup & Installation
1️⃣ Clone the Repo
sh
Copy
Edit
git clone https://github.com/Kane7th/Week-3-Code-Challenge---Compulsory.git
cd Week-3-Code-Challenge---Compulsory
2️⃣ Install JSON Server
Ensure you have json-server installed:

sh
Copy
Edit
npm install -g json-server
3️⃣ Start the JSON Server
sh
Copy
Edit
json-server --watch db.json --port 3002
4️⃣ Run the Project
Open index.html in your browser or use Live Server in VS Code.

💡 How It Works
The app fetches movie data from db.json.

Clicking a movie updates the details section.

Clicking “Buy Ticket” decreases the ticket count.

🐛 Known Issues & Future Improvements
Add animations for smoother UI transitions

Implement actual user authentication

Store ticket purchases in a database