/**
 * @interface
 */
class I_API {
	constructor(name, baseUrl, refreshTime) {
		if (new.target === I_API) {
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

module.exports = I_API;
