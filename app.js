const express = require('express');
const cors = require('cors');

const Strava = require('./src/StravaAPI');
const RefreshToken = require('./src/RefreshToken');
const ComputationService = require('./src/ComputationService');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	res.json({ clientID: process.env.STRAVA_CLIENT_ID });
});

app.get('/exchange_token', (req, res) => {
	console.log(req.body);
	console.log(req.params);
	console.log(req.query);
	res.send('ok;');
});

(async () => {
	try {
		// const strava = new Strava();
		// const refresher = new RefreshToken(strava, 'STRAVA', 5000);
		// refresher.updateToken();
		// const activities = await strava.getData();
		// const calculator = new RunningCalculator(activities);
		// const computedData = calculator.compute(activities);
		//mailer.send(computedData);
	} catch (e) {
		console.error(e);
	}
})();

module.exports = app;
