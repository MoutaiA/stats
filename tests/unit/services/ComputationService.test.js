const ComputationService = require('../../../src/services/ComputationService');
const runs = {
	'5k': require('../data/runs/5k.json'),
	'7k': require('../data/runs/7k.json'),
	'10k': require('../data/runs/10k.json'),
	'15k': require('../data/runs/15k.json'),
};

describe('Compute runs', () => {
	test('OK - basic', () => {
		const expected = {
			total_moving_time: 11188,
			total_distance: 37000,
			total_calories: 2748,
			workoutsNumber: 4,
		};
		const calculator = new ComputationService([runs['5k'], runs['7k'], runs['10k'], runs['15k']]);

		const result = calculator.compute();

		expect(expected).toEqual(result);
	});
});
