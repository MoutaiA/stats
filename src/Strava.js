const fetch = require('node-fetch');

class Strava {
	constructor() {
		this.baseUrl = 'https://www.strava.com/api/v3';
		this.accessToken = process.env.STRAVA_ACCESS_TOKEN;
	}

	getOptions() {
		return {
			headers: {
				Authorization: `Bearer ${this.accessToken}`,
			},
		};
	}

	async getActivities(before, after) {
		const URL = encodeURI(`${this.baseUrl}/athlete/activites?before=${before}&after=${after}`);
		let result = await fetch(URL, this.getOptions());
		result = await result.json();
		return this.#format(result);
	}

	#format(data) {
		const results = [];
		for (const el of data) {
			results.push({
				id: el.id,
				distance: el.distance,
				moving_time: el.moving_time,
			});
		}
		return results;
	}
}

module.exports = Strava;
