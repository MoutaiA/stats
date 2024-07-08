const nodemailer = require('nodemailer');

class Mailer {
	constructor() {
		this.service = 'gmail';
		this.user = process.env.MAIL_USER;
		this.password = process.env.MAIL_PASSWORD;

		this.transporter = nodemailer.createTransport({
			service: this.service,
			auth: {
				user: this.user,
				pass: this.password,
			},
		});
	}

	async send(data) {
		const mail = {
			from: 'your-email@gmail.com', // sender address
			to: 'recipient-email@example.com', // list of receivers
			subject: 'Test Email', // Subject line
			text: 'Hello, this is a test email from Node.js!', // plain text body
			// html: '<b>Hello, this is a test email from Node.js!</b>' // HTML body
		};
		return await this.transporter.sendMail(mail);
	}
}

module.exports = Mailer;
