const express = require('express');
const cors = require('cors');

const app = express();

const stravaController = require('./src/api/Strava/StravaController');

app.use(cors());
app.use(express.json());

app.use('/api/strava', stravaController);



module.exports = app;
