var roleUpgrader = require('role.upgrader');

var roleHealer = {

	/** @param {Creep} creep **/
	run: function(creep) {

		if (creep.memory.harvesting) {
			var storage = creep.room.find(FIND_STRUCTURES, {
				filter: (structure) => {
					return (
								 (structure.structureType == STRUCTURE_CONTAINER) &&
								 (structure.store[RESOURCE_ENERGY] > 0));
				}
			});

			if (storage.length) {
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
				var sources = creep.room.find(FIND_SOURCES);
				creep.memory.source = 0;

				if (creep.harvest(sources[creep.memory.source]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(sources[creep.memory.source]);
				}
			}
			if (creep.carry.energy == creep.carryCapacity) {
					creep.say('Healing');
			    creep.memory.harvesting = false;
			}
		}
		else {
		  var repairitnow = creep.room.find(FIND_STRUCTURES, { 
				filter: (structure) => { 
					return (
						(structure.hits < 650) && (structure.hits > 0));
				}
			});

			if (repairitnow.length > 0) {
				if (creep.repair(repairitnow[0]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(repairitnow[0]);
				}
			}
			else {
				var repairit = creep.room.find(FIND_STRUCTURES, { 
					filter: (structure) => { 
						return (
							(structure.hits < structure.hitsMax) &&
							(structure.hits > 0) &&
							(structure.structureType != STRUCTURE_WALL) &&
							(structure.structureType != STRUCTURE_RAMPART));
					}
				});
				var repairwall = creep.room.find(FIND_STRUCTURES, { 
					filter: (structure) => { 
						return (
							(structure.structureType == STRUCTURE_RAMPART) &&
							(structure.hits < structure.hitsMax) &&
						 ((structure.hits > 0) || (structure.hits < structure.hitsMax)) &&
							(structure.hits > 0) &&
							(structure.structureType == STRUCTURE_WALL));
					}
				});

				if (repairit.length > 0) {
					if (creep.repair(repairit[0]) == ERR_NOT_IN_RANGE) {
						creep.moveTo(repairit[0]);
					}
				}
				else {
					if (repairwall.length > 0) {
						if (creep.repair(repairwall[repairwall.length - 1]) == ERR_NOT_IN_RANGE) {
							creep.moveTo(repairwall[0]);
						}
					}
					else {
						roleUpgrader.run(creep);
					}
				}
			}
			if (creep.carry.energy == 0) {
					creep.say('He Collecting');
					creep.memory.harvesting = true;
			}
		}

	} // function

} // roleHealer

module.exports = roleHealer;