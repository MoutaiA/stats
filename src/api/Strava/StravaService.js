const fetch = require('node-fetch');
const I_API = require('../utils/I_API');
const StravaModel = require('./StravaModel');

const REFRESH_TOEKEN_TIME_IN_MS = process.env.DEBUG_MODE ? 5000 : 19_800_000;

class StravaService extends I_API {
	constructor() {
		super('STRAVA', 'https://www.strava.com/api/v3', REFRESH_TOEKEN_TIME_IN_MS);
		this.clientID = process.env.STRAVA_CLIENT_ID;
		this.clientSecret = process.env.STRAVA_CLIENT_SECRET;
		this.athleteID = process.env.STRAVA_ATHLETE_ID;
		this.code = process.env.STRAVA_CODE;
		this.accessToken = process.env.STRAVA_ACCESS_TOKEN;
		this.refreshToken = process.env.STRAVA_REFRESH_TOKEN;
	}
	async getRefreshToken() {
		const url = 'https://www.strava.com/oauth/token';
		const options = this.#getOptions();
		options.body = JSON.stringify({
			client_id: this.clientID,
			client_secret: this.clientSecret,
			grant_type: 'refresh_token',
			refresh_token: this.refreshToken,
		});
		options.method = 'post';

		await fetch(encodeURI(url), options)
			.then((res) => res.json())
			.then((res) => {
				console.log('res', res);
			});
	}

	async getData() {
		const before = new Date();
		const mondayLastWeek = new Date();
		const after = mondayLastWeek.setDate(mondayLastWeek.getDate() - 14);
		const rawActivities = await this.getActivities(before, after);
		const promises = [];
		for (const activity of rawActivities) {
			promises.push(this.getActivity(activity.id));
		}

		return await Promise.all(promises);
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

	async getActivity(id) {
		const URL = encodeURI(`${this.baseUrl}/activities/${id}`);
		let activity = await fetch(URL, this.#getOptions());
		if (!activity) {
			return {};
		}
		activity = await activity.json();
		return activity;
	}

	static setClientCode(code) {
		this.code = code;
		process.env.STRAVA_CODE = code;
	}

	async getClientID() {
		const query = {
			apiName: 'strava',
		};
		const projection = {
			_id: 0,
			code: 1,
		};
		return StravaModel.credentials.findOne(query, projection);
	}

	async updateCredentials(credentials) {
		const query = { apiName: 'strava' };
		const update = { $set: {} };
		for (const [key, value] of Object.entries(credentials)) {
			update['$set'][key] = value;
		}
		return StravaModel.credentials.updateOne(query, update);
	}
}

module.exports = new StravaService();
