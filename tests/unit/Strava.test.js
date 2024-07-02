const Strava = require('../../src/Strava');
const mockData = require('./data/getActivities');
const fetch = require('node-fetch');

jest.mock('node-fetch', () => jest.fn());

describe('Mock implementation of getActivities', () => {
	beforeAll(() => {
		fetch.mockImplementation(() =>
			Promise.resolve({
				json: () => Promise.resolve(mockData),
			})
		);
	});

	test('Format the result', async () => {
		const expected = [
			{
				id: 154504250376823,
				distance: 24931.4,
				moving_time: 4500,
			},
			{
				id: 1234567809,
				distance: 23676.5,
				moving_time: 5400,
			},
		];
		const strava = new Strava();

		const result = await strava.getActivities(1, 2);

		expect(result).toEqual(expected);
	});
});
