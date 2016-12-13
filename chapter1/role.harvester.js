var roleHarvester = {

	/** @param {Creep} creep **/
	run: function(creep) {

		if (creep.memory.harvesting) {
			var sources = creep.room.find(FIND_SOURCES);

			if (!creep.memory.source) {
				for (source in sources) {
					if (_.filter(Game.creeps, (creep) =>
							(creep.memory.role == 'harvester') &&
							(creep.memory.source == source)
					).length != 1) {
						creep.memory.source = source;
					}
				}
			}
			if (creep.harvest(sources[creep.memory.source]) == ERR_NOT_IN_RANGE) {
				creep.moveTo(sources[creep.memory.source]);
			}
			else if (creep.carry.energy == creep.carryCapacity) {
				creep.say('Depositing');
			  creep.memory.harvesting = false;
			}
		}
		else {
			var targets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
				filter: (structure) => {
					return ((structure.structureType == STRUCTURE_CONTAINER) ||
									(structure.structureType == STRUCTURE_SPAWN);
				}
			});
			
			if (targets.length > 0) {
				if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[0]);
				}
			}
			if (creep.carry.energy == 0) {
				creep.say('Harvesting');
			  creep.memory.harvesting = true;
			}
		}

	} // function

}; // roleHarvester

module.exports = roleHarvester;