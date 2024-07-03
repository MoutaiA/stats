const express = require('express');
const Strava = require('./src/Strava');
const Calculator = require('./src/Calculator');
const Mailer = require('./src/Mailer');

const app = express();

(async () => {
	const strava = new Strava();
	const activities = await strava.getData();
	const computedData = strava.computedData(activities);
	//mailer.send(computedData);
})();

module.exports = app;
