var roleUpgrader = {

	/** @param {Creep} creep **/
	run: function(creep) {

		if (creep.memory.harvesting) {
			var sources = creep.room.find(FIND_SOURCES);

			if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
				creep.moveTo(sources[0]);
			}

			// var spawns = creep.room.find(FIND_STRUCTURES, {
			// 	filter: (structure) => {
			// 		return (
			// 			(structure.structureType == STRUCTURE_CONTAINER) &&
			// 			(structure.store[RESOURCE_ENERGY] > creep.carryCapacity));
			// 	}
			// });

			// if(spawns.length) {
			// 	var target = creep.pos.findClosestByRange(spawns);

			// 	if (!(creep.pos.isNearTo(target))) {
			// 		creep.moveTo(target);
			// 	}
			// 	else {
			// 		creep.withdraw(target, RESOURCE_ENERGY,
			// 									(creep.carryCapacity - _.sum(creep.carry)));
			// 	}
			//}
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