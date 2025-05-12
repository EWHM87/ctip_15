// 1️⃣ Load env as early as possible
require('dotenv').config();

// 2️⃣ Pull in your single set of dependencies
const { body, validationResult } = require('express-validator');
const express    = require('express');
const helmet     = require('helmet');
const mysql      = require('mysql2');
const bcrypt     = require('bcryptjs');
const cors       = require('cors');
const bodyParser = require('body-parser');

const app  = express();
const PORT = process.env.PORT || 5000;

// —— LOCKED-DOWN CORS ——
// 2️⃣ Security + parsing middleware (ONLY once each)
app.use(helmet());

// —— LOCKED-DOWN CORS —— 
const allowedOrigins = [
  'http://localhost:19006',
  'http://localhost:3000',
  'https://your-frontend-domain.com'
];

app.use(cors({
  origin: (incomingOrigin, callback) => {
    // allow server-to-server tools (no origin)
    if (!incomingOrigin) return callback(null, true);

    if (allowedOrigins.includes(incomingOrigin)) {
      return callback(null, true);
    }
    callback(new Error(`⚠️ CORS blocked for ${incomingOrigin}`), false);
  },
  credentials: true
}));

// now JSON parser
app.use(bodyParser.json());


// 4️⃣ MySQL Connection
const db = mysql.createConnection({
  host:     process.env.DB_HOST,
  user:     process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect(err => {
  if (err) {
    console.error('❌ DB connection error:', err);
    process.exit(1);
  }
  console.log('✅ Connected to MySQL database');
});

// Create users table if it doesn't exist
const createUsersTable = `
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'guide', 'visitor') DEFAULT 'visitor',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;
`;

db.query(createUsersTable, (err, result) => {
  if (err) {
    console.error('❌ Error creating users table:', err);
  } else {
    console.log('✅ Users table ready');
  }
});

// ==============================
// POST /api/register
// ==============================

app.post(
  '/api/register',
  [
    body('username')
      .trim()
      .isLength({ min: 3 }).withMessage('Username must be at least 3 characters')
      .isAlphanumeric().withMessage('Username must be letters and numbers only'),
    body('email')
      .isEmail().withMessage('Must be a valid email')
      .normalizeEmail(),
    body('password')
      .isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    body('role')
      .optional()
      .isIn(['admin','guide','visitor']).withMessage('Invalid role')
  ],
  async (req, res) => {
    // 1️⃣ Validation check
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    // 2️⃣ Your existing registration logic goes here:
    const { username, email, password, role } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const sql = `INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)`;
      db.query(sql, [username, email, hashedPassword, role], (err, result) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Username or email already exists' });
          }
          return res.status(500).json({ message: 'DB insert failed', error: err });
        }
        const newUserId = result.insertId;
        if (role === 'guide') {
          const insertGuideSQL = `INSERT INTO manage_guides (guide_id, name, email) VALUES (?, ?, ?)`;
          db.query(insertGuideSQL, [newUserId, username, email], (guideErr) => {
            if (guideErr) {
              console.error('❌ Error inserting into manage_guides:', guideErr);
              return res.status(500).json({ message: 'User created, but guide insert failed' });
            }
            return res.status(201).json({ message: 'Guide registered successfully' });
          });
        } else {
          return res.status(201).json({ message: 'User registered successfully' });
        }
      });
    } catch (error) {
      console.error('❌ Server error:', error);
      res.status(500).json({ message: 'Server error during registration' });
    }
  }
);

// ==============================
// POST /api/login
// ==============================

app.post(
  '/api/login',
  [
    body('username').trim().notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    // ...your existing login logic
  }
);


// ==============================
// Create Parks info table (dummy*)
// ==============================

const createParkInfoTable = `
CREATE TABLE IF NOT EXISTS park_info (
  park_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  location VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;
`;

db.query(createParkInfoTable, (err) => {
  if (err) {
    console.error('❌ Error creating park_info table:', err);
  } else {
    console.log('✅ park_info table ready');
  }
});

// ==============================
// PARK INFO ROUTES
// ==============================

// GET all parks
app.get('/api/parks', (req, res) => {
  db.query('SELECT * FROM park_info', (err, results) => {
    if (err) {
      console.error('❌ Error fetching parks:', err);
      return res.status(500).json({ message: 'Error fetching park data' });
    }
    res.json(results);
  });
});

// POST a new park (optional: for admin use)
app.post('/api/parks', (req, res) => {
  const { name, location, description } = req.body;
  if (!name || !location || !description) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const sql = `INSERT INTO park_info (name, location, description) VALUES (?, ?, ?)`;
  db.query(sql, [name, location, description], (err, result) => {
    if (err) {
      console.error('❌ Error inserting park:', err);
      return res.status(500).json({ message: 'Error adding park' });
    }
    res.status(201).json({ message: 'Park added successfully', parkId: result.insertId });
  });
});

// ==============================
// Create training_available table
// ==============================

const createTrainingTable = `
CREATE TABLE IF NOT EXISTS training_available (
  training_id INT AUTO_INCREMENT PRIMARY KEY,
  topic VARCHAR(255) NOT NULL,
  date DATE NOT NULL
) ENGINE=InnoDB;
`;

db.query(createTrainingTable, (err) => {
  if (err) console.error('❌ Error creating training_available table:', err);
  else console.log('✅ training_available table ready');
});

// POST /api/training - Insert a new training session
app.post('/api/training-available', (req, res) => {
  const { topic, date } = req.body;

  const sql = `INSERT INTO training_available (topic, date) VALUES (?, ?)`;
  db.query(sql, [topic, date], (err, result) => {
    if (err) return res.status(500).json({ message: 'Insert error', error: err });
    res.status(201).json({ message: 'Training available created', training_id: result.insertId });
  });
});

// GET /api/training - Fetch all training sessions
app.get('/api/training-available', (req, res) => {
  db.query(`SELECT * FROM training_available`, (err, results) => {
    if (err) return res.status(500).json({ message: 'Fetch error', error: err });
    res.json(results);
  });
});

// ==============================
// Create training_schedule table
// ==============================

const createTrainingScheduleTable = `
CREATE TABLE IF NOT EXISTS schedule_training (
  schedule_id INT AUTO_INCREMENT PRIMARY KEY,
  topic VARCHAR(255) NOT NULL,
  date DATE NOT NULL
);`;

db.query(createTrainingScheduleTable, (err) => {
  if (err) console.error('❌ Error creating training_schedule table:', err);
  else console.log('✅ training_schedule table ready');
});

// POST /api/training-schedule - Insert a new training schedule
app.post('/api/scheduletraining', (req, res) => {
  const { topic, date } = req.body;

  if (!topic || !date) {
    return res.status(400).json({ message: 'Topic and Date are required' });
  }

  const sql = 'INSERT INTO schedule_training (topic, date) VALUES (?, ?)';
  db.query(sql, [topic, date], (err, result) => {
    if (err) {
      console.error('❌ Error inserting training:', err);
      return res.status(500).json({ message: 'Error inserting training', error: err });
    }

    res.status(201).json({
      message: 'Training scheduled successfully',
      schedule_id: result.insertId,
      topic,
      date,
    });
  });
});

// GET /api/scheduletraining - Fetch scheduled trainings
app.get('/api/scheduletraining', (req, res) => {
  const sql = 'SELECT * FROM schedule_training ORDER BY date';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('❌ Error fetching trainings:', err);
      return res.status(500).json({ message: 'Error fetching trainings', error: err });
    }
    res.status(200).json(result);
  });
});

// ==============================
// Create training_history table
// ==============================

const createGuideTrainingTable = `
CREATE TABLE IF NOT EXISTS training_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  guide_id INT NOT NULL,
  schedule_id INT NOT NULL,
  status ENUM('Upcoming', 'Completed') DEFAULT 'Upcoming',
  FOREIGN KEY (schedule_id) REFERENCES schedule_training(schedule_id)
);
`;

db.query(createGuideTrainingTable, (err) => {
  if (err) {
    console.error('❌ Error creating guide_training table:', err);
  } else {
    console.log('✅ guide_training table ready');
  }
});

// GET /api/my-training/:guideId - Get training history for a guide
app.get('/api/my-training/:guideId', (req, res) => {
  const guideId = req.params.guideId;

  const sql = `
    SELECT st.topic, st.date, gt.status
    FROM training_history gt
    JOIN schedule_training st ON gt.schedule_id = st.schedule_id
    WHERE gt.guide_id = ?
    ORDER BY st.date DESC
  `;

  db.query(sql, [guideId], (err, results) => {
    if (err) {
      console.error('❌ Error fetching training history:', err);
      return res.status(500).json({ message: 'Fetch error', error: err });
    }
    res.json(results);
  });
});

// POST /api/guide-training - Sign up a guide for a training session
app.post('/api/guide-training', (req, res) => {
  const { guide_id, schedule_id } = req.body;

  const sql = `
    INSERT INTO training_history (guide_id, schedule_id, status)
    VALUES (?, ?, 'Upcoming')
  `;

  db.query(sql, [guide_id, schedule_id], (err, result) => {
    if (err) {
      console.error('❌ MySQL Error during INSERT:', err);
      return res.status(500).json({ message: 'Signup error', error: err });
    }
    res.status(201).json({ message: 'Guide signed up for training', id: result.insertId });
  });
});

// ==============================
// Create manage_guides table
// ==============================

const createManageGuidesTable = `
CREATE TABLE IF NOT EXISTS manage_guides (
    guide_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    certifications TEXT DEFAULT ''
)ENGINE=InnoDB;
`;

db.query(createManageGuidesTable, (err) => {
    if (err) console.error('❌ Error creating manage_guides table:', err);
    else console.log('✅ manage_guides table ready');
});

// POST /api/manage-guides - Fetch all guides
app.post('/api/register-guide', (req, res) => {
  const { name, email, role = 'guide' } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and Email are required' });
  }

  const sql = `INSERT INTO manage_guides (name, email) VALUES (?, ?)`;
  db.query(sql, [name, email], (err, result) => {
    if (err) {
      console.error('❌ Error adding guide:', err);
      return res.status(500).json({ message: 'Failed to add guide', error: err });
    }
    res.status(201).json({ message: 'Guide registered successfully', guide_id: result.insertId });
  });
});

// GET /api/manage-guides - Fetch all guide info with join
app.get('/api/manage-guides', (req, res) => {
  const sql = `
    SELECT 
      mg.guide_id,
      mg.name,
      mg.email,
      u.username,
      u.role,
      u.created_at,
      gc.certification_name,
      gc.expiry_date,
      gc.status
    FROM manage_guides mg
    LEFT JOIN users u ON mg.email = u.email
    LEFT JOIN guide_certifications gc ON mg.guide_id = gc.guide_id
    ORDER BY mg.name
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Error fetching guide data:', err);
      return res.status(500).json({ message: 'Failed to fetch guide data', error: err });
    }

    // ✅ Always return an array, even if empty
    if (!Array.isArray(results)) {
      return res.status(200).json([]);
    }

    res.status(200).json(results);
  });
});

// DELETE /api/manage-guides/:guideId - Delete a guide
app.delete('/api/manage-guides/:id', (req, res) => {
  const guideId = req.params.id;

  // First delete from guide_certifications
  const deleteCerts = `DELETE FROM guide_certifications WHERE guide_id = ?`;
  db.query(deleteCerts, [guideId], (certErr) => {
    if (certErr) {
      console.error('❌ Error deleting certifications:', certErr);
      return res.status(500).json({ message: 'Failed to delete certifications', error: certErr });
    }

    // Then delete the guide
    const deleteGuide = `DELETE FROM manage_guides WHERE guide_id = ?`;
    db.query(deleteGuide, [guideId], (guideErr) => {
      if (guideErr) {
        console.error('❌ Error deleting guide:', guideErr);
        return res.status(500).json({ message: 'Failed to delete guide', error: guideErr });
      }

      res.json({ message: 'Guide deleted successfully' });
    });
  });
});


// ==============================
// Create guide_certifications table
// ==============================
const createCertificationsTable = `
CREATE TABLE IF NOT EXISTS guide_certifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  guide_id INT NOT NULL,
  certification_name VARCHAR(255) NOT NULL,
  expiry_date DATE NOT NULL,
  status ENUM('Valid', 'Expiring Soon', 'Expired') DEFAULT 'Valid',
  FOREIGN KEY (guide_id) REFERENCES manage_guides(guide_id)
) ENGINE=InnoDB;
`;

db.query(createCertificationsTable, (err) => {
  if (err) console.error('❌ Error creating guide_certifications table:', err);
  else console.log('✅ guide_certifications table ready');
});

// POST /api/guide-certifications - Add a certification for a guide
app.post('/api/certifications', (req, res) => {
  const { guide_id, certification_name, expiry_date, status = 'Valid' } = req.body;

  if (!guide_id || !certification_name || !expiry_date) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const sql = `
    INSERT INTO guide_certifications (guide_id, certification_name, expiry_date, status)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [guide_id, certification_name, expiry_date, status], (err, result) => {
    if (err) {
      console.error('❌ Insert error:', err);
      return res.status(500).json({ message: 'Failed to assign certification', error: err });
    }
    res.status(201).json({ message: 'Certification assigned', id: result.insertId });
  });
});

// GET /api/guide-certifications/:guideId - Get certifications for a guide
app.get('/api/certifications/:guide_id', (req, res) => {
  const guideId = req.params.guide_id;

  const sql = `
    SELECT certification_name, expiry_date, status
    FROM guide_certifications
    WHERE guide_id = ?
  `;

  db.query(sql, [guideId], (err, results) => {
    if (err) {
      console.error('❌ Fetch error:', err);
      return res.status(500).json({ message: 'Failed to fetch certifications', error: err });
    }
    res.json(results);
  });
});

//PUT /api/guide-certifications/:id - Update a certification
app.put('/api/certifications/:id', (req, res) => {
  const id = req.params.id;
  const { certification_name, expiry_date, status } = req.body;

  const sql = `
    UPDATE guide_certifications
    SET certification_name = ?, expiry_date = ?, status = ?
    WHERE id = ?
  `;

  db.query(sql, [certification_name, expiry_date, status, id], (err) => {
    if (err) {
      console.error('❌ Update error:', err);
      return res.status(500).json({ message: 'Failed to update certification', error: err });
    }
    res.json({ message: 'Certification updated' });
  });
});

// GET /api/certifications/reminders - reminders for certifications due soon
app.get('/api/certifications/reminders', (req, res) => {
  const sql = `
    SELECT g.name, c.certification_name, c.expiry_date
    FROM guide_certifications c
    JOIN manage_guides g ON c.guide_id = g.guide_id
    WHERE c.expiry_date <= DATE_ADD(CURDATE(), INTERVAL 30 DAY)
    ORDER BY c.expiry_date ASC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Reminder fetch error:', err);
      return res.status(500).json({ message: 'Failed to fetch reminders', error: err });
    }
    res.json(results);
  });
});

// 5️⃣ Centralized error-handler
app.use((err, req, res, next) => {
  if (err.message?.startsWith('⚠️ CORS blocked')) {
    return res.status(403).json({ error: err.message });
  }
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});


// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
