const Strava = require('../../src/Strava');
const mockData = require('./data/getActivities');
const fetch = require('node-fetch');

jest.mock('node-fetch', () => jest.fn());

describe('Mock getData', () => {
	beforeAll(() => {
		fetch.mockImplementation(() =>
			Promise.resolve({
				json: () => Promise.resolve(mockData),
			})
		);
	});

	test('getData', async () => {
		const expected = {
			distance: 48607.9,
			moving_time: 9900,
		};
		const strava = new Strava();

		const result = await strava.getData();

		expect(result).toEqual(expected);
	});

	describe('Mock implementation of getActivities', () => {
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
});

describe('Compute', () => {
	describe('Runs', () => {
		test('distance', () => {
			const mockedData = [
				{
					distance: 300.5,
					moving_time: 20000.0,
				},
				{
					distance: 157.7,
					moving_time: 12299.0,
				},
			];
			const expected = {
				distance: 458.2,
				moving_time: 32301.5,
			};
			const strava = new Strava();

			const { distance, moving_time } = strava.computeRunning(mockedData);

			expect(distance).toEqual(expected.distance);
			expect(moving_time).toEqual(`8h58s19`);
		});
	});
});
