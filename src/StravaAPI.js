const fetch = require('node-fetch');

class Strava {
	constructor() {
		this.baseUrl = 'https://www.strava.com/api/v3';
		this.accessToken = process.env.STRAVA_ACCESS_TOKEN;
	}

	async getData() {
		const before = new Date();
		const mondayLastWeek = new Date();
		const after = mondayLastWeek.setDate(mondayLastWeek.getDate() - 14);

		const activities = await this.getActivities(before, after);
		const detailedActivities = await this.getDetailsActivities(activities);
		return this.#compute(this.#format(detailedActivities));
	}

	async getActivities(before, after) {
		const URL = encodeURI(`${this.baseUrl}/athlete/activites?before=${before}&after=${after}`);
		let result = await fetch(URL, this.#getOptions());
		result = await result.json();
		if (result?.errors?.length) {
			const { message } = result;
			throw new Error(`An error occurred: ${message}`);
		}
		return result;
	}

	#getOptions() {
		return {
			headers: {
				Authorization: `Bearer ${this.accessToken}`,
			},
		};
	}

	#format(data) {
		if (!data || data.length === 0) {
			return [];
		}

		const results = [];
		for (const el of data) {
			results.push({
				id: el.id,
				distance: el.distance,
				moving_time: el.moving_time,
				calories: el.calories
			});
		}
		return results;
	}

	async getDetailsActivities(activities) {
		const results = [];
		for (const activity of activities) {
			const detailedActivity = await this.getActivity(activity);
			results.push(detailedActivity);
		}
		return results;
	}

	async getActivity(id) {
		const URL = encodeURI(`${this.baseUrl}/activities/${id}`);
		let activity = await fetch(URL, this.#getOptions());
		if (!activity) {
			return {};
		}
		activity = await activity.json();
		return activity;
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
			//TODO: Improve to create an object: { total, runs, weights }
			workoutNumber: activities.length,
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
			distance: this.#convertToKM(distance),
			moving_time: this.#convertToDate(moving_time),
		};

		return result;
	}

	#convertToKM(distance) {
		if (distance <= 0) {
			return `0km`;
		}
		const kms = parseFloat(distance / 100).toFixed(2);
		return `${kms}km`;
	}

	#convertToDate(timeSum) {
		if (timeSum <= 0) {
			return 'No runs this week';
		}
		timeSum = Number(timeSum);
		const hours = Math.floor(timeSum / 3600);
		const minutes = Math.floor((timeSum % 3600) / 60);
		const seconds = Math.floor((timeSum % 3600) % 60);
		let date = `${minutes}m${seconds}s`;
		if (hours > 0) {
			date = `${hours}h${date}`;
		}
		return date;
	}
}

module.exports = Strava;