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
  const authenticateToken = require('./authMiddleware');

  const app  = express();
  const PORT = process.env.PORT || 5000;

 
  app.use(express.json());


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

// ————————————————————————————————
// Create park_info table & route
// ————————————————————————————————

const createParkInfoTable = `
CREATE TABLE IF NOT EXISTS park_info (
  park_id     INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  location    VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;
`;
db.query(createParkInfoTable, (err) => {
  if (err) console.error('❌ Error creating park_info table:', err);
  else console.log('✅ park_info table ready');
});

// GET all parks
app.get('/api/parks', (req, res) => {
  db.query('SELECT * FROM park_info', (err, rows) => {
    if (err) return res.status(500).json({ message: 'Error fetching parks' });
    res.json(rows);
  });
});

// POST a new park
app.post('/api/parks', (req, res) => {
  const { name, location, description } = req.body;
  if (!name || !location || !description) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  const sql = 'INSERT INTO park_info (name, location, description) VALUES (?, ?, ?)';
  db.query(sql, [name, location, description], (err, result) => {
    if (err) {
      console.error('❌ Error inserting park:', err);
      return res.status(500).json({ message: 'Error adding park', error: err });
    }
    res.status(201).json({ message: 'Park added successfully', parkId: result.insertId });
  });
});


  // ==============================
  // POST /api/register
  // ==============================

  app.post(
    '/api/register',
    [
      body('username')
        .trim()
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
      body('email')
        .isEmail().withMessage('Must be a valid email')
        .normalizeEmail(),
      body('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
      body('role')
        .optional()
        .isIn(['admin', 'guide', 'visitor']).withMessage('Invalid role')
    ],
    async (req, res) => {
      console.log('📥 Received registration:', req.body);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log('❌ Validation failed:', errors.array());
        return res.status(422).json({ message: 'Validation error', errors: errors.array() });
      }

      const { username, email, password, role } = req.body;

      try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)`;
        db.query(sql, [username, email, hashedPassword, role], (err, result) => {
          if (err) {
            console.error('❌ MySQL Error:', err);
            if (err.code === 'ER_DUP_ENTRY') {
              return res.status(400).json({ message: 'Username or email already exists' });
            }
            return res.status(500).json({ message: 'DB insert failed', error: err });
          }

          // If registering as guide, also insert into manage_guides
          if (role === 'guide') {
            const sql2 = `INSERT INTO manage_guides (name, email) VALUES (?, ?)`;
            db.query(sql2, [username, email], (err2) => {
              if (err2 && err2.code !== 'ER_DUP_ENTRY') {
                console.error('❌ Error inserting into manage_guides:', err2);
                return res.status(500).json({ message: 'Guide registration failed', error: err2 });
              }
              console.log('✅ Guide also added to manage_guides');
            });
          }

          console.log('✅ Registered new user:', result);
          return res.status(201).json({ message: 'User registered successfully' });
        });
      } catch (err) {
        console.error('❌ Server error:', err);
        return res.status(500).json({ message: 'Server error' });
      }
    }
  );

  // PUT /api/update-role/:email
  app.put('/api/update-role/:email', (req, res) => {
    const { email } = req.params;
    const { role } = req.body;

    const sql = `UPDATE users SET role = ? WHERE email = ?`;
    db.query(sql, [role, email], (err) => {
      if (err) {
        console.error('❌ Role update failed:', err);
        return res.status(500).json({ message: 'Failed to update role', error: err });
      }
      res.json({ message: 'Role updated successfully' });
    });
  });

  //  POST /api/register-guide
  app.post('/api/register-guide', async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Name and Email are required' });
    }

    // Step 1: Insert into manage_guides
    const sql1 = `INSERT INTO manage_guides (name, email) VALUES (?, ?)`;
    db.query(sql1, [name, email], async (err1, result1) => {
      if (err1) {
        console.error('❌ Error adding to manage_guides:', err1);
        if (err1.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ message: 'Guide already exists' });
        }
        return res.status(500).json({ message: 'Database error', error: err1 });
      }

      // Step 2: Insert into users (if not already exists)
      const defaultPassword = await bcrypt.hash('guide1234', 10);
      const sql2 = `
        INSERT INTO users (username, email, password, role)
        VALUES (?, ?, ?, 'guide')
      `;

      db.query(sql2, [name, email, defaultPassword], (err2) => {
        if (err2 && err2.code !== 'ER_DUP_ENTRY') {
          console.error('❌ Error adding to users:', err2);
          return res.status(500).json({ message: 'Guide added, but user account creation failed', error: err2 });
        }

        console.log('✅ Guide registered by admin');
        return res.status(201).json({ message: 'Guide and user account created successfully' });
      });
    });
  });

  // PUT/api/update-role/:email
  app.put('/api/update-role/:email', (req, res) => {
    const { email } = req.params;
    const { role } = req.body;

    if (!['admin', 'guide', 'visitor'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const updateSql = `UPDATE users SET role = ? WHERE email = ?`;
    db.query(updateSql, [role, email], (err, result) => {
      if (err) {
        console.error('❌ Error updating role:', err);
        return res.status(500).json({ message: 'Failed to update role', error: err });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({ message: 'User role updated successfully' });
    });
  });

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

    const { username, password } = req.body;

    const sql = `SELECT * FROM users WHERE username = ?`;
    db.query(sql, [username], async (err, results) => {
      if (err) {
        console.error('❌ DB error:', err);
        return res.status(500).json({ message: 'Database error' });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      // ✅ Create JWT here
      const jwt = require('jsonwebtoken');
      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      // ✅ Return token in response
        res.json({
          message: 'Login successful',
          token,
          user: {
            id: user.id,
            username: user.username,
            role: user.role
          }
        });
      });
    }
  );

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

    // Step 1: Get guide's email first
    const getEmailSql = `SELECT email FROM manage_guides WHERE guide_id = ?`;
    db.query(getEmailSql, [guideId], (err, results) => {
      if (err || results.length === 0) {
        return res.status(404).json({ message: 'Guide not found' });
      }

      const email = results[0].email;

      // Step 2: Delete related certifications
      const deleteCertsSql = `DELETE FROM guide_certifications WHERE guide_id = ?`;
      db.query(deleteCertsSql, [guideId], (certErr) => {
        if (certErr) {
          console.error('❌ Error deleting certifications:', certErr);
          return res.status(500).json({ message: 'Failed to delete certifications', error: certErr });
        }

        // Step 3: Delete from manage_guides
        const deleteGuideSql = `DELETE FROM manage_guides WHERE guide_id = ?`;
        db.query(deleteGuideSql, [guideId], (guideErr) => {
          if (guideErr) {
            console.error('❌ Error deleting guide:', guideErr);
            return res.status(500).json({ message: 'Failed to delete guide', error: guideErr });
          }

          // Step 4: Delete from users (only if it's a guide)
          const deleteUserSql = `DELETE FROM users WHERE email = ? AND role = 'guide'`;
          db.query(deleteUserSql, [email], (userErr) => {
            if (userErr) {
              console.error('❌ Error deleting from users:', userErr);
              return res.status(500).json({ message: 'Guide deleted, but user not removed', error: userErr });
            }

            res.json({ message: 'Guide and user deleted successfully' });
          });
        });
      });
    });
  });

  // PUT /api/manage-guides/:id - Update guide info
  app.put('/api/manage-guides/:id', (req, res) => {
    const guideId = req.params.id;
    const { name, email } = req.body;

    const getEmailSql = `SELECT email FROM manage_guides WHERE guide_id = ?`;
    db.query(getEmailSql, [guideId], (err, result) => {
      if (err || result.length === 0) return res.status(404).json({ message: 'Guide not found' });

      const oldEmail = result[0].email;

      const updateGuide = `UPDATE manage_guides SET name = ?, email = ? WHERE guide_id = ?`;
      const updateUser = `UPDATE users SET username = ?, email = ? WHERE email = ? AND role = 'guide'`;

      db.query(updateGuide, [name, email, guideId], (err1) => {
        if (err1) return res.status(500).json({ message: 'Guide update failed', error: err1 });

        db.query(updateUser, [name, email, oldEmail], (err2) => {
          if (err2) return res.status(500).json({ message: 'User sync failed', error: err2 });

          res.json({ message: 'Guide and user info updated successfully' });
        });
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

  // GET /api/my-certifications-by-username?username=...
  app.get('/api/my-certifications-by-username', (req, res) => {
    const { username } = req.query;

    const sql = `
      SELECT c.certification_name, c.expiry_date, c.status
      FROM guide_certifications c
      JOIN manage_guides g ON c.guide_id = g.guide_id
      WHERE g.name = ?
      ORDER BY c.expiry_date
    `;

    db.query(sql, [username], (err, results) => {
      if (err) {
        console.error('❌ Error fetching certifications by username:', err);
        return res.status(500).json({ message: 'Failed to fetch certifications', error: err });
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

  // Example protected route
  app.get('/api/protected-route', authenticateToken, (req, res) => {
    res.json({ message: `Welcome, ${req.user.username}! You are a ${req.user.role}` });
  });

  // Start server
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
  