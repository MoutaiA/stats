const fs = require('fs-extra');

class TokenFile {
	ensurePath() {
		// TODO: check if the dir is created, if not create it

		console.log('The file did not exists, and has been created');
		fs.createFileSync(this.filename);
		const data = JSON.stringify(
			{
				[`${this.apiName}_ACCESS_TOKEN`]: '',
				[`${this.apiName}_REFRESH_TOKEN`]: '',
			},
			null,
			2
		);
		fs.writeFileSync(this.filename, data);
	}

	write(envVarName, value) {
		// TODO: rendre modulable pour tous les env var
		const file = require(`${__dirname}/../${this.filename}`);

		file[`${this.apiName}_ACCESS_TOKEN`] = accessToken;
		file[`${this.apiName}_REFRESH_TOKEN`] = refreshToken;

		fs.writeFile(this.filename, JSON.stringify(file, null, 2));
	}
}

module.exports = TokenFile;
