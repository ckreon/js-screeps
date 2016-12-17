var roleHauler = {

	/** @param {Creep} creep **/
	run: function(creep) {

		if (creep.memory.harvesting) {
			var energy = creep.pos.findInRange(FIND_DROPPED_ENERGY, 3);

			if (energy.length <1 ) {
				var storage = creep.room.find(FIND_STRUCTURES, {
					filter: (structure) => {
						return (
							(structure.structureType == STRUCTURE_CONTAINER) &&
							(structure.store[RESOURCE_ENERGY] > creep.carryCapacity) &&
							(structure.pos.findInRange(FIND_SOURCES, 2).length != 0));
					}
				});
				if (storage.length > 0) {
					var targets = storage.sort(function(store1, store2) {
						return (
							parseFloat(store2.store[RESOURCE_ENERGY]) -
							parseFloat(store1.store[RESOURCE_ENERGY]));
					});
					var target = targets[0];

					if (!(creep.pos.isNearTo(target))) {
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
				creep.say('HL Depositing');
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

			if (targets.length == 0) {
				var targets = creep.room.find(FIND_STRUCTURES, {
					filter: (structure) => {
						return (
							(structure.structureType == STRUCTURE_TOWER) &&
							(structure.energy < (structure.energyCapacity - 500)));
					}
				});
			}
			if (targets.length == 0) {
				var targets = creep.room.find(FIND_STRUCTURES, {
					filter: (structure) => {
						return (
							((structure.structureType == STRUCTURE_CONTAINER) &&
								(_.sum(structure.store) < (structure.storeCapacity - creep.carry.energy)) &&
								structure.pos.findInRange(FIND_SOURCES, 2).length == 0));
					}
				});
			}
			if (targets.length == 0) {
				var targets = creep.room.find(FIND_STRUCTURES, {
					filter: (structure) => {
						return (
							(structure.structureType == STRUCTURE_STORAGE) &&
							(_.sum(structure.store) < structure.storeCapacity));
					}
				});
			}
			if (targets.length > 0) {
				var target = creep.pos.findClosestByRange(targets);
				if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(target);
				}
			}
			if (creep.carry.energy == 0) {
				creep.say('HL Collecting');
			  creep.memory.harvesting = true;
			}
		}

	} // function

}; // roleHauler

module.exports = roleHauler;