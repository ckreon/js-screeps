var roleHealer = require('role.healer');

var roleBuilder = {

	/** @param {Creep} creep **/
	run: function(creep, target) {

		if (creep.memory.harvesting) {
			var sources = creep.room.find(FIND_SOURCES);
			// var spawns = creep.room.find(FIND_STRUCTURES, {
			// 	filter: (structure) => {
			// 		return (
			// 					 (structure.structureType == STRUCTURE_CONTAINER) &&
			// 					 (structure.store[RESOURCE_ENERGY] > creep.carryCapacity));
			// 	}
			// });

			// if (sources.length) {
				if (!creep.memory.source) {
					for (source in sources) {
						if (_.filter(Game.creeps, (creep) =>
								(creep.memory.role == 'builder') &&
								(creep.memory.source == source)
						).length != 1) {
							creep.memory.source = source;
						}
					}
				}
				//var target = creep.pos.findClosestByRange(spawns);
				var target = creep.memory.source;

				if (!(creep.pos.isNearTo(target))) {
					creep.moveTo(target);
				}
				else {
					creep.harvest(target, RESOURCE_ENERGY,
												(creep.carryCapacity - _.sum(creep.carry)));
				}
			// }
			if (creep.carry.energy == creep.carryCapacity) {
					creep.say('Building');
			    creep.memory.harvesting = false;
			}
		}
		else {
		  var targets = creep.room.find(FIND_CONSTRUCTION_SITES);

			if (targets.length) {
				var target = creep.pos.findClosestByRange(targets);
				if (creep.build(target) == ERR_NOT_IN_RANGE) {
					creep.moveTo(target);
				}
				else {
					roleHealer.run(creep);
				}
				if (creep.carry.energy == 0) {
					creep.say('Harvesting');
					creep.memory.harvesting = true;
				}
			}
		}

	} // function

}; // roleBuilder

module.exports = roleBuilder;