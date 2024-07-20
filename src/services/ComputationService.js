class RunningCalculator {
	constructor(activities) {
		this.activities = activities;
	}

	compute() {
		let total_moving_time = 0;
		let total_distance = 0;
		let total_calories = 0;
		let workoutsNumber = 0;

		for (const activity of this.activities) {
			total_moving_time += activity.moving_time;
			total_distance += activity.distance;
			total_calories += activity.calories;
			workoutsNumber++;
		}

		return {
			total_moving_time,
			total_distance,
			total_calories,
			workoutsNumber,
		};
	}
}

module.exports = RunningCalculator;
