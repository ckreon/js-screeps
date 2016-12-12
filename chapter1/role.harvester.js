var roleHarvester = {

	/** @param {Creep} creep **/
	run: function(creep) {

		if (creep.carry.energy < creep.carryCapacity) {
			var sources = creep.room.find(FIND_SOURCES);

			if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
				creep.say('Harvesting');
				creep.moveTo(sources[0]);
			}
		} // if

		else {
			var targets = creep.room.find(FIND_STRUCTURES, {
				filter: (structure) => {
					return (structure.structureType == STRUCTURE_EXTENSION ||
									structure.structureType == STRUCTURE_SPAWN ||
									structure.structureType == STRUCTURE_TOWER) &&
									structure.energy < structure.energyCapacity;
				} // filter
			}); // targets

			if (targets.length > 0) {
				if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.say('Depositing')
					creep.moveTo(targets[0]);
				}
			}
		} // else

	} // function

}; // roleHarvester

module.exports = roleHarvester;