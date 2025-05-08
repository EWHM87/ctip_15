const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // leave blank for XAMPP default
  database: 'sarawakparks',
});

db.connect(err => {
  if (err) {
    console.error('❌ DB connection error:', err);
    return;
  }
  console.log('✅ Connected to MySQL database');
});

// ==============================
// POST /api/register
// ==============================

app.post('/api/register', async (req, res) => {
  const { username, email, password, role } = req.body;

  console.log('📥 Received register data:', req.body);

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('🔐 Hashed password:', hashedPassword);

    const sql = `INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)`;
    db.query(sql, [username, email, hashedPassword, role], (err, result) => {
      if (err) {
        console.error('❌ MySQL insert error:', err);
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ message: 'Username or email already exists' });
        }
        return res.status(500).json({ message: 'DB insert failed', error: err });
      }

      console.log('✅ User inserted:', result);
      res.status(201).json({ message: 'User registered successfully' });
    });
  } catch (error) {
    console.error('❌ Server-side error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});


// ==============================
// POST /api/login
// ==============================

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  const sql = `SELECT * FROM users WHERE username = ?`;
  db.query(sql, [username], async (err, results) => {
    if (err) return res.status(500).json({ message: 'DB error', error: err });

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    res.json({ message: 'Login successful', user: { username: user.username, role: user.role } });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
