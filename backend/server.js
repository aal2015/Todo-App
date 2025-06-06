const db         = require('./queries')
const express    = require("express");
const bodyParser = require('body-parser')
const cors       = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.get("/", (req, res) => {
    console.log("Here");
    res.send("Hi");
});

app.get('/notes', db.getNotes)
app.post('/notes', db.addNote)
app.delete('/notes/:id', db.deleteNote)

app.listen(3000);