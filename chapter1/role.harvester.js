var roleHarvester = {

	/** @param {Creep} creep **/
	run: function(creep) {

		if (creep.memory.harvesting) {
			var sources = creep.room.find(FIND_SOURCES);

			if (!creep.memory.sourceId) {
				for (source in sources) {
					if (_.filter(Game.creeps, (creep) =>
											(creep.memory.sourceId == source.id)
					).length < 4) {
						creep.memory.sourceId = source.id;
					}
				}
			}
			if (creep.harvest(
					Game.getObjectById(creep.memory.sourceId)) == ERR_NOT_IN_RANGE) {
				creep.moveTo(Game.getObjectById(creep.memory.sourceId));
			}
			else if (creep.carry.energy == creep.carryCapacity) {
				creep.say('Depositing');
			  creep.memory.harvesting = false;
			}
		}
		else {
			var targets = creep.pos.findInRange(FIND_STRUCTURES, 1, {
				filter: (structure) => {
					return (structure.structureType == STRUCTURE_CONTAINER);
				}
			});
			
			if (targets.length == 0) {
				var targets = creep.room.find(FIND_STRUCTURES, {
					filter: (structure) => {
						return (
							((structure.structureType == STRUCTURE_EXTENSION) ||
							 (structure.structureType == STRUCTURE_SPAWN)) &&
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