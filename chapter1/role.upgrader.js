var roleUpgrader = {

	/** @param {Creep} creep **/
	run: function(creep) {

		if (creep.memory.harvesting) {
			var energy = creep.pos.findInRange(FIND_DROPPED_ENERGY, 3);

			if (energy.length <1 ) {
				var storage = creep.room.find(FIND_STRUCTURES, {
					filter: (structure) => {
						return (
							(structure.structureType == STRUCTURE_CONTAINER) &&
							(structure.store[RESOURCE_ENERGY] > creep.carryCapacity));
					}
				});

				if (storage.length == 0) {
					var sources = creep.room.find(FIND_SOURCES);
					creep.memory.source = 0;

					if (creep.harvest(sources[creep.memory.source]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(sources[creep.memory.source]);
					}
				}
				else {
					var target = creep.pos.findClosestByRange(storage);

					if (!creep.pos.isNearTo(target)) {
						creep.moveTo(target);
					}
					else {
						creep.withdraw(target, RESOURCE_ENERGY,
													(creep.carryCapacity - _.sum(creep.carry)));
					}
				}
			}
			else {
				if (creep.pickup(energy[0]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(energy[0]);
				}
			}
			if (creep.carry.energy == creep.carryCapacity) {
				creep.say('UP Upgrading');
			  creep.memory.harvesting = false;
			}
		}
		else {
			if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
				creep.moveTo(creep.room.controller);
			}
			if (creep.carry.energy == 0) {
				creep.say('UP Collecting');
			  creep.memory.harvesting = true;
			}
		}

	} // function

}; // roleUpgrader

module.exports = roleUpgrader;