const Model = require('../utils/Model');

class Strava extends Model {
	constructor() {
		super('strava');
		return this.apiCollection;
	}
}

module.exports = Strava;
