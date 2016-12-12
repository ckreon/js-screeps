var roleUpgrader = {

	/** @param {Creep} creep **/
	run: function(creep) {

		if (creep.carry.energy == 0) {
			var sources = creep.room.find(FIND_SOURCES);

			if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
				creep.say('Harvesting');
				creep.moveTo(sources[0]);
			}
		} // if

		else {
			if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
				creep.say('Upgrading');
				creep.moveTo(creep.room.controller);
			}
		} // else

	} // function

}; // roleUpgrader

module.exports = roleUpgrader;