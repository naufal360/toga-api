const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

const app = express();

// Endpoint
const medikasiRoute = require('./routes/medikasiRoute');
const tanamanRoute = require('./routes/tanamanRoute');

// Configure dotenv
dotenv.config();

// Configure database
require('./database/mongodb');

// Port and Path
const PORT = process.env.PORT || 3000;
const BASE = '/api';
const appendUrl = (url) => `${BASE}${url}`;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configure ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Router
app.use(appendUrl('/tanaman'), tanamanRoute);
app.use(appendUrl('/medikasi'), medikasiRoute);

// Endpoint index
app.use('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => console.log(`Listening on port http://localhost:${PORT}`));
