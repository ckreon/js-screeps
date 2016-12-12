// Spawn a unit and assign a variable to memory
Game.spawns['Spawn1'].createCreep( [WORK, CARRY, MOVE, MOVE], 'Builder1',
	{ role: 'builder' } );

// Spawn an expensive unit and assign a variable to memory
Game.spawns['Spawn1'].createCreep(
	[WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE],
	'HarvesterBig', { role: 'harvester' } );

// Use a Safe Mode activation and engage Safe Mode for the room
Game.spawns['Spawn1'].room.controller.activateSafeMode();

// Create a Construction Site using manual coordinates
Game.spawns['Spawn1'].room.createConstructionSite( 23, 22, STRUCTURE_TOWER );

// Suicide a unit
Game.creeps['Harvester1'].suicide();

// Spawn a harvester unit
Game.spawns['Spawn1'].createCreep( [WORK, CARRY, MOVE, MOVE], 'Harvester1' );

// Spawn an upgrade unit
Game.spawns['Spawn1'].createCreep( [WORK, CARRY, MOVE, MOVE], 'Upgrader1' );

// Write a unit property to memory
Game.creeps['Harvester1'].memory.role = 'harvester';
Game.creeps['Upgrader1'].memory.role = 'upgrader';