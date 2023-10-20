const express = require('express');
const apiRoutes = require('./routes/apiroutes');
const htmlRoutes = require('./routes/htmlroutes');

// this initializes the app and creates a port for the server
const app = express();
const PORT = process.env.PORT || 3001;

//middleware and parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// this starts the server in the port selected above
app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));
