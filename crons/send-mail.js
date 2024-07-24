const StravaService = require('../src/api/Strava/StravaService');
const Mailer = require('../src/services/Mailer');

const sendMail = async () => {
	const [data] = await StravaService.getMailData();
	if (!data) {
		throw new Error('No data provided');
	}
	const mailer = new Mailer();
	mailer.sendMail(data);
	process.exit();
};

sendMail().catch((e) => {
	console.error(e);
	process.exit();
});
