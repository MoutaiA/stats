const { createClient } = require('redis');

class RedisClient {
	constructor(options) {
		if (RedisClient.instance) {
			return RedisClient.instance;
		}

		this.client = createClient(options);
		RedisClient.instance = this.client;
	}

	async init() {
		return new Promise(async (resolve, reject) => {
			this.client.on('error', (err) => {
				console.error('Redis Client Error', err);
				reject(err);
			});

			this.client.on('connect', () => {
				console.log('Connected to the redis server');
				resolve();
			});

			await this.client.connect();
			return this.client;
		});
	}
}

module.exports = RedisClient;
