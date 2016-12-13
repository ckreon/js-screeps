// Spawn a unit and assign a variable to memory
Game.spawns['Spawn1'].createCreep(
	[WORK, CARRY, CARRY, MOVE, MOVE],
	undefined, { role: 'builder' } );

// Spawn an expensive unit and assign a variable to memory
Game.spawns['Spawn1'].createCreep(
	[WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE],
	undefined, { role: 'harvester' } );

// Use a Safe Mode activation and engage Safe Mode for the room
Game.spawns['Spawn1'].room.controller.activateSafeMode();

// Create a Construction Site using manual coordinates
Game.spawns['Spawn1'].room.createConstructionSite( 23, 22, STRUCTURE_TOWER );

// Suicide a unit
Game.creeps['UnitName'].suicide();

// Filter a list of structures
var targets = creep.room.find(FIND_STRUCTURES, {
	filter: (structure) => {
		return (structure.structureType == STRUCTURE_EXTENSION ||
						structure.structureType == STRUCTURE_SPAWN ||
						structure.structureType == STRUCTURE_TOWER) &&
						structure.energy < structure.energyCapacity;
	}
});

// log various stats to console each tick
console.log('Harvesters: '+harvesters.length);
for (var name in Game.rooms) {
	console.log(
		'Room "'+name+'" has '+Game.rooms[name].energyAvailable+' energy');
}

// Spawn a harvester unit
Game.spawns['Spawn1'].createCreep( [WORK, CARRY, MOVE, MOVE], 'Harvester1' );

// Spawn an upgrade unit
Game.spawns['Spawn1'].createCreep( [WORK, CARRY, MOVE, MOVE], 'Upgrader1' );

// Write a unit property to memory
Game.creeps['UnitName'].memory.role = 'harvester';
Game.creeps['UnitName'].memory.role = 'upgrader';