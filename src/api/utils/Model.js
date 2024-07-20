const EventEmitter = require('node:events');
const { MongoClient } = require('mongodb');

const DB_HOST = process.env.DB_HOST ?? 'localhost';
const DB_PORT = process.env.DB_PORT ?? '27017';
const DB_NAME = process.env.DB_NAME ?? 'stats';
const uri = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

class Model extends EventEmitter {
	constructor(collection) {
		this.db = new MongoClient(uri);
		this.collection = this.db.collection(collection);
		this.credentials = this.db.collection('credentials');

		this.db.on('error', () => {
			console.error('An error occurred, the connection to the db has been closed');
			this.db.close();
		});
	}
}

module.exports = Model;
