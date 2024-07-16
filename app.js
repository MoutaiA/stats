const express = require('express');
const cors = require('cors');

const Strava = require('./src/StravaAPI');
const RefreshToken = require('./src/RefreshToken');
const ComputationService = require('./src/ComputationService');

const app = express();
const run = async () => {
	const strava = new Strava(process.env.STRAVA_CODE);
	// const refresher = new RefreshToken(strava, 'STRAVA', 5000);
	// refresher.updateToken();
	// const activities = await strava.getData();
	// const calculator = new RunningCalculator(activities);
	// const computedData = calculator.compute(activities);
	//mailer.send(computedData);
};

app.use(cors());
app.use(express.json());

app.get('/api/client-id', (req, res) => {
	res.json({ clientID: process.env.STRAVA_CLIENT_ID });
});

app.get('/exchange_token', (req, res) => {
	const { code } = req.query;
	Strava.setClientCode(code);
	res.end();
});

(async () => {
	try {
	} catch (e) {
		console.error(e);
	}
})();

module.exports = app;
