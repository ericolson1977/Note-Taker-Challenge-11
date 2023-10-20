const path = require('path');
const htmlRoutes = require('express').Router();

//routes the url path ending /notes to the ntoes .html page
htmlRoutes.get('/notes', (req, res) => {
    console.log('GET request for /notes received');
  res.sendFile(path.join(__dirname, '../public/notes.html'))
});

// wildcard that routes the url path ending in anything other thatn /notes to the index.html page
htmlRoutes.get('*', (req, res) => {
    console.log('GET request for * (catch-all) received');
  res.sendFile(path.join(__dirname, '../public/index.html'))
});

module.exports = htmlRoutes;