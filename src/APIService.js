/**
 * @interface
 */
class APIService {
	constructor(name, baseUrl, refreshTime) {
		if (new.target === APIService) {
			throw new Error('Cannot instantiate an interface');
		}

		this.name = name;
		this.baseUrl = baseUrl;
		this.refreshTime = refreshTime;
	}

	/**
	 * @param {String} accessToken
	 */
	set accessToken(accessToken) {
		this.accessToken = accessToken;
	}

	/**
	 * @param {String} refreshToken
	 */
	set refreshToken(refreshToken) {
		this.refreshToken = refreshToken;
	}
}

module.exports = APIService;
