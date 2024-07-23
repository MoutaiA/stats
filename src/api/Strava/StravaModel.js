const Model = require('../utils/Model');

class StravaModel extends Model {
	constructor() {
		super('strava');
	}
}

module.exports = new StravaModel();
