require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
};

const addNote = (req, res) => {
  const { note } = req.body

  pool.query("INSERT INTO notes (content) VALUES ($1) RETURNING *", [note], (err, dbRes) => {
    if (err) {
      throw err;
    }
    res.status(201).json(dbRes.rows[0]);
  });
};

const deleteNote = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query('DELETE FROM notes WHERE id = $1', [id], (err, dbRes) => {
    if (err) {
      throw err
    }
    res.status(200).send({ messsage: `Note deleted successfully!` })
  });
}

const refreshToken = async (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);

  const foundRefreshToken = await pool.query('SELECT * FROM refresh_tokens WHERE token = $1', [refreshToken]);

  if (foundRefreshToken.rows.length === 0) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken({ name: user.name })
    res.json({ accessToken: accessToken })
  });
}

const registerUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if username already exists
    const existing = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: "Username already taken" });
    }

    // Hash password and insert user
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO users (username, password_hash) VALUES ($1, $2)',
      [username, hashedPassword]
    );

    res.status(201).json({ message: "Successfully registered!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user in database
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Cannot find user' });
    }

    const foundUser = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, foundUser.password_hash);
    if (!isPasswordValid) {
      return res.status(403).json({ error: 'Invalid credentials' });
    }

    // Generate tokens
    const userPayload = { name: username };
    const accessToken = generateAccessToken(userPayload);
    const refreshToken = jwt.sign(userPayload, process.env.REFRESH_TOKEN_SECRET);
    await pool.query('INSERT INTO refresh_tokens (token) VALUES ($1)', [refreshToken]);
    res.json({ accessToken, refreshToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const logoutUser = async (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) return res.sendStatus(400); // Bad Request

  try {
    // Delete the token from the database
    const result = await pool.query(
      'DELETE FROM refresh_tokens WHERE token = $1',
      [refreshToken]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Token not found" });
    }

    res.status(204).send(); // No Content, successfully logged out
  } catch (err) {
    console.error("Error during logout:", err);
    res.status(500).json({ message: "Server error" });
  }
}

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
}

module.exports = {
  getNotes,
  addNote,
  deleteNote,
  refreshToken,
  registerUser,
  loginUser,
  logoutUser
}