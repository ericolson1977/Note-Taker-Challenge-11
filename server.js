const express = require('express');
const htmlRoutes = require('./routes/htmlroutes');
const apiRoutes = require('./routes/apiroutes');
const path = require('path');
const fs = require('fs')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// app.use('/api', apiRoutes);
// app.use('/', htmlRoutes);

app.get('/notes', (req, res) => {
    console.log('GET request for /notes received');
  res.sendFile(path.join(__dirname, './public/notes.html'))
});

app.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received for notes`);
    fs.readFile(path.join(__dirname, './db/db.json'), "utf8", (err, data) => {
        if (err) {
            console.log(err);
        }
        const dbData = JSON.parse(data);
        res.json(dbData);
    })
})

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
        };
        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if (err) {
                console.log(err);
            } else {
                const note = JSON.parse(data);
                note.push(newNote);
                fs.writeFile(path.join(__dirname, './db/db.json'), JSON.stringify(note, null, 2), (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ error: 'Failed to write data.' });
                    }
                    console.log(`New note has been written to JSON file`);
                    res.json(newNote);
                });
            }
        });
    } else {
        res.status(400).json({ error: 'Title and text are required.' });
    }
});

// // htmlRoutes.get('*', (req, res) => {
// //     console.log('GET request for * (catch-all) received');
// //   res.sendFile(path.join(__dirname, '../public/index.html'))
// // });

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
