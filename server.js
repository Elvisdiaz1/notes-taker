const express = require("express");
const path = require("path");
const notes = require("./db/db.json");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// GET Route to view index at "/"
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// GET Route to view notes at "/notes"
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

// POST Route to create notes at "/notes"
app.post("/api/notes", (req, res) => {
  console.info(`${req.method} request received to add a review`);

  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;
  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    // Obtain existing reviews

    // Add a new review

    // Write updated reviews back to the file
    fs.writeFile("./db/db.json", JSON.stringify(notes, null, 4), (writeErr) =>
      writeErr
        ? console.error(writeErr)
        : console.info("Successfully updated notes!")
    );
  }
});

app.listen(PORT, () => {
  console.log(`${PORT} is running at http://localhost:${PORT}`);
});
