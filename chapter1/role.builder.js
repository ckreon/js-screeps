var roleHealer = require('role.healer');

var roleBuilder = {

	/** @param {Creep} creep **/
	run: function(creep) {

		if (creep.memory.harvesting) {
			var energy = creep.pos.findInRange(FIND_DROPPED_ENERGY, 3);

			if (energy.length < 1) {}
				var storage = creep.room.find(FIND_STRUCTURES, {
					filter: (structure) => {
						return (
							(structure.structureType == STRUCTURE_CONTAINER) &&
							(structure.store[RESOURCE_ENERGY] > creep.carryCapacity));
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
				else {
					var sources = creep.room.find(FIND_SOURCES);
					creep.memory.source = 0;

					if (creep.harvest(sources[creep.memory.source]) == ERR_NOT_IN_RANGE) {
						creep.moveTo(sources[creep.memory.source]);
					}
				}
			}
			else {
				if (creep.pickup(energy[0]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(energy[0]);
				}
			}
			if (creep.carry.energy == creep.carryCapacity) {
					creep.say('Building');
			    creep.memory.harvesting = false;
			}
		}
		else {
		  var sites = creep.room.find(FIND_CONSTRUCTION_SITES);

			if (sites.length > 0) {
				var target = creep.pos.findClosestByRange(sites);

				if (creep.build(target) == ERR_NOT_IN_RANGE) {
					creep.moveTo(target);
				}
			}
			else {
				roleHealer.run(creep);
			}
			if (creep.carry.energy == 0) {
					creep.say('BL Collecting');
					creep.memory.harvesting = true;
			}
		}

	} // function

}; // roleBuilder

module.exports = roleBuilder;