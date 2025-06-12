const db = require('./queries');
const express = require("express");
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

let refreshTokens = [];

app.get("/", (req, res) => {
  console.log("Here");
  res.send("Hi");
});

app.post('/token', db.refreshToken);

app.post("/register", db.registerUser);

app.post("/login", db.loginUser)

app.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204)
});

app.get('/notes', authenticateToken, db.getNotes);
app.post('/notes', authenticateToken, db.addNote);
app.delete('/notes/:id', authenticateToken, db.deleteNote);

function authenticateToken(req, res, next) {
  const authheader = req.headers['authorization'];
  const token = authheader && authheader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    next();
  });
}

app.listen(3000);