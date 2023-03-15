const express = require("express");
const path = require("path");
const notes = require("./db/db.json");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// APP/ PORT
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// GET Route to view notes page at "/notes"
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// GET Route to view the notes at "/api/notes"
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

    // Obtain existing notes
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // Convert string into JSON object
        const parsedNotes = JSON.parse(data);

        // Add a new note
        parsedNotes.push(newNote);

        // Write updated note back to the file
        fs.writeFile(
          "./db/db.json",
          JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info("Successfully added notes!")
        );
      }
    });

    const response = {
      status: "success",
      body: newNote,
    };

    // Checking to see if the POST route worked
    console.log(response);
    res.status(201).json(response);
  } else res.status(500).json("Error in posting notes");
});

// GET Route to view home page at "*"
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Start Server
app.listen(PORT, () => {
  console.log(`${PORT} is running at http://localhost:${PORT}`);
});
