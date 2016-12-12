var roleHarvester = require('role.harvester');
var roleUpgrader  = require('role.upgrader');
var roleBuilder   = require('role.builder');

module.exports.loop = function () {
	var harvesters = _.filter(Game.creeps, (creep) =>
																					creep.memory.role == 'harvester');
	var upgraders = _.filter(Game.creeps, (creep) =>
																					creep.memory.role == 'upgrader');
	var tower = Game.getObjectById('b13b7df56b3c5e8fcaa93300');

	// tower logic
	if (tower) {
		// repair nearby damaged structures (closest first)
		var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, { filter: (structure) => structure.hits < structure.hitsMax });
		if (closestDamagedStructure) {
			tower.repair(closestDamagedStructure);
		}

		// attack nearby hostile units (closest first)
		var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
		if (closestHostile) {
			tower.attack(closestHostile);
		}
	}

	// log various stats to console each tick
	console.log('Harvesters: '+harvesters.length);
	for (var name in Game.rooms) {
		console.log(
			'Room "'+name+'" has '+Game.rooms[name].energyAvailable+' energy');
	}

	// clear old creeps from memory
	for (var name in Memory.creeps) {
		if (!Game.creeps[name]) {
			delete Memory.creeps[name];
			console.log('Clearing old creeps from memory: ', name);
		}
	}

	// spawn harvesters if there are less than 2
	if (harvesters.length < 2) {
		var newName = Game.spawns['Spawn1'].createCreep(
			[WORK, CARRY, MOVE, MOVE], undefined, { role: 'harvester' } );
		console.log('Spawning new harvester: '+newName);
	}

	// spawn upgraders if there are less than 1
	if (upgraders.length < 1) {
		var newName = Game.spawns['Spawn1'].createCreep(
			[WORK, CARRY, MOVE, MOVE], undefined, { role: 'upgrader' } );
		console.log('Spawning new upgrader: ' +newName);
	}

	// iterate through all creeps and assign roles
	for (var name in Game.creeps) {
		var creep = Game.creeps[name];

		if (creep.memory.role == 'harvester') {
			roleHarvester.run(creep);
		}
		if (creep.memory.role == 'upgrader') {
			roleUpgrader.run(creep);
		}
		if (creep.memory.role == 'builder') {
			roleBuilder.run(creep);
		}
	}

} // main loop