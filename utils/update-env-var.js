const EnvVarUpdater = require('../src/EnvVarUpdater');
const RedisClient = require('../src/RedisClient');

const updateEnvironmentVariable = async (envVarName, value) => {
	const file = EnvVarUpdater();
	const redisClient = new RedisClient();

	await file.ensurePath(envVarName);
	await redisClient.ensureServerStarted();

	file.write(envVarName, value);
	redisClient.update(envVarName, value);
};

module.exports = {
	updateEnvironmentVariable
}