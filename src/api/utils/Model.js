const EventEmitter = require('node:events');
const { MongoClient } = require('mongodb');

const DB_HOST = process.env.DB_HOST ?? 'localhost';
const DB_PORT = process.env.DB_PORT ?? '27017';
const DB_NAME = process.env.DB_NAME ?? 'stats';
const uri = `mongodb://${DB_HOST}:${DB_PORT}/}`;

class Model extends EventEmitter {
	constructor(collection) {
		super();
		this.client = new MongoClient(uri);
		this.db = this.client.db(DB_NAME);
		this.credentials = this.db.collection('credentials');
		this.apiCollection = this.db.collection(collection);
	}

	async init() {
		try {
			// const toto = await this.client.connect();
			// console.log('IS COL IN DB', 'collection' in this.client.db);
			// console.log('IS COL IN TOTO', 'collection' in toto);
			// this.collection = this.client.collection(this.serviceCollection);
			// console.log(`Connected to MongoDB, collection: ${this.serviceCollection}`);
			// this.emit('ready');
			return this;
		} catch (error) {
			console.error('Error connecting to MongoDB', error);
			this.emit('error', error);
		}
	}
}

module.exports = Model;
