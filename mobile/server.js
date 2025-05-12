const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Step 1: Connect without specifying a database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '' // Add your MySQL password here if needed
});

// Step 2: Connect to MySQL
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');

  // Step 3: Create database if not exists
  db.query('CREATE DATABASE IF NOT EXISTS user_db', (err) => {
    if (err) throw err;
    console.log('Database created or already exists');

    // Step 4: Switch to user_db
    db.changeUser({ database: 'user_db' }, (err) => {
      if (err) throw err;

      // Step 5: Create users table
      const createUsersTable = `
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100),
          email VARCHAR(100) UNIQUE,
          password VARCHAR(255)
        )
      `;
      db.query(createUsersTable, (err) => {
        if (err) throw err;
        console.log('Users table ready');
      });

      // Step 6: Create visitors table
      const createVisitorsTable = `
        CREATE TABLE IF NOT EXISTS visitors (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100),
          email VARCHAR(100) UNIQUE,
          password VARCHAR(255)
        )
      `;
      db.query(createVisitorsTable, (err) => {
        if (err) throw err;
        console.log('Visitors table ready');
      });
    });
  });
});

// === User Register ===
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(sql, [name, email, hashedPassword], (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ message: 'Email already exists' });
        }
        return res.status(500).json({ message: 'Database error', error: err });
      }
      res.status(200).json({ message: 'User registered successfully' });
    });
  } catch (error) {
    res.status(500).json({ message: 'Error hashing password', error });
  }
});

// === User Login ===
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });

    if (results.length === 0) return res.status(404).json({ message: 'User not found' });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(401).json({ message: 'Invalid password' });

    res.status(200).json({
      message: 'Login successful',
      user: { id: user.id, name: user.name, email: user.email }
    });
  });
});

// === Visitor Register ===
app.post('/visitor/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO visitors (name, email, password) VALUES (?, ?, ?)';
    db.query(sql, [name, email, hashedPassword], (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ message: 'Email already exists' });
        }
        return res.status(500).json({ message: 'Database error', error: err });
      }
      res.status(200).json({ message: 'Visitor registered successfully' });
    });
  } catch (error) {
    res.status(500).json({ message: 'Error hashing password', error });
  }
});

// === Visitor Login ===
app.post('/visitor/login', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM visitors WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    if (results.length === 0) return res.status(404).json({ message: 'Visitor not found' });

    const visitor = results[0];
    const match = await bcrypt.compare(password, visitor.password);

    if (!match) return res.status(401).json({ message: 'Invalid password' });

    res.status(200).json({
      message: 'Login successful',
      visitor: { id: visitor.id, name: visitor.name, email: visitor.email }
    });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
