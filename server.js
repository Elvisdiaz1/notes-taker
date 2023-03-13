const express = require("express");
const path = require("path");
const notes = require("./db/db.json");
const { writeFile } = require("fs.promises");

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

// POST Route to create notes at "/notes"
app.post("/notes", (req, res) => {
  res.json(req.body);
  const { title, text } = req.body;
  const newNote = {
    title,
    text,
  };
  notes.push(newNote);
  // fs.readFile('./db/db.json', 'utf8', (err, data) => {
  //   if (err) {
  //     console.error(err);
  //   } else {
  //     // Convert string into JSON object
  //     const parsedReviews = JSON.parse(data);

  //     // Add a new review
  //     parsedReviews.push(newReview);

  //     // Write updated reviews back to the file
  //     fs.writeFile(
  //       './db/reviews.json',
  //       JSON.stringify(parsedReviews, null, 4),
  //       (writeErr) =>
  //         writeErr
  //           ? console.error(writeErr)
  //           : console.info('Successfully updated reviews!')
  //     );
  //   }
  // });
  const noteJSON = JSON.stringify(notes, null, 2);
  writeFile("/db.json", noteJSON).then(() => {
    // send back confirmation that todo was updated
    res.json("successfully update");
  });
  res.json(newNote);
});

app.listen(PORT, () => {
  console.log(`${PORT} is running at http://localhost:${PORT}`);
});
