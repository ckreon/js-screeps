var roleUpgrader = {

	/** @param {Creep} creep **/
	run: function(creep) {

		if (creep.memory.harvesting) {
			var sources = creep.room.find(FIND_SOURCES);
			var energy = creep.pos.findInRange(FIND_DROPPED_ENERGY, 3);
			var storage = creep.room.find(FIND_STRUCTURES, {
				filter: (structure) => {
					return (
								((structure.structureType == STRUCTURE_CONTAINER) &&
								 (structure.store[RESOURCE_ENERGY] > 0)) ||
							 (((structure.structureType == STRUCTURE_EXTENSION) ||
								 (structure.structureType == STRUCTURE_SPAWN)) &&
								 (Game.spawns.Spawn1.room.energyAvailable > 550)));
				}
			});

			if (energy.length) {
				creep.pickup(energy[0]);
			}
			if (storage.length > 0) {
				var target = creep.pos.findClosestByRange(storage);

				if (!(creep.pos.isNearTo(target))) {
					creep.moveTo(target);
				}
				else {
					creep.withdraw(target, RESOURCE_ENERGY,
												(creep.carryCapacity - _.sum(creep.carry)));
				}
			}
			else {
				for (source in sources) {
					if (_.filter(Game.creeps, (creep) =>
											(creep.memory.sourceId == source.id)
					).length < 4) {
						creep.memory.sourceId = source.id;
					}
				}
				if (creep.harvest(
						Game.getObjectById(creep.memory.sourceId)) == ERR_NOT_IN_RANGE) {
					creep.moveTo(Game.getObjectById(creep.memory.sourceId));
				}
			}
			if (creep.carry.energy == creep.carryCapacity) {
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