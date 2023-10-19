// const express = require('express');
const path = require('path');
const htmlRoutes = require('express').Router();

htmlRoutes.get('/notes', (req, res) => {
    console.log('GET request for /notes received');
  res.sendFile(path.join(__dirname, '../public/notes.html'))
});

htmlRoutes.get('*', (req, res) => {
    console.log('GET request for * (catch-all) received');
  res.sendFile(path.join(__dirname, '../public/index.html'))
});

module.exports = htmlRoutes;