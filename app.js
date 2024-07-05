const express = require('express');
const Strava = require('./src/Strava');
const Mailer = require('./src/Mailer');

const app = express();

(async () => {
	try {
		const strava = new Strava();
		const activities = await strava.getData();
		const computedData = strava.computedData(activities);
		//mailer.send(computedData);
	} catch (e) {
		console.error(e);
	}
})();

module.exports = app;
