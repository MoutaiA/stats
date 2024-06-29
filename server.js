const dayjs = require('dayjs');
const chalk = require('chalk');

const app = require('./app');

const port = process.env.PORT || 3000;
const now = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss');

app.listen(port, () =>
	console.log(`[${chalk.green(now)}][${chalk.yellow('INFO')}]: Server started on port ${chalk.hex('#f08f56')(port)}!`)
);
