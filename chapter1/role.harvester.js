var roleHarvester = {

	/** @param {Creep} creep **/
	run: function(creep) {

		if (creep.memory.harvesting) {
			var energy = creep.pos.findInRange(FIND_DROPPED_ENERGY, 3);

			if (energy.length < 1) {
				var sources = creep.room.find(FIND_SOURCES);

				if (!(creep.memory.source)) {
					if ((_.filter(Game.creeps, (creep) =>
						 	 				(creep.memory.role == 'harvester') &&
						 	 				(creep.memory.source == 1)
						 	 				).length) < 1) {
						creep.memory.source = 1;
					}
					else {
						creep.memory.source = 0;
					}
				}
				if (creep.harvest(sources[creep.memory.source]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(sources[creep.memory.source]);
				}
			}
			else {
				if (creep.pickup(energy[0]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(energy[0]);
				}
			}
			if (creep.carry.energy == creep.carryCapacity) {
				creep.say('HR Depositing');
			  creep.memory.harvesting = false;
			}
		}
		else {
			var targets = creep.pos.findInRange(FIND_STRUCTURES, 2, {
				filter: (structure) => {
					return (structure.structureType == STRUCTURE_CONTAINER);
				}
			});
			
			if (targets.length == 0) {
				var targets = creep.room.find(FIND_STRUCTURES, {
					filter: (structure) => {
						return (
							((structure.structureType == STRUCTURE_SPAWN) ||
							 (structure.structureType == STRUCTURE_EXTENSION)) &&
							 (structure.energy < structure.energyCapacity));
					}
				});
			}
			if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				creep.moveTo(targets[0]);
			}
			if (creep.carry.energy == 0) {
				creep.say('HR Harvesting');
			  creep.memory.harvesting = true;
			}
		}

	} // function

}; // roleHarvester

module.exports = roleHarvester;