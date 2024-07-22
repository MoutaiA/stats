const dayjs = require('dayjs');
const chalk = require('chalk');

const METHODS_COLORS = {
	GET: '#00FF00',
	POST: '#a9ab30',
	PUT: '#0059b3',
	PATCH: '#6e2af7',
	DELETE: '#FF0000',
};

const STATUS_CODE_COLORS = {
	2: '#00FF00',
	3: '#FFFF00',
	4: '#FFA500',
	5: 'FF0000',
};

const logRequest = ({ method, url }, { statusCode }) => {
	const now = dayjs().format('YYYY-MM-DD HH:SS:mm:ms');
	const printMethod = chalk.hex(METHODS_COLORS[method]);
	const printStatusCode = chalk.hex(STATUS_CODE_COLORS[statusCode.toString()[0]]);
	console.log(
		`${chalk.green(`[${now}]`)}: ${printMethod(method)} ${chalk.white(url)} ${printStatusCode(statusCode)}`
	);
};

module.exports = {
	logRequest,
};
