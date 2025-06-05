require('dotenv').config();

const Pool = require('pg').Pool;
const pool = new Pool({
  user: process.env.user,
  host: 'localhost',
  database: 'todo',
  password: process.env.password,
  port: 5432,
});

pool.connect();

pool.query("Select * from notes", (err, res) => {
    if (!err) {
        console.log(res.rows);
    } else {
        console.log(err.message);
    }
});

const express = require("express");
const app = express();

app.get("/", (req, res) => {
    console.log("Here");
    res.send("Hi");
});

app.listen(3000);