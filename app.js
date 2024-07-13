const express = require('express');
const Strava = require('./src/StravaAPI');
const RefreshToken = require('./src/RefreshToken');
const ComputationService = require('./src/ComputationService');

const app = express();

(async () => {
	try {
		const strava = new Strava();
		const refresher = new RefreshToken(strava, 'STRAVA', 5000);
		refresher.updateToken();

		// const activities = await strava.getData();
		// const calculator = new RunningCalculator(activities);
		// const computedData = calculator.compute(activities);
		//mailer.send(computedData);
	} catch (e) {
		console.error(e);
	}
})();

module.exports = app;
