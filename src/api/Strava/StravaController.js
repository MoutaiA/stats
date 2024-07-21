const express = require('express');
const router = express.Router();
const Service = require('./StravaService');

router.get('/ping', (req, res) => {
	try {
		res.status(200).send('pong');
	} catch (e) {
		console.error('The following error occurred when trying to call the route /api/strava/ping');
		res.status(500).json({ message: e.message });
	}
});

router.get('/client-id', (req, res) => {
	Service.getClientID()
		.then((clientID) => res.status(200).json(clientID))
		.catch((e) => res.status(500).json({ message: e.message }));
});

router.get('/exchange_token', (req, res) => {
	const { code } = req.query;
	Service.updateCredentials({ code })
		.then((result) => res.status(200).json({ message: result }))
		.catch((err) => {
			console.error(err);
			return res.status(500).json({ message: err.message });
		});
});

module.exports = router;
