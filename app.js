const express = require('express');
const cors = require('cors');

const app = express();

const stravaController = require('./src/api/Strava/StravaController');

const { logRequest } = require('./utils/logger');

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
	res.on('finish', () => {
		logRequest(req, res);
	});
	next();
});

app.use('/api/strava', stravaController);

module.exports = app;
