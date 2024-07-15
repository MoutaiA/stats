const TokenFile = require('./TokenFile');

class RefreshToken {
	constructor(apiInstance) {
		this.api = apiInstance;
		this.tokenFile = new TokenFile(this.api.name);
	}

	/**
	 * @returns {void}
	 */
	async updateToken() {
		await this.api.getRefreshToken();
		if (!this.tokenFile.isFile) {
			this.tokenFile.createFile();
		}

		const { accessToken, refreshToken } = this.api;

		this.tokenFile
			.updateToken(accessToken, refreshToken)
			.catch((err) => console.error(`Updating file has failed: ${err}`));
	}
}

module.exports = RefreshToken;
