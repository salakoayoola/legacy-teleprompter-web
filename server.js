var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var http = require('http');
var path = require('path');

var app = express();
var server = http.createServer(app);

// --- MIDDLEWARE ---
app.use(express.json());
app.use(express.static('web'));

// --- DATABASE ---
var dbPath = path.join(__dirname, 'data', 'scripts.db');
var db = new sqlite3.Database(dbPath);

// FULL PALE BLUE DOT SPEECH
var saganText = "Look again at that dot. That's here. That's home. That's us. On it everyone you love, everyone you know, everyone you ever heard of, every human being who ever was, lived out their lives. The aggregate of our joy and suffering, thousands of confident religions, ideologies, and economic doctrines, every hunter and forager, every hero and coward, every creator and destroyer of civilization, every king and peasant, every young couple in love, every mother and father, hopeful child, inventor and explorer, every teacher of morals, every corrupt politician, every \"superstar,\" every \"supreme leader,\" every saint and sinner in the history of our species lived there--on a mote of dust suspended in a sunbeam.\n\nThe Earth is a very small stage in a vast cosmic arena. Think of the rivers of blood spilled by all those generals and emperors so that, in glory and triumph, they could become the momentary masters of a fraction of a dot. Think of the endless cruelties visited by the inhabitants of one corner of this pixel on the scarcely distinguishable inhabitants of some other corner, how frequent their misunderstandings, how eager they are to kill one another, how fervent their hatreds.\n\nOur posturings, our imagined self-importance, the delusion that we have some privileged position in the Universe, are challenged by this point of pale light. Our planet is a lonely speck in the great enveloping cosmic dark. In our obscurity, in all this vastness, there is no hint that help will come from elsewhere to save us from ourselves.\n\nThe Earth is the only world known so far to harbor life. There is nowhere else, at least in the near future, to which our species could migrate. Visit, yes. Settle, not yet. Like it or not, for the moment the Earth is where we make our stand.\n\nIt has been said that astronomy is a humbling and character-building experience. There is perhaps no better demonstration of the folly of human conceits than this distant image of our tiny world. To me, it underscores our responsibility to deal more kindly with one another, and to preserve and cherish the pale blue dot, the only home we've ever known.\n\n— Carl Sagan, Pale Blue Dot, 1994";

db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS scripts (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT, settings TEXT)", function() {
        // EASTER EGG CHECK
        db.get("SELECT count(*) as count FROM scripts", function(err, row) {
            if (row && row.count === 0) {
                console.log("DB Empty... Injecting Sagan.");
                var stmt = db.prepare("INSERT INTO scripts (title, content, settings) VALUES (?, ?, ?)");
                stmt.run("Pale Blue Dot", saganText, "{}");
                stmt.finalize();
            }
        });
    });
});

// --- API ROUTES ---
app.get('/api/scripts', function(req, res) {
    db.all("SELECT id, title FROM scripts ORDER BY id DESC", [], function(err, rows) {
        if (err) return res.status(500).json({error: err.message});
        res.json(rows);
    });
});

app.get('/api/scripts/:id', function(req, res) {
    db.get("SELECT * FROM scripts WHERE id = ?", [req.params.id], function(err, row) {
        if (err) return res.status(500).json({error: err.message});
        res.json(row);
    });
});

app.post('/api/scripts', function(req, res) {
    var title = req.body.title;
    var content = req.body.content;
    var settings = req.body.settings;
    db.run("INSERT INTO scripts (title, content, settings) VALUES (?, ?, ?)", 
        [title, content, JSON.stringify(settings)], 
        function(err) {
            if (err) return res.status(500).json({error: err.message});
            res.json({id: this.lastID});
        }
    );
});

app.delete('/api/scripts/:id', function(req, res) {
    db.run("DELETE FROM scripts WHERE id = ?", req.params.id, function(err) {
        if (err) return res.status(500).json({error: err.message});
        res.json({deleted: this.changes});
    });
});

var PORT = 3000;
server.listen(PORT, function() {
    console.log('Prompter Server running on port ' + PORT);
});