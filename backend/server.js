const db = require('./queries');
const express = require("express");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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
let users = [];

app.get("/", (req, res) => {
  console.log("Here");
  res.send("Hi");
});

app.post('/token', (req, res) => {
  const refreshToken = req.body.token
  if (refreshToken == null) return res.sendStatus(401)
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken({ name: user.name })
    res.json({ accessToken: accessToken })
  })
});

app.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { username: req.body.username, password: hashedPassword };
    users.push(user);
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
});

app.post("/login", async (req, res) => {
  // Authenticate User
  const foundUser = users.find(user => user.username === req.body.username);
  if (foundUser == null) {
    return res.status(400).send('Cannot find user')
  }

  try {
    const flag = await bcrypt.compare(req.body.password, foundUser.password);
    if (!flag) {
      res.sendStatus(403);
    }
  } catch {
    res.status(500).send();
  }

  // Generate Access and Refresh Tokens
  const username = req.body.username;
  const user = { name: username };

  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken);
  res.json({ accessToken: accessToken, refreshToken: refreshToken });
})

app.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204)
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
}

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