const fetch = require('node-fetch');

const BASE_URL = 'https://www.strava.com/api/v3';
const options = {
	headers: {
		Authorization: `Bearer ${process.env.STRAVA_ACCESS_TOKEN}`,
	},
};

const getActivites = async (before, after) => {
	const URL = encodeURI(`${BASE_URL}/athlete/activites?before=${before}&after=${after}`);
	return fetch(URL, options).then((res) => res.json());
};

module.exports = {
	getActivites,
};
