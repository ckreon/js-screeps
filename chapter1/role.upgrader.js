var roleUpgrader = {

	/** @param {Creep} creep **/
	run: function(creep) {

		if (creep.memory.harvesting) {
			var sources = creep.room.find(FIND_SOURCES);
			var energy = creep.pos.findInRange(FIND_DROPPED_ENERGY, 3);

			if (energy.length) {
				creep.pickup(energy[0]);
			}

			if (!creep.memory.source) {
				for (source in sources) {
					if (_.filter(Game.creeps, (creep) =>
							(creep.memory.source == source)
					).length < 4) {
						creep.memory.source = source;
					}
				}
			}
			if (creep.harvest(sources[creep.memory.source]) == ERR_NOT_IN_RANGE) {
				creep.moveTo(sources[creep.memory.source]);
			}
			else if (creep.carry.energy == creep.carryCapacity) {
				creep.say('Upgrading');
			  creep.memory.harvesting = false;
			}
		}
		else {
			if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
				creep.moveTo(creep.room.controller);
			}
			if (creep.carry.energy == 0) {
				creep.say('Harvesting');
			  creep.memory.harvesting = true;
			}
		}

	} // function

}; // roleUpgrader

module.exports = roleUpgrader;