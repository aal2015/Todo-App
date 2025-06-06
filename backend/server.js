// require('dotenv').config();

// const Pool = require('pg').Pool;
// const pool = new Pool({
//   user: process.env.user,
//   host: 'localhost',
//   database: 'todo',
//   password: process.env.password,
//   port: 5432,
// });

// pool.connect();

// pool.query("Select * from notes", (err, res) => {
//     if (!err) {
//         console.log(res.rows);
//     } else {
//         console.log(err.message);
//     }
// });

const db         = require('./queries')
const express    = require("express");
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get("/", (req, res) => {
    console.log("Here");
    res.send("Hi");
});

app.get('/notes', db.getNotes)
app.post('/notes', db.addNote)
app.delete('/notes/:id', db.deleteNote)

app.listen(3000);