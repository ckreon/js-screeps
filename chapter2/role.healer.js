var roleUpgrader = require('role.upgrader');

var roleHealer = {

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
				var target = creep.pos.findClosestByRange(sources);
				if ((creep.harvest(target)) == ERR_NOT_IN_RANGE) {
					creep.moveTo(target);
				}
			}
			if (creep.carry.energy == creep.carryCapacity) {
					creep.say('Healing');
			    creep.memory.harvesting = false;
			}
		}
		else {
		  var targets = creep.room.find(FIND_STRUCTURES, {
		  	filter: function(structure) {
		  		return (
		  			(structure.hits < structure.hitsMax) &&
		  			(structure.structureType != STRUCTURE_WALL) &&
		  			(structure.structureType != STRUCTURE_RAMPART));
		  	}
		  });

			if (targets.length) {
				var target = creep.pos.findClosestByRange(targets);
				if (creep.repair(target) == ERR_NOT_IN_RANGE) {
					creep.moveTo(target);
				}
				else if (creep.carry.energy == 0) {
					creep.say('Harvesting');
					creep.memory.harvesting = true;
				}
			}
			else {
				roleUpgrader.run(creep);
			}
		}

	} // function

} // roleHealer

module.exports = roleHealer;