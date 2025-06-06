require('dotenv').config();

const Pool = require('pg').Pool;
const pool = new Pool({
    user: process.env.user,
    host: 'localhost',
    database: 'todo',
    password: process.env.password,
    port: 5432,
});

const getNotes = (req, res) => {
    pool.query("Select * from notes", (err, dbRes) => {
        if (err) {
            throw err;
        }
        res.status(200).json(dbRes.rows)
    });
}

const addNote = (req, res) => {
    const { note } = req.body

    pool.query("INSERT INTO notes (content) VALUES ($1)", [note], (err, dbRes) => {
        if (err) {
            throw err;
        }
        res.status(201).send('Note added successfully');
    });
}

module.exports = {
    getNotes,
    addNote
}