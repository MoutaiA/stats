const fs = require('fs-extra');

const RedisClient = require('../src/RedisClient');

const updateEnvironmentVariable = async (apiName, environmentVariables) => {
	updateFile(apiName, environmentVariables);

	const connector = new RedisClient();
	await connector.init();
	const client = connector.client;

	for (const [key, value] of Object.entries(environmentVariables)) {
		client.set(key, value);
	}
};

function updateFile(apiName, variables) {
	const BASE_PATH = `${__dirname}/../data`;
	const filename = `${apiName.toUpperCase()}_ENVIRONMENT_VARIABLE.json`;
	const filepath = `${BASE_PATH}/${filename}`;

	fs.ensureFile(filepath)
		.then(() => {
			const data = {};
			for (const [key, value] of Object.entries(variables)) {
				data[key] = value;
			}

			const parsedData = JSON.stringify(data, null, 4);
			return fs.writeFile(filepath, parsedData);
		})
		.catch((err) => console.error(`Error while creating file`, err));
}

updateEnvironmentVariable('strong', { 'bench-press': '85kg' });

/* module.exports = {
	updateEnvironmentVariable,
	updateFile,
}; */
