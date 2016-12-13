var roles = {
	builder:	 require('role.builder'),
	harvester: require('role.harvester'),
	hauler:		 require('role.hauler'),
	healer:		 require('role.healer'),
	upgrader:	 require('role.upgrader')
};

var structures = {
	tower:		 require('structure.tower')
};

var ai = {
	spawning:	 require('ai.spawning')
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

	// spawn harvesters
	ai.spawning.harvesters();
	// spawn haulers
	//ai.spawning.haulers();
	// spawn upgraders
	ai.spawning.upgraders();
	// spawn builders
	ai.spawning.builders();
	// spawn healers
	//ai.spawning.healers();

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
			structure.tower.run(id);
		}

		//structures[id.structureType].run(id);
	}

} // main loop