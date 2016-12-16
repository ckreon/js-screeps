var roleHealer = require('role.healer');
var roleHarvester = require('role.harvester');

var roleBuilder = {

	/** @param {Creep} creep **/
	run: function(creep) {

		if (creep.memory.harvesting) {
			var storage = creep.room.find(FIND_STRUCTURES, {
				filter: (structure) => {
					return (
						(structure.structureType == STRUCTURE_CONTAINER) &&
						(structure.store[RESOURCE_ENERGY] > creep.carryCapacity));
				}
			});

			if (storage.length == 0) {
				var storage = creep.room.find(FIND_STRUCTURES, {
					filter: (structure) => {
						return (
									 (structure.structureType == STRUCTURE_SPAWN) &&
									 (Game.spawns.Spawn1.room.energyAvailable > 700));
					}
				});
			}

			if (storage.length > 0) {
				var target = creep.pos.findClosestByRange(storage);

				if (!(creep.pos.isNearTo(target))) {
					creep.moveTo(target);
				}
				else {
					(creep.withdraw(target, RESOURCE_ENERGY,
												(creep.carryCapacity - _.sum(creep.carry)))) ||
					(creep.withdraw(target, RESOURCE_ENERGY, target.energy));
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
					creep.say('Building');
			    creep.memory.harvesting = false;
			}
		}
		else {
		  var sites = creep.room.find(FIND_CONSTRUCTION_SITES);

			if (sites.length > 0) {
				var targets = sites.sort(function(site1, site2) {
					return (
						parseFloat(site2.progressTotal) -
						parseFloat(site1.progressTotal));
				}
				if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[0]);
				}
			}
			if (creep.carry.energy == 0) {
					creep.say('BL Collecting');
					creep.memory.harvesting = true;
			}
			else {
					roleHealer.run(creep);
			}
		}

	} // function

}; // roleBuilder

module.exports = roleBuilder;