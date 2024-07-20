const express = require('express');
const router = express.Router();

router.get('/ping', (req, res) => {
	try {
		res.status(200).send('pong');
	} catch (e) {
		console.error('The following error occurred when trying to call the route /api/strava/ping');
		res.status(500).json({ message: e.message });
	}
});

router.get('/client-id', (req, res) => {
	res.json({ clientID: process.env.STRAVA_CLIENT_ID });
});

router.get('/exchange_token', (req, res) => {
	const { code } = req.query;
	updateEnvironmentVariable('strava', { STRAVA_CODE: code })
		.then(() => res.end())
		.catch((err) => {
			console.error(err);
			res.end();
		});
});

module.exports = router;
