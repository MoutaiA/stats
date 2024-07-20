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

	async refreshToken() {
		throw new Error('To implement in concrete');
	}
}

module.exports = APIService;
