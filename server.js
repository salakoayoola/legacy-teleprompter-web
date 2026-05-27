const express = require('express');
const { DatabaseSync } = require('node:sqlite');
const http = require('http');
const path = require('path');
const fs = require('fs');
const helmet = require('helmet');

const app = express();
const server = http.createServer(app);

// --- MIDDLEWARE ---
// Disable CSP in Helmet to allow inline script/style execution in index.html (required for legacy support)
app.use(helmet({
    contentSecurityPolicy: false
}));
app.use(express.json());
app.use(express.static('web'));

// --- DATABASE INITIALIZATION ---
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'scripts.db');
const db = new DatabaseSync(dbPath);

// Sagan default speech text
const saganText = "Look again at that dot. That's here. That's home. That's us. On it everyone you love, everyone you know, everyone you ever heard of, every human being who ever was, lived out their lives. The aggregate of our joy and suffering, thousands of confident religions, ideologies, and economic doctrines, every hunter and forager, every hero and coward, every creator and destroyer of civilization, every king and peasant, every young couple in love, every mother and father, hopeful child, inventor and explorer, every teacher of morals, every corrupt politician, every \"superstar,\" every \"supreme leader,\" every saint and sinner in the history of our species lived there--on a mote of dust suspended in a sunbeam.\n\nThe Earth is a very small stage in a vast cosmic arena. Think of the rivers of blood spilled by all those generals and emperors so that, in glory and triumph, they could become the momentary masters of a fraction of a dot. Think of the endless cruelties visited by the inhabitants of one corner of this pixel on the scarcely distinguishable inhabitants of some other corner, how frequent their misunderstandings, how eager they are to kill one another, how fervent their hatreds.\n\nOur posturings, our imagined self-importance, the delusion that we have some privileged position in the Universe, are challenged by this point of pale light. Our planet is a lonely speck in the great enveloping cosmic dark. In our obscurity, in all this vastness, there is no hint that help will come from elsewhere to save us from ourselves.\n\nThe Earth is the only world known so far to harbor life. There is nowhere else, at least in the near future, to which our species could migrate. Visit, yes. Settle, not yet. Like it or not, for the moment the Earth is where we make our stand.\n\nIt has been said that astronomy is a humbling and character-building experience. There is perhaps no better demonstration of the folly of human conceits than this distant image of our tiny world. To me, it underscores our responsibility to deal more kindly with one another, and to preserve and cherish the pale blue dot, the only home we've ever known.\n\n— Carl Sagan, Pale Blue Dot, 1994";

// Setup database tables synchronously
db.exec("CREATE TABLE IF NOT EXISTS scripts (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT, settings TEXT)");

// Seed Pale Blue Dot if database is empty
const countStmt = db.prepare("SELECT count(*) as count FROM scripts");
const countResult = countStmt.get();
if (countResult && countResult.count === 0) {
    console.log("DB Empty... Injecting Sagan.");
    const insertStmt = db.prepare("INSERT INTO scripts (title, content, settings) VALUES (?, ?, ?)");
    insertStmt.run("Pale Blue Dot", saganText, "{}");
}

// --- API ROUTES ---

// Health Check
app.get('/health', (req, res) => {
    res.json({ status: "ok" });
});

// List all scripts
app.get('/api/scripts', (req, res) => {
    try {
        const stmt = db.prepare("SELECT id, title FROM scripts ORDER BY id DESC");
        const rows = stmt.all();
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get script by ID
app.get('/api/scripts/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }
        const stmt = db.prepare("SELECT * FROM scripts WHERE id = ?");
        const row = stmt.get(id);
        if (!row) {
            return res.status(404).json({ error: "Script not found" });
        }
        res.json(row);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create new script
app.post('/api/scripts', (req, res) => {
    try {
        const title = (req.body.title || "Untitled").trim();
        const content = req.body.content || "";
        const settings = req.body.settings || {};

        if (!content.trim()) {
            return res.status(400).json({ error: "Script content cannot be empty" });
        }

        const stmt = db.prepare("INSERT INTO scripts (title, content, settings) VALUES (?, ?, ?)");
        const result = stmt.run(title, content, JSON.stringify(settings));
        res.json({ id: Number(result.lastInsertRowid) });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update script
app.put('/api/scripts/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }
        
        const title = (req.body.title || "Untitled").trim();
        const content = req.body.content || "";
        const settings = req.body.settings || {};

        if (!content.trim()) {
            return res.status(400).json({ error: "Script content cannot be empty" });
        }

        // Verify script exists
        const checkStmt = db.prepare("SELECT id FROM scripts WHERE id = ?");
        const row = checkStmt.get(id);
        if (!row) {
            return res.status(404).json({ error: "Script not found" });
        }

        const updateStmt = db.prepare("UPDATE scripts SET title = ?, content = ?, settings = ? WHERE id = ?");
        updateStmt.run(title, content, JSON.stringify(settings), id);
        res.json({ updated: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete script
app.delete('/api/scripts/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }

        const stmt = db.prepare("DELETE FROM scripts WHERE id = ?");
        const result = stmt.run(id);
        
        if (result.changes === 0) {
            return res.status(404).json({ error: "Script not found" });
        }

        res.json({ deleted: Number(result.changes) });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- SERVER START & GRACEFUL SHUTDOWN ---
const PORT = process.env.PORT || 3000;
const serverInstance = server.listen(PORT, () => {
    console.log(`Prompter Server running on port ${PORT}`);
});

function shutdown() {
    console.log('Shutting down server gracefully...');
    serverInstance.close(() => {
        console.log('HTTP server closed.');
        try {
            db.close();
            console.log('Database connection closed.');
            process.exit(0);
        } catch (e) {
            console.error('Error closing database:', e);
            process.exit(1);
        }
    });
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);