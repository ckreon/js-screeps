var roleBuilder = {

	/** @param {Creep} creep **/
	run: function(creep) {

		if (creep.memory.harvesting) {
			var sources = creep.room.find(FIND_SOURCES);

			if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
				creep.moveTo(sources[0]);
			}
			else if (creep.carry.energy == creep.carryCapacity) {
					creep.say('Building');
			    creep.memory.harvesting = false;
			}
		}
		else {
		  var targets = creep.room.find(FIND_CONSTRUCTION_SITES);

			if (targets.length) {
				if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[0]);
				}
				else if (creep.carry.energy == 0) {
					creep.say('Harvesting');
					creep.memory.harvesting = true;
				}
			}
		}

	} // function

}; // roleBuilder

module.exports = roleBuilder;