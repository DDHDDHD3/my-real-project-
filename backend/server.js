const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY || 'YOUR_SECRET_KEY'; // In production, use environment variable

// Middleware
app.use(cors({
    origin: '*', // Allow all origins (Vercel domains vary)
    credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Database Connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

// Retry logic to wait for database
const connectWithRetry = () => {
    pool.connect((err, client, release) => {
        if (err) {
            console.error('Connection timeout/error. Retrying in 5 seconds...', err.stack);
            setTimeout(connectWithRetry, 5000);
        } else {
            console.log('Successfully connected to PostgreSQL database!');
            release();
            initializeDatabase().then(() => {
                app.listen(PORT, '0.0.0.0', () => {
                    console.log(`Server running on port ${PORT}`);
                });
            }).catch(err => console.error('Error initializing database:', err));
        }
    });
};

connectWithRetry();

// Authentication Middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
}

// Initialize Database
async function initializeDatabase() {
    try {
        // Users Table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
            );
        `);

        // Profile Table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS profile (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100),
                role VARCHAR(100),
                email VARCHAR(100),
                phone VARCHAR(50),
                address VARCHAR(255),
                github VARCHAR(255),
                mission TEXT
            );
        `);

        // Projects Table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS projects (
                id SERIAL PRIMARY KEY,
                title VARCHAR(100),
                description TEXT,
                image_url TEXT,
                link VARCHAR(255),
                link_text VARCHAR(50)
            );
        `);

        // Ensure image_url is TEXT if table already exists
        await pool.query('ALTER TABLE projects ALTER COLUMN image_url TYPE TEXT');

        // Skill Categories Table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS skill_categories (
                id SERIAL PRIMARY KEY,
                title VARCHAR(100),
                description TEXT
            );
        `);

        // Skills Table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS skills (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100),
                icon TEXT,
                color VARCHAR(50),
                category_id INTEGER REFERENCES skill_categories(id) ON DELETE CASCADE
            );
        `);

        // Messages Table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS messages (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL,
                message TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Seed Admin User
        const userCount = await pool.query('SELECT COUNT(*) FROM users');
        if (parseInt(userCount.rows[0].count) === 0) {
            const hashedPassword = await bcrypt.hash('admin_secure_password', 10);
            await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', ['admin', hashedPassword]);
            console.log('Admin user seeded.');
        }

        // Seed Initial Profile
        const profileCount = await pool.query('SELECT COUNT(*) FROM profile');
        if (parseInt(profileCount.rows[0].count) === 0) {
            await pool.query(`
                INSERT INTO profile (name, role, email, phone, address, github, mission) 
                VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                [
                    'Abdullahi Muse Isse',
                    'Information Technology Professional',
                    'abdallaise877@gmail.com',
                    '+252 61 4163362',
                    'Mogadishu, Somalia',
                    'https://github.com/DDHDDHD3',
                    'I am a passionate Frontend / Full-Stack Developer with a strong focus on building modern, responsive, and user-centric web applications.'
                ]
            );
            console.log('Profile seeded.');
        }

        // Seed Skills
        const skillCatCount = await pool.query('SELECT COUNT(*) FROM skill_categories');
        if (parseInt(skillCatCount.rows[0].count) === 0) {
            const cat1 = await pool.query('INSERT INTO skill_categories (title, description) VALUES ($1, $2) RETURNING id',
                ['Professional Traits', 'Core interpersonal and analytical strengths.']);
            const cat2 = await pool.query('INSERT INTO skill_categories (title, description) VALUES ($1, $2) RETURNING id',
                ['Technical Core', 'Academic foundations and specialized knowledge.']);

            const cat1Id = cat1.rows[0].id;
            const cat2Id = cat2.rows[0].id;

            await pool.query('INSERT INTO skills (name, icon, color, category_id) VALUES ($1, $2, $3, $4)',
                ['Communication', 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z', 'blue', cat1Id]);
            await pool.query('INSERT INTO skills (name, icon, color, category_id) VALUES ($1, $2, $3, $4)',
                ['Problem-solving', 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', 'indigo', cat1Id]);

            await pool.query('INSERT INTO skills (name, icon, color, category_id) VALUES ($1, $2, $3, $4)',
                ['Digital Systems', 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4', 'cyan', cat2Id]);
            await pool.query('INSERT INTO skills (name, icon, color, category_id) VALUES ($1, $2, $3, $4)',
                ['Data Administration', 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z', 'teal', cat2Id]);

            console.log('Skills seeded.');
        }

        // Seed Projects
        const projectCount = await pool.query('SELECT COUNT(*) FROM projects');
        if (parseInt(projectCount.rows[0].count) === 0) {
            await pool.query('INSERT INTO projects (title, description, image_url, link, link_text) VALUES ($1, $2, $3, $4, $5)',
                ['Qabas al Hudaa Institute', 'A comprehensive student grade management system...', '/assets/images/qabas-al-huda-main.png', 'https://shahaado-qabas-al-huda.vercel.app', 'Explore Project']);
        }

        console.log('Database initialized successfully.');
    } catch (err) {
        console.error('Error initializing database:', err);
    }
}

// Routes

// Auth
app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (result.rows.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

        const user = result.rows[0];
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '10m' });
        res.json({ token, username: user.username });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Profile
app.get('/api/profile', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM profile LIMIT 1');
        res.json(result.rows[0] || {});
    } catch (err) {
        res.status(500).json({ message: 'Error fetching profile' });
    }
});

app.put('/api/profile', authenticateToken, async (req, res) => {
    const { name, role, email, phone, address, github, mission } = req.body;
    try {
        await pool.query(`
            UPDATE profile 
            SET name = $1, role = $2, email = $3, phone = $4, address = $5, github = $6, mission = $7
            WHERE id = (SELECT id FROM profile LIMIT 1)`,
            [name, role, email, phone, address, github, mission]
        );
        res.json({ message: 'Profile updated' });
    } catch (err) {
        res.status(500).json({ message: 'Error updating profile' });
    }
});

// Projects
app.get('/api/projects', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM projects ORDER BY id ASC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching projects' });
    }
});

app.post('/api/projects', authenticateToken, async (req, res) => {
    const { title, description, image_url, link, link_text } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO projects (title, description, image_url, link, link_text) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [title, description, image_url, link, link_text]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ message: 'Error adding project' });
    }
});

app.put('/api/projects/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { title, description, image_url, link, link_text } = req.body;
    try {
        await pool.query(
            'UPDATE projects SET title = $1, description = $2, image_url = $3, link = $4, link_text = $5 WHERE id = $6',
            [title, description, image_url, link, link_text, id]
        );
        res.json({ message: 'Project updated' });
    } catch (err) {
        res.status(500).json({ message: 'Error updating project' });
    }
});

app.delete('/api/projects/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM projects WHERE id = $1', [id]);
        res.json({ message: 'Project deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting project' });
    }
});

// Skills
app.put('/api/skills', authenticateToken, async (req, res) => {
    const categories = req.body;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Simple approach: clear and re-insert for categories/skills
        // In production, you'd do a more granular sync.
        await client.query('DELETE FROM skills');
        await client.query('DELETE FROM skill_categories');

        for (const cat of categories) {
            const catRes = await client.query(
                'INSERT INTO skill_categories (title, description) VALUES ($1, $2) RETURNING id',
                [cat.title, cat.description]
            );
            const catId = catRes.rows[0].id;

            for (const skill of cat.skills) {
                await client.query(
                    'INSERT INTO skills (name, icon, color, category_id) VALUES ($1, $2, $3, $4)',
                    [skill.name, skill.icon, skill.color, catId]
                );
            }
        }

        await client.query('COMMIT');
        res.json({ message: 'Skills updated' });
    } catch (err) {
        await client.query('ROLLBACK');
        console.error(err);
        res.status(500).json({ message: 'Error updating skills' });
    } finally {
        client.release();
    }
});

app.get('/api/skills', async (req, res) => {
    try {
        const categories = await pool.query('SELECT * FROM skill_categories ORDER BY id ASC');
        const skills = await pool.query('SELECT * FROM skills ORDER BY id ASC');

        const result = categories.rows.map(cat => ({
            ...cat,
            skills: skills.rows.filter(s => s.category_id === cat.id)
        }));
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching skills' });
    }
});

// Messages API
app.post('/api/messages', async (req, res) => {
    const { name, email, message } = req.body;
    try {
        await pool.query(
            'INSERT INTO messages (name, email, message) VALUES ($1, $2, $3)',
            [name, email, message]
        );
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error sending message' });
    }
});

app.get('/api/messages', authenticateToken, async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM messages ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching messages' });
    }
});

app.delete('/api/messages/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM messages WHERE id = $1', [id]);
        res.json({ message: 'Message deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting message' });
    }
});

app.get('/health', (req, res) => {
    res.send({ status: 'UP', timestamp: new Date() });
});

// app.listen(PORT, '0.0.0.0', () => {
//     console.log(`Server running on port ${PORT}`);
// });
