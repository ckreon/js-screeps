var roles = {
	builder:		require('role.builder'),
	harvester:	require('role.harvester'),
	hauler:			require('role.hauler'),
	healer:			require('role.healer'),
	upgrader:		require('role.upgrader')
};

var structures = {
	tower:			require('structure.tower')
};

var ai = {
	spawn:			require('ai.spawn')
};

module.exports.loop = function () {

	// UTILITY

	// clear old creeps from memory
	for (var name in Memory.creeps) {
		if (!Game.creeps[name]) {
			delete Memory.creeps[name];
			console.log('Clearing old creeps from memory: ', name);
		}
	}
  
  // UNIT SPAWNING

	// spawn healers
	ai.spawn.healers();
	// spawn builders
	ai.spawn.builders();
	// spawn upgraders
	ai.spawn.upgraders();
	// spawn haulers
	//ai.spawn.haulers();
	// spawn harvesters
	ai.spawn.harvesters();

  // ASSIGN UNITS & STRUCTURES

	// iterate through all creeps and assign roles
	for (var name in Game.creeps) {
		var creep = Game.creeps[name];

		roles[creep.memory.role].run(creep);
	}
	// iterate through structures and assign roles
	for (var id in Game.structures) {
		var id = Game.structures[id];

		if (id.structureType == STRUCTURE_TOWER) {
			structures.tower.run(id);
		}

		//structures[id.structureType].run(id);
	}

} // main loop