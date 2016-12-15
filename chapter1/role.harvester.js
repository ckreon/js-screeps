var roleHarvester = {

	/** @param {Creep} creep **/
	run: function(creep) {

		if (creep.memory.harvesting) {
			var sources = creep.room.find(FIND_SOURCES);

			if (_.filter(Game.creeps, (creep) =>
				 	 				(creep.memory.role == 'harvester') &&
				 	 				(creep.memory.source == 0)
				 	 				).length < 2) {
				creep.memory.source = 0;
			}
			else {
				creep.memory.source = 1;
			}
			if (creep.harvest(sources[creep.memory.source]) == ERR_NOT_IN_RANGE) {
				creep.moveTo(sources[creep.memory.source]);
			}
			if (creep.carry.energy == creep.carryCapacity) {
				creep.say('Depositing');
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
				creep.say('Harvesting');
			  creep.memory.harvesting = true;
			}
		}

	} // function

}; // roleHarvester

module.exports = roleHarvester;