const fs = require('fs-extra');

class TokenFile {
	constructor(apiName) {
		this.apiName = apiName;
		this.filename = `data/${apiName}_TOKEN.json`;
		this.isFile = fs.pathExistsSync(this.filename);
	}

	createFile() {
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

	updateToken(accessToken, refreshToken) {
		const file = require(`${__dirname}/../${this.filename}`);

		file[`${this.apiName}_ACCESS_TOKEN`] = accessToken;
		file[`${this.apiName}_REFRESH_TOKEN`] = refreshToken;

		fs.writeFile(this.filename, JSON.stringify(file, null, 2));
	}
}

module.exports = TokenFile;
