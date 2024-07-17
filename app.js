const express = require('express');
const cors = require('cors');

const { updateEnvironmentVariable } = require('./utils/update-env-var');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/client-id', (req, res) => {
	res.json({ clientID: process.env.STRAVA_CLIENT_ID });
});

app.get('/exchange_token', (req, res) => {
	const { code } = req.query;
	updateEnvironmentVariable('STRAVA_CODE', code)
		.then(() => res.end())
		.catch((err) => {
			console.error(err);
			res.end();
		});
});

module.exports = app;
