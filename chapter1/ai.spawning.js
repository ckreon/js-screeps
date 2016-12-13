var builders = {

	run: function() {
		var builder_count = _.filter(Game.creeps, (creep) =>
													(creep.memory.role == 'builder'));
		if (builder_count.length < 2) {
			var newName = Game.spawns['Spawn1'].createCreep(
				[WORK, CARRY, CARRY, MOVE, MOVE],
				undefined, { role: 'builder', harvesting: 'true' });

			console.log('Spawning new Builder: ' + newName);
		}
	} // function
}; // builders

var harvesters = {

	run: function() {
		var harvester_count = _.filter(Game.creeps, (creep) =>
														(creep.memory.role == 'harvester'));
		if (harvester_count.length < 2) {
			var newName = Game.spawns['Spawn1'].createCreep(
				[WORK, WORK, CARRY, MOVE],
				undefined, { role: 'harvester', harvesting: 'true' });

			console.log('Spawning new Harvester: ' + newName);
		}
	} // function
}; // harvesters

var haulers = {

	run: function() {
		var hauler_count = _.filter(Game.creeps, (creep) =>
												 (creep.memory.role == 'hauler'));
		if (hauler_count.length < 2) {
			var newName = Game.spawns['Spawn1'].createCreep(
				[CARRY, CARRY, CARRY, CARRY, MOVE, MOVE],
				undefined, { role: 'hauler', harvesting: 'true' });

			console.log('Spawning new Hauler: ' + newName);
		}
	} // function
}; // haulers

var healers = {

	run: function() {
		var healer_count = _.filter(Game.creeps, (creep) =>
												 (creep.memory.role == 'healer'));
		if (healer_count.length < 0) {
			var newName = Game.spawns['Spawn1'].createCreep(
				[WORK, CARRY, CARRY, MOVE, MOVE],
				undefined, { role: 'healer', harvesting: 'true' });

			console.log('Spawning new Healer: ' + newName);
		}
	} // function
}; // healers

var upgraders = {

	run: function() {
		var upgrader_count = _.filter(Game.creeps, (creep) =>
													 (creep.memory.role == 'upgrader'));
		if (upgrader_count.length < 1) {
			var newName = Game.spawns['Spawn1'].createCreep(
				[WORK, WORK, CARRY, MOVE],
				undefined, { role: 'upgrader', harveesting: 'true' });

			console.log('Spawning new Upgrader: ' + newName);
		}

	} // function
}; // upgraders

module.exports = builders;
module.exports = harvesters;
module.exports = haulers;
module.exports = healers;
module.exports = upgraders;