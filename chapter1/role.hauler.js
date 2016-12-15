var roleHauler = {

	/** @param {Creep} creep **/
	run: function(creep) {

		if (creep.memory.harvesting) {
			var spawns = creep.room.find(FIND_STRUCTURES, {
				filter: (structure) => {
					return (
						(structure.structureType == STRUCTURE_CONTAINER) &&
						(structure.store[RESOURCE_ENERGY] > creep.carryCapacity) &&
						(structure.pos.findInRange(FIND_SOURCES, 2).length != 0));
				}
			});

			if (spawns.length) {
				var target = creep.pos.findClosestByRange(spawns);
				if (!(creep.pos.isNearTo(target))) {
					creep.moveTo(target);
				}
				else {
					creep.withdraw(target, RESOURCE_ENERGY,
												(creep.carryCapacity - _.sum(creep.carry)));
				}
			}
			else if (creep.carry.energy == creep.carryCapacity) {
				creep.say('Depositing');
			  creep.memory.harvesting = false;
			}
		}
		else {
			var targets = creep.room.find(FIND_STRUCTURES, {
				filter: (structure) => {
					return (
								((structure.structureType == STRUCTURE_SPAWN) ||
								 (structure.structureType == STRUCTURE_EXTENSION)) &&
								 (structure.energy < structure.energyCapacity));
				}
			});

			targets.sort(function(a,b) {
				if (a.structureType == STRUCTURE_SPAWN) {
					return -1;
				}
				else {
					if (a.structureType == STRUCTURE_CONTAINER) {
						return 1;
					}
					else {
						return 0;
					}
				}
			});
			
			if (targets.length) {
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

}; // roleHauler

module.exports = roleHauler;