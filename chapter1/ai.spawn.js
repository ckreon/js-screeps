// BUILDERS
module.exports.builders = function() {
	var builder_count = _.filter(Game.creeps, (creep) =>
												(creep.memory.role == 'builder'));
	if (builder_count.length < 3) {
		var newName = Game.spawns['Spawn1'].createCreep(
			[WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE],
			undefined,
			{ role: 'builder', harvesting: 'true' });

		console.log('Spawning new Builder: ' + newName);
	}
}

// HARVESTERS
module.exports.harvesters = function() {
	var harvester_count = _.filter(Game.creeps, (creep) =>
													(creep.memory.role == 'harvester'));
	if (harvester_count.length < 3) {
		var newName = Game.spawns['Spawn1'].createCreep(
			[WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE],
			undefined,
			{ role: 'harvester', harvesting: 'true' });

		console.log('Spawning new Harvester: ' + newName);
	}
}

// HAULERS
module.exports.haulers = function() {
	var hauler_count = _.filter(Game.creeps, (creep) =>
											 (creep.memory.role == 'hauler'));
	if (hauler_count.length < 1) {
		var newName = Game.spawns['Spawn1'].createCreep(
			[CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
			undefined,
			{ role: 'hauler', harvesting: 'true' });

		console.log('Spawning new Hauler: ' + newName);
	}
}

// HEALERS
module.exports.healers = function() {
	var healer_count = _.filter(Game.creeps, (creep) =>
											 (creep.memory.role == 'healer'));
	if (healer_count.length < 1) {
		var newName = Game.spawns['Spawn1'].createCreep(
			[WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE],
			undefined,
			{ role: 'healer', harvesting: 'true' });

		console.log('Spawning new Healer: ' + newName);
	}
}

// UPGRADERS
module.exports.upgraders = function() {
	var upgrader_count = _.filter(Game.creeps, (creep) =>
												 (creep.memory.role == 'upgrader'));
	if (upgrader_count.length < 2) {
		var newName = Game.spawns['Spawn1'].createCreep(
			[WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE],
			undefined,
			{ role: 'upgrader', harvesting: 'true' });

		console.log('Spawning new Upgrader: ' + newName);
	}
}