// // const express = require('express');
// const fs = require('fs');
// const path = require('path');
// const apiRoutes = require('express').Router();

// apiRoutes.get('/api/notes', (req, res) => {
//     console.info(`${req.method} request received for notes`);
//     fs.readFile(path.join(__dirname, '../db/db.json'), "utf8", (err, data) => {
//         if (err) {
//             console.log(err);
//         }
//         const dbData = JSON.parse(data);
//         res.json(dbData);
//     })
// })

// apiRoutes.post('/api/notes', (req, res) => {
//     console.info(`${req.method} request received to add a note`);
//     const { title, text } = req.body;
//     if (title && text) {
//         const newNote = {
//             title,
//             text,
//         };
//         fs.readFile("../db/db.json", "utf8", (err, data) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 const note = JSON.parse(data);
//                 note.push(newNote);
//                 fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(note, null, 2), (err) => {
//                     if (err) {
//                         console.error(err);
//                         return res.status(500).json({ error: 'Failed to write data.' });
//                     }
//                     console.log(`New note has been written to JSON file`);
//                     res.json(newNote);
//                 });
//             }
//         });
//     } else {
//         res.status(400).json({ error: 'Title and text are required.' });
//     }
// });

// module.exports = apiRoutes;
