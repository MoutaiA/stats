const nodemailer = require('nodemailer');

class Mailer {
	constructor() {
		this.user = process.env.MAIL_USER;
		this.transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 465,
			secure: true,
			auth: {
				user: this.user,
				pass: process.env.MAIL_PASSWORD,
			},
		});
	}

	sendMail(data) {
		return this.transporter
			.sendMail({
				from: this.user,
				to: this.user,
				subject: 'Review ✔',
				text: data,
				html: `<b>${data}</b>`,
			})
			.then((info) => console.log(`Message sent: ${info}`))
			.catch((er) => console.error(er));
	}
}

module.exports = Mailer;
