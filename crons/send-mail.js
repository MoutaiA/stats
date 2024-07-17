const Strava = require('../src/StravaAPI');
const ComputationService = require('../src/ComputationService');
const Mialer = require('../src/Mailer');


const update = async () => {
	// TODO: split data update from sending email (next version)

	// const strava = new Strava();
	// const activities = await strava.getData();
	// const calculator = new RunningCalculator(activities);
	// const computedData = calculator.compute(activities);
	//mailer.send(computedData);
};

module.exports = update;
