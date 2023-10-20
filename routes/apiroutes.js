const fs = require('fs');
const path = require('path');
const uuid = require('../helpers/uuid');
const apiRoutes = require('express').Router();

//this pulls exisiting data from db.json, this is used in concert with a fetch function on the front end to render previously saved notes
apiRoutes.get('/notes', (req, res) => {
    console.info(`${req.method} request received for notes`);
    fs.readFile(path.join(__dirname, '../db/db.json'), "utf8", (err, data) => {
        if (err) {
            console.log(err);
        }
        const dbData = JSON.parse(data);
        res.json(dbData);
    });
})

// this takes new note enties and adds them to db.json
apiRoutes.post('/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    const { title, text, id } = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid(), //assigns a random, unique number value
        };
        const noteString = JSON.stringify(newNote);
        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if (err) {
                console.log(err);
            } else {
                const note = JSON.parse(data);
        note.push(newNote);
        fs.writeFile(`db/db.json`, JSON.stringify(note, null, 2), (err) => {
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

// apiRoutes.delete('notes/:id', (req, res) => {
    
// });

module.exports = apiRoutes;
