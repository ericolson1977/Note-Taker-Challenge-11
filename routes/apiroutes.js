const express = require('express');
const path = require('path');
const fs = require('fs');
const apiRoutes = express.Router();

apiRoutes.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received for notes`);
    fs.readFile("./db/db.json", "utf8",(err, data)=>{
        if(err){
          console.log(err);
        }
          const dbData = JSON.parse(data);
          res.json(dbData);
    })
})

// apiRoutes.post('/api/notes', (req, res) => {
//     console.info(`${req.method} request received to add a note`);
//     const { title, text } = req.body;

//     if (req.body) {
//         const newNote = {
//             title,
//             text,
//         };

//         readAndAppend(newNote, './db/db.json');
//         res.json(`Note added successfully`);
//     } else {
//         res.error('Error in adding note');
//     }
// });

module.exports = apiRoutes;