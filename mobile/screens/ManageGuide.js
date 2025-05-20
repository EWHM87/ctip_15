const express = require('express');
const mysql   = require('mysql2');
const app     = express();
app.use(express.json());

// ←– configure your pool/connection however you like
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sarawakparks'
});

// 1. LIST ALL GUIDES
app.get('/api/guides', (req, res) => {
  db.query('SELECT id, name, email, role, certification, expiry_date AS expiryDate, status FROM guides', (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows);
  });
});

// 2. CREATE A NEW GUIDE
app.post('/api/guides', (req, res) => {
  const { name, email, role, certification, expiryDate, status } = req.body;
  const sql = `
    INSERT INTO guides (name, email, role, certification, expiry_date, status)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, [name, email, role, certification, expiryDate, status], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: result.insertId, ...req.body });
  });
});

// 3. UPDATE AN EXISTING GUIDE
app.put('/api/guides/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, role, certification, expiryDate, status } = req.body;
  const sql = `
    UPDATE guides
       SET name=?, email=?, role=?, certification=?, expiry_date=?, status=?
     WHERE id=?
  `;
  db.query(sql, [name, email, role, certification, expiryDate, status, id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: +id, ...req.body });
  });
});

// 4. DELETE A GUIDE
app.delete('/api/guides/:id', (req, res) => {
  db.query('DELETE FROM guides WHERE id=?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.sendStatus(204);
  });
});

app.listen(5000, () => console.log('API listening on port 5000'));
