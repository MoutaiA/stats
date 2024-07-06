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
			workoutNumber: 2,
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
			const strava = new Strava();

			const { distance, moving_time } = strava.computeRunning(mockedData);

			expect(distance).toEqual(`4.58km`);
			expect(moving_time).toEqual(`8h58m19s`);
		});

		test('0 km', () => {
			const mockedData = [
				{
					distance: 0,
					moving_time: 0,
				},
				{
					distance: 0,
					moving_time: 0,
				},
			];
			const strava = new Strava();

			const { distance, moving_time } = strava.computeRunning(mockedData);

			expect(distance).toEqual(`0km`);
			expect(moving_time).toEqual(`No runs this week`);
		});

		test('Less than an hour', () => {
			const mockedData = [
				{
					moving_time: 300,
				},
				{
					moving_time: 2000,
				},
			];
			const strava = new Strava();

			const { moving_time } = strava.computeRunning(mockedData);

			expect(moving_time).toEqual(`38m20s`);
		});

		test('Should tell the number of workout done in the week', async () => {
			const mockedData = [
				{
					distance: 1000,
					moving_time: 1000,
					id: 1000,
				},
				{
					distance: 999,
					moving_time: 999,
					id: 999,
				},
				{
					distance: 500,
					moving_time: 500,
					id: 500,
				},
			];
			fetch.mockImplementation(() =>
				Promise.resolve({
					json: () => Promise.resolve(mockedData),
				})
			);
			const strava = new Strava();

			const { workoutNumber } = await strava.getData();

			expect(workoutNumber).toBe(3);
		});
	});
});
