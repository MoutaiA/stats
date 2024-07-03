const fetch = require('node-fetch');
const dayjs = require('dayjs');

class Strava {
	constructor() {
		this.baseUrl = 'https://www.strava.com/api/v3';
		this.accessToken = process.env.STRAVA_ACCESS_TOKEN;
	}

	async getData() {
		const before = new Date();
		// the CRON JOB is run every sunday at night => so we need to get the last 2 weeks activities => today - 14
		const mondayLastWeek = new Date();
		const after = mondayLastWeek.setDate(mondayLastWeek.getDate() - 14);

		const activities = await this.getActivities(before, after);
		return this.#compute(activities);
	}

	async getActivities(before, after) {
		const URL = encodeURI(`${this.baseUrl}/athlete/activites?before=${before}&after=${after}`);
		let result = await fetch(URL, this.#getOptions());
		result = await result.json();
		return this.#format(result);
	}

	#getOptions() {
		return {
			headers: {
				Authorization: `Bearer ${this.accessToken}`,
			},
		};
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

	#compute(activities) {
		let distance = 0;
		let moving_time = 0;

		for (const activity of activities) {
			distance += activity.distance;
			moving_time += activity.moving_time;
		}

		return {
			distance,
			moving_time,
		};
	}

	computeRunning(runs) {
		const { moving_time, distance } = runs.reduce((accumulator, current) => {
			return {
				distance: accumulator.distance + current.distance,
				moving_time: accumulator.moving_time + current.moving_time,
			};
		});
		const result = {
			distance,
			moving_time: this.#convertToDate(moving_time),
		};

		return result;
	}

	#convertToDate(timeSum) {
		if (timeSum === 0) {
			return 0;
		}
		return new dayjs(timeSum / 3600).format('HH:MM:ss');
	}
}

module.exports = Strava;
