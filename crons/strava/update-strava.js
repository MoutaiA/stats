const StravaService = require('../../src/api/Strava/StravaService');
const fakeData = require('./fakeData');

const IS_DEBUG_MODE = process.env.DEBUG_MODE ?? false;

function updateStravaCollection() {
	const data = IS_DEBUG_MODE ? fakeData : StravaService.getActivities;
	return data().then((res) => StravaService.insert(res));
}

updateStravaCollection()
	.then(() => console.log('The collection has been successfully updated'))
	.catch((e) => console.error('An error occurred: ', e))
	.finally(() => process.exit());
