//(function(piece) {
var piece = {};
piece.PIECE_DIRECTIONS = {
	up : [0, 1],
	left : [-1, 0],
	right : [1, 0],
	down : [0, -1],
	up_left : [-1, 1],
	up_right : [1, 1],
	down_left : [-1, -1],
	down_right : [1, -1]
}


piece.AB_IMMOBILE = "AB_IMMOBILE";
piece.AB_SLIDE = "AB_SLIDE";
piece.AB_LEAP = "AB_LEAP";

piece.AB_AMMO = "AB_AMMO";
piece.AB_AMOK = "AB_AMOK";
piece.AB_CATCH = "AB_CATCH";
piece.AB_DISEASED = "AB_DISEASED";
piece.AB_ENTANGLE = "AB_ENTANGLE";
piece.AB_FEAR = "AB_FEAR";
piece.AB_GENERATE = "AB_GENERATE";
piece.AB_HATCH = "AB_HATCH";
piece.AB_INVASION = "AB_INVASION";
piece.AB_KAMIKAZE = "AB_KAMIKAZE";
piece.AB_PERSUADE = "AB_PERSUADE";
piece.AB_POISON = "AB_POISON";
piece.AB_RANGED = "AB_RANGED";
piece.AB_RETIVE = "AB_RETIVE";
piece.AB_REWARD = "AB_REWARD";
piece.AB_ROYAL_JELLY = "AB_ROYAL_JELLY";
piece.AB_SACRIFICE = "AB_SACRIFICE";
piece.AB_SLOW = "AB_SLOW";
piece.AB_SUMMONER = "AB_SUMMONER";
piece.AB_TRACK = "AB_TRACK";
piece.AB_TRAMPLE = "AB_TRAMPLE";
piece.AB_WAKE = "AB_WAKE";
piece.AB_WANTED = "AB_WANTED";

piece.PIECES = {
	piece_Cat : {
		name : "Cat",
		cost : 2,
		moves : {
			up : 1,
			up_left : 1,
			up_right : 1
		},
		abilities : [
			piece.AB_IMMOBILE,
			piece.AB_TRACK
		]
	},
	piece_Marmoset : {
		name : "Marmoset",
		cost : 4,
		moves : {
			up : 1,
			down : 1,
			down_left : 1,
			down_right : 1
		}
	},
	piece_Ammo_Cart : {
		name : "Ammo Cart",
		cost : 8,
		moves : {
			up : 1,
			down : 1,
			left : 1,
			right : 1
		},
		abilities : [
			piece.AB_IMMOBILE,
			piece.AB_AMMO,
			piece.AB_AMMO
		]
	},
	piece_Pirate : {
		name : "Pirate",
		cost : 12,
		moves : {
			left : 3,
			right : 3,
			up_left : 2,
			up_right : 2,
			down_left : 2,
			down_right : 2
		},
		abilities : [
			piece.AB_RANGED,
			piece.AB_WANTED
		]
	},
	piece_Shark : {
		name : "Shark",
		cost : 16,
		moves : {
			up_left : 2,
			up_right : 2
		},
		abilities : [
			piece.AB_INVASION,
			piece.AB_TRACK
		]
	},
	piece_Freebooter : {
		name : "Freebooter",
		cost : 25,
		moves : {
			up_left : 2,
			up_right : 2,
			down_left : 2,
			down_right : 2
		},
		abilities : [
			piece.AB_CATCH
		]
	},
	piece_Cannon : {
		name : "Cannon",
		cost : 30,
		moves : {
			up : 5
		},
		abilities : [
			piece.AB_RANGED
		]
	},
	piece_Quartermaster : {
		name : "Quartermaster",
		cost : 35,
		moves : {
			up : 1,
			left : 1,
			down : 1,
			right : 1,
			up_left : 1,
			up_right : 1,
			down_left : 1,
			down_right : 1
		},
		abilities : [
			piece.AB_AMMO,
			piece.AB_AMMO,
			piece.AB_AMMO
		]
	},
/*	piece_Navigator : {
		name : "Quartermaster",
		cost : 35,
		moves : {
			up : 1,
			left : 1,
			down : 1,
			right : 1,
			up_left : 1,
			up_right : 1,
			down_left : 1,
			down_right : 1
		},
		abilities : [
			AMMO,
			AMMO,
			AMMO
		]
	},*/
	piece_Captain : {
		name : "Captain",
		cost : 50,
		moves : {
			up : 3,
			left : 3,
			down : 3,
			right : 3,
			up_left : 3,
			up_right : 3,
			down_left : 3,
			down_right : 3
		},
		abilities : [
			piece.AB_RANGED,
			piece.AB_WANTED
		]
	},
	piece_Penguin : {
		name : "Penguin",
		cost : 5,
		moves : {
			up : 3,
			left : 3,
			down : 3,
			right : 3
		},
		abilities : [
			piece.AB_SLIDE
		]
	},
	piece_Husky : {
		name : "Husky",
		cost : 10,
		moves : {
			up : 2,
			up_left : 1,
			up_right : 1
		}
	},
	piece_Fisher : {
		name : "Fisher",
		cost : 18,
		moves : {
			down : 2,
			up_left : 2,
			up_right : 2
		},
		abilities : [
			piece.AB_CATCH
		]
	},
	piece_Walrus : {
		name : "Walrus",
		cost : 18,
		moves : {
			up : 5,
			down : 5,
			up_left : 5,
			up_right : 5,
			down_left : 5,
			down_right : 5
		},
		abilities : [
			piece.AB_SLIDE
		]
	},
	piece_Hunter : {
		name : "Hunter",
		cost : 27,
		moves : {
			up : 2,
			left : 2,
			right : 2,
			up_left : 2,
			up_right : 2
		},
		abilities : [
			piece.AB_TRACK
		]
	},
	piece_Polar_Bear : {
		name : "Polar Bear",
		cost : 40,
		moves : {
			up : 6,
			left : 6,
			right : 6,
			down : 6
		},
		abilities : [
		]
	},
	piece_Narwhale : {
		name : "Narwhale",
		cost : 55,
		moves : {
			up : 4,
			left : 4,
			right : 4,
			up_left : 4,
			up_right : 4,
			down_left : 4,
			down_right : 4
		},
		abilities : [
			piece.AB_SLIDE,
			piece.AB_TRAMPLE
		]
	},
	piece_Crow : {
		name : "Crow",
		cost : 3,
		moves : {
			leap : [
				[-2, 1],
				[2, 1],
				[-2, -1],
				[2, -1]
			]
		},
		abilities : [
		]
	},
	piece_Raider : {
		name : "Raider",
		cost : 7,
		moves : {
			up : 3,
			up_left : 1,
			up_right : 1
		},
		abilities : [
		]
	},
	piece_Wolf : {
		name : "Wolf",
		cost : 12,
		moves : {
			up_left : 1,
			up_right : 1,
			down_left : 1,
			down_right : 1
		},
		abilities : [
			piece.AB_AMOK
		]
	},
	piece_Bard : {
		name : "Bard",
		cost : 20,
		moves : {
			up_left : 3,
			up_right : 3,
			down_left : 3,
			down_right : 3
		},
		abilities : [
		]
	},
	piece_Berserker : {
		name : "Berserker",
		cost : 25,
		moves : {
			up : 2,
			left : 2,
			right : 2,
			up_left : 2,
			up_right : 2
		},
		abilities : [
			piece.AB_AMOK
		]
	},
/*	piece_Valkyrie : {
		name : "Valkyrie",
		cost : 30,
		moves : {
			up : 3,
			left : 3,
			right : 3,
			down : 3,
			up_left : 3,
			up_right : 3,
			down_left : 3,
			down_right : 3
		},
		abilities : [
		]
	},*/
	piece_Ettin : {
		name : "Ettin",
		cost : 45,
		moves : {
			up : 4,
			left : 4,
			right : 4,
			down : 4
		},
		abilities : [
			piece.AB_AMOK
		]
	},
	piece_Hyena : {
		name : "Hyena",
		cost : 2,
		moves : {
			up : 1,
			left : 1,
			right : 1,
			down : 1,
			down_left : 1,
			down_right : 1
		},
		abilities : [
			piece.AB_RESTIVE
		]
	},
	piece_Trident : {
		name : "Trident Wielder",
		cost : 6,
		moves : {
			up : 2,
			up_left : 1,
			up_right : 1,
			leap : [
				[-1, 2],
				[1, 2]
			]
		},
		abilities : [
			piece.AB_RESTIVE
		]
	},
	piece_Lion : {
		name : "Lion",
		cost : 10,
		moves : {
			leap : [
				[-2, 1],
				[-1, 2],
				[1, 2],
				[2, 1],
				[2, -1],
				[1, -2],
				[-1, -2],
				[-2, -1]
			]
		},
		abilities : [
			piece.AB_RESTIVE
		]
	},
	piece_Gladiator : {
		name : "Gladiator",
		cost : 16,
		moves : {
			up : 2,
			up_left : 2,
			up_right : 2,
			left : 2,
			right : 2,
			down : 2
		},
		abilities : [
			piece.AB_RESTIVE
		]
	},
	piece_Chariot : {
		name : "Race Chariot",
		cost : 25,
		moves : {
			up : 5,
			up_left : 5,
			up_right : 5
		},
		abilities : [
		]
	},
	piece_Elephant : {
		name : "Elephant",
		cost : 30,
		moves : {
			up : 6,
			left : 6,
			right : 6,
			down : 6
		},
		abilities : [
			piece.AB_RESTIVE
		]
	},
/*	piece_Rat : {
		name : "Rat",
		cost : 1,
		moves : {
			up : 1,
			left : 1,
			right : 1,
			down : 1,
			up_left : 1,
			up_right : 1,
			down_left : 1,
			down_right : 1
		},
		abilities : [
			piece.AB_DISEASED
		]
	},
	piece_Infected : {
		name : "Infected",
		cost : 3,
		moves : {
			up : 1
		},
		abilities : [
			piece.AB_POISON
		]
	},
	piece_Raven : {
		name : "Raven",
		cost : 6,
		moves : {
			leap : [
				[-1, -2],
				[1, -2],
				[2, -1],
				[2, 1],
				[1, 2],
				[-1, 2],
				[-2, 1],
				[-2, -1]
			]
		},
		abilities : [
			piece.AB_DISEASED
		]
	},
	piece_Reanimated : {
		name : "Reanimated",
		cost : 9,
		moves : {
			up : 2
		},
		abilities : [
			piece.AB_INVASION
		]
	},
	piece_Flesh_Eater : {
		name : "Flesh Eater",
		cost : 18,
		moves : {
			up : 2,
			up_left : 2,
			up_right : 2
		},
		abilities : [
			piece.AB_POISON
//			piece.AB_REWARD
		]
	},
	piece_Mad_Doctor : {
		name : "Mad_Doctor",
		cost : 32,
		moves : {
			up : 3,
			down : 3,
			left : 3,
			right : 3,
			up_left : 3,
			up_right : 3,
			down_left : 3,
			down_right : 3
		},
		abilities : [
//			piece.AB_MORPH_REANIMATED,
//			piece.AB_MORPH_REANIMATED,
//			piece.AB_MORPH_REANIMATED,
		]
	},
	piece_Patient_Zero : {
		name : "Patient_Zero",
		cost : 32,
		moves : {
			up : 3,
			down : 3,
			left : 3,
			right : 3,
			up_left : 3,
			up_right : 3,
			down_left : 3,
			down_right : 3
		},
		abilities : [
			piece.AB_POISON,
//			piece.AB_MORPH_INFECTED,
//			piece.AB_MORPH_INFECTED
		]
	},*/
	
}


// signature abilities : Shield ? Restive ?
/*piece.CARTHAGO = [
	"piece_Mercenary",
	"piece_Hyena",
	"piece_Slinger",
	"piece_Gladiator",
	"piece_Lion",
	"piece_Legionary",
	"piece_Chariot",
	"piece_Elephant",
	"piece_Catapult",
	"piece_Consul"
];*/

// basic roster : only abilities : Restive (Rebellious), Trample ?
piece.ARENA_MASTERS = [
	"piece_Hyena",
	"piece_Trident",			// evo : Trident Master
	"piece_Lion",				// evo : Lion Pack Leader
	"piece_Gladiator",			// evo : Veteran
	"piece_Chariot",			// evo : Spiked Chariot
	"piece_Elephant",			// evo : Unleashed Elephant
//	"piece_Governor"			// evo : Emperor (alt : Consul -> Praetor)
];
piece.ARENA_MASTERS_STARTING1 = [
	["piece_Hyena", [1, 1]],
	["piece_Hyena", [2, 1]],
	["piece_Hyena", [5, 1]],
	["piece_Hyena", [6, 1]],
	["piece_Trident", [3, 1]],
	["piece_Trident", [4, 1]],
	["piece_Lion", [2, 0]],
	["piece_Lion", [5, 0]],
	["piece_Gladiator", [1, 0]],
	["piece_Gladiator", [6, 0]],
	["piece_Chariot", [0, 0]],
	["piece_Chariot", [7, 0]],
	["piece_Elephant", [4, 0], true]
];


// basic roster : only abilities : Amok
piece.VALHALLA_WARRIORS = [
	"piece_Crow",			// evo : Raven
	"piece_Rune_Carver",	// evo : Runemaster
	"piece_Wolf",			// evo : Warg
	"piece_Raider",			// evo : Plunderer
	"piece_Bard",			// evo : Valkyrie
	"piece_Berserker",
	"piece_Earl",			// evo : King
	"piece_Ettin"
];
piece.VALHALLA_WARRIORS_STARTING1 = [
	["piece_Crow", [1, 1]],
	["piece_Crow", [2, 1]],
	["piece_Crow", [5, 1]],
	["piece_Crow", [6, 1]],
	["piece_Wolf", [3, 1]],
	["piece_Wolf", [4, 1]],
	["piece_Raider", [2, 0]],
	["piece_Raider", [5, 0]],
	["piece_Bard", [1, 0]],
	["piece_Bard", [6, 0]],
	["piece_Berserker", [0, 0]],
	["piece_Berserker", [7, 0]],
	["piece_Ettin", [4, 0], true]
];



// signature abilities : Ranged, Wanted, Ammo
piece.FILIBUSTER_FLEET = [
	"piece_Cat",
	"piece_Marmoset",
	"piece_Ammo_Cart",
	"piece_Pirate",
	"piece_Shark",
//	"piece_Freebooter",
	"piece_Cannon",
//	"piece_Quartermaster",
//	"piece_Navigator",
	"piece_Captain"
];
piece.FILIBUSTER_FLEET_STARTING1 = [
	["piece_Cat", [1, 1]],
	["piece_Cat", [2, 1]],
	["piece_Cat", [5, 1]],
	["piece_Cat", [6, 1]],
	["piece_Marmoset", [3, 1]],
	["piece_Marmoset", [4, 1]],
//	["piece_Ammo_Cart", [3, 0]],
	["piece_Pirate", [2, 0]],
	["piece_Pirate", [5, 0]],
	["piece_Cannon", [0, 0]],
	["piece_Cannon", [7, 0]],
	["piece_Captain", [4, 0], true]
];

// signature abilities : Slide
piece.FROZEN_FRONTIER = [
	"piece_Penguin",
	"piece_Snow_Hound",	// Sled Dog, Husky
//	"piece_Reindeer",
	"piece_Harpooner",
	"piece_Walrus",
	"piece_Hunter",
	"piece_Polar_Bear",
	"piece_Ice_Mason",
//	"piece_Snow_Shaman",
	"piece_Narwhale"
];
piece.FROZEN_FRONTIER_STARTING1 = [
	["piece_Penguin", [1, 1]],
	["piece_Penguin", [2, 1]],
	["piece_Penguin", [5, 1]],
	["piece_Penguin", [6, 1]],
	["piece_Husky", [0, 1]],
	["piece_Husky", [7, 1]],
	["piece_Husky", [3, 1]],
	["piece_Husky", [4, 1]],
	["piece_Walrus", [2, 0]],
	["piece_Walrus", [5, 0]],
	["piece_Polar_Bear", [0, 0]],
	["piece_Polar_Bear", [7, 0]],
	["piece_Hunter", [1, 0]],
	["piece_Hunter", [6, 0]],
	["piece_Fisher", [3, 0], true],
	["piece_Narwhale", [4, 0]]
];


// signature abilities : ?
piece.JUNGLE_WARRIORS = [
	"piece_Vine",
	"piece_Snake",
	"piece_Sweet_Tree",
	"piece_Crocodile",
	"piece_Fly_Trap",
	"piece_Jaguar",
	"piece_Gorilla",
	"piece_Witch_Doctor"
];

/*piece.Z_PLAGUE = [
	"piece_Infected",
	"piece_Rat",
	"piece_Reanimated",
	"piece_Raven",
	"piece_Flesh_Eater",
	"piece_Mad_Doctor",
	"piece_Patient_Zero"
];*/

// signature abilities : ?
piece.MUMMY_REVENGE = [
	"piece_Eternal_Servant",
	"piece_Scorpion",
	"piece_Sarcophagus",
	"piece_Guardian Statue",
	"piece_Ancient_Mummy",
];


/*class Ability() :
	pass

class Hatch() :
	def action(self, owner, board) :
		owner.removeAb(self)
		for ab in owner.abilities :
			if ab is Hatch :
				break
		else :
			board.removePiece(owner)
			#select Piece and place it*/


piece.newPiece = function(id, templateName, name, cost, moves, ownerNb, pos, abilities) {
	var _piece = {
		id : id,
		templateName : templateName,
		name : name,
		cost : cost,
		moves : moves,
		ownerNb : ownerNb,
		pos : pos,
		abilities : abilities
	}
	if (_piece.abilities == undefined) _piece.abilities = [];
	return _piece;
}

piece.gainAbility = function(aPiece, ability) {
	aPiece.abilities.push(ability);
	while (aPiece.abilities.length > 3) aPiece.abilities.shift();
}

piece.loseAbility = function(aPiece, slotOrAbility) {
	var slot = utils.uniquePos(slotOrAbility, aPiece.abilities);
	if (slot == undefined) slot = slotOrAbility;
	aPiece.abilities.splice(slot, 1);
}

piece.loadPiece = function(id, template, ownerNb, pos) {
	return piece.newPiece(id, template, piece.PIECES[template].name, piece.PIECES[template].cost, piece.PIECES[template].moves, ownerNb, pos, piece.PIECES[template].abilities);
}

piece.isOnBoard = function(aPiece) {
	if (typeof(aPiece.pos) == "string") return false;
	return true;
}

//})(typeof exports === 'undefined'? this['piece']={} : exports);
if (typeof exports !== 'undefined') module.exports = function() {
	this.piece = piece;
}
/*module.piece = piece.() {
	this.PIECE_DIRECTIONS = PIECE_DIRECTIONS;
	this.AB_TRAMPLE = AB_TRAMPLE;
	this.AB_SLIDE = AB_SLIDE;
	this.AB_TRACK = AB_TRACK;
	this.AB_IMMOBILE = AB_IMMOBILE;
	this.AB_REWARD = AB_REWARD;
	this.loadPiece = loadPiece;
	this.loadStartingPieces = loadStartingPieces;
	this.FROZEN_FRONTIER_STARTING1 = FROZEN_FRONTIER_STARTING1;
}*/

/*class Mosquito(Piece) :
    def __init__(self, owner, name="Mosquito", cost=0) :
        Piece.__init__(self, owner, name=name, cost=cost,\
                moves=[(-1,1),(1,1),(0,-1)],\
                ab1=KAMIKAZE, ab2=(RETIVE, 1))

class Egg(Piece) :
    def __init__(self, owner, name="Egg", cost=0) :
        Piece.__init__(self, owner, name=name, cost=cost, moves=[],
                ab1=HATCH, ab2=HATCH)

class Raptor(Piece) :
    def __init__(self, owner, name="Raptor", cost=0) :
        Piece.__init__(self, owner, name=name, cost=cost, moveType="LEAP",\
                moves=[(-1,0),(1,0),(0,-1),(0,-2),(0,-3),(0,1),(0,2),(0,3)])

class Pterodactyl(Piece) :
    def __init__(self, owner, name="Pterodactyl", cost=0) :
        Piece.__init__(self, owner, name=name, cost=cost, moveType="LEAP",\
                moves=[(-1,1),(-2,2),(-3,3),(0,1),(0,2),(0,3),(1,1),(1,2),(1,3)],\
                ab1=INVASION)

class Stegosaurus(Piece) :
    def __init__(self, owner, name="Stegosaurus", cost=0) :
        Piece.__init__(self, owner, name=name, cost=cost,\
                moves=[(-1,0),(-2,0),(1,0),(2,0),(0,-1),(0,-2),(0,1),(0,2)],\
                ab1=SHIELD, ab2=TRAMPLE)

class Brontosaurus(Piece) :
    def __init__(self, owner, name="Stegosaurus", cost=0) :
        Piece.__init__(self, owner, name=name, cost=cost,\
                moves=[(-1,1),(1,1),(-1,-1),(0,-1),(1,-1)],\
                ab1=(WAKE, Egg), ab2=CATCH)

class Tyrannosaurus(Piece) :
    def __init__(self, owner, name="Tyrannosaurus", cost=0) :
        Piece.__init__(self, owner, name=name, cost=cost,\
                moves=[(-1,0),(-2,0),(-3,0),(-4,0),(-5,0),(1,0),(2,0),(3,0),(4,0),(5,0),(0,-1),(0,-2),(0,-3),(0,-4),(0,-5),(0,1),(0,2),(0,3),(0,4),(0,5)],\
                ab1=TRAMPLE, ab2=FEAR)

class Soldier(Piece) :
    def __init__(self, owner, name="Soldier", cost=0) :
        Piece.__init__(self, owner, name=name, cost=cost,\
                moves=[(-1,0),(-2,0),(1,0),(2,0),(0,1),(0,2)],\
                ab1=ROYAL_JELLY, ab2=(RANGED, 1), ab3=KAMIKAZE)

class Bombardier(Piece) :
    def __init__(self, owner, name="Bombardier", cost=0) :
        Piece.__init__(self, owner, name=name, cost=cost,\
                moves=[(-1,0),(-2,0),(-1,1),(-2,2),(1,1),(2,2),(1,0),(2,0),(0,1),(0,2)],\
                ab1=ROYAL_JELLY, ab2=(RANGED, 1), ab3=KAMIKAZE)

class Dirt_Wall(Piece) :
    def __init__(self, owner, name="Dirt_Wall", cost=0) :
        Piece.__init__(self, owner, name=name, cost=cost,\
                moves=[], ab1=SHIELD)

class Digger(Piece) :
    def __init__(self, owner, name="Digger", cost=0) :
        Piece.__init__(self, owner, name=name, cost=cost,\
                moves=[(-1,1),(0,1),(1,1)],\
                ab1=ROYAL_JELLY, ab2=INVASION, ab3=(GENERATE, Dirt_Wall))

class Mushroom(Piece) :
    def __init__(self, owner, name="Mushroom", cost=0) :
        Piece.__init__(self, owner, name=name, cost=cost,\
                moves=[], ab1=POISON)

class Cave_Dweller(Piece) :
    def __init__(self, owner, name="Cave_Dweller", cost=0) :
        Piece.__init__(self, owner, name=name, cost=cost,\
                moves=[(-1,1),(0,1),(1,1)],\
                ab1=ROYAL_JELLY, ab2=INVASION, ab3=(GENERATE, Mushroom))

class Nurse(Piece) :
    def __init__(self, owner, name="Nurse", cost=0) :
        Piece.__init__(self, owner, name=name, cost=cost,\
                moves=[(-1,1),(1,1),(-1,-1),(1,-1)],\
                ab1=ROYAL_JELLY, ab2=SUMMONER)

class Forager(Piece) :
    def __init__(self, owner, name="Forager", cost=0) :
        Piece.__init__(self, owner, name=name, cost=cost,\
                moves=[(-1,0),(0,1),(1,0),(-1,-1),(0,-1),(1,-1)],\
                ab1=ROYAL_JELLY, ab2=REWARD)

class Herder(Piece) :
    def __init__(self, owner, name="Herder", cost=0) :
        Piece.__init__(self, owner, name=name, cost=cost,\
                moves=[(-1,0),(0,1),(1,0),(-1,-1),(0,-1),(1,-1)],\
                ab1=ROYAL_JELLY, ab2=PERSUADE)

class Drone(Piece) :
    def __init__(self, owner, name="Drone", cost=0) :
        Piece.__init__(self, owner, name=name, cost=cost, moveType=LEAP,\
                moves=[(-2,1),(-1,2),(2,1),(1,2),(-2,-1),(-1,-2),(2,-1),(1,-2)],\
                ab1=KAMIKAZE)

class Mantis(Piece) :
    def __init__(self, owner, name="Mantis", cost=0) :
        Piece.__init__(self, owner, name=name, cost=cost,\
                moves=[(-1,1),(-2,2),(-3,3),(-4,4),(-5,5),(1,1),(2,2),(3,3),(4,4),(5,5),(-1,-1),(-2,-2),(-3,-3),(-4,-4),(-5,-5),(1,-1),(2,-2),(3,-3),(4,-4),(5,-5)],\
                ab1=SLOW)

class Spider(Piece) :
    def __init__(self, owner, name="Spider", cost=0) :
        Piece.__init__(self, owner, name=name, cost=cost,\
                moves=[(-1,0),(-2,0),(-1,1),(-2,2),(0,1),(0,2),(1,1),(2,2),(1,0),(2,0),(1,-1),(2,-2),(0,-1),(0,-2),(1,-1),(2,-2)],\
                ab1=POISON, ab2=ENTANGLE, ab3=ENTANGLE)

class Queen(Piece) :
    def __init__(self, owner, name="Queen", cost=0) :
        Piece.__init__(self, owner, name=name, cost=cost, moveType=IMMOBILE,\
                moves=[(-1,0),(-2,0),(-3,0),(-4,0),(-1,1),(-2,2),(-3,3),(-4,4),(0,1),(0,2),(0,3),(0,4),(1,1),(2,2),(3,3),(4,4),(1,0),(2,0),(3,0),(4,0),(1,-1),(2,-2),(3,-3),(4,-4),(0,-1),(0,-2),(0,-3),(0,-4),(1,-1),(2,-2),(3,-3),(4,-4)],\
                ab1=ROYAL_JELLY)


DINOLAND = {
    "Mosquito" : (Mosquito, 1),
    "Egg" : (Egg, 6),
    "Raptor" : (Raptor, 16),
    "Pterodactyl" : (Pterodactyl, 30),
    "Stegosaurus" : (Stegosaurus, 40),
    "Brontosaurus" : (Brontosaurus, 50),
    "Tyrannosaurus" : (Tyrannosaurus, 75)
    }

LEGION = {
    "Soldier" : (Soldier, 6),
    "Bombardier" : (Bombardier, 0),
    "Digger" : (Digger, 9),
    "Cave_Dweller" : (Cave_Dweller, 0),
    "Nurse" : (Nurse, 11),
    "Forager" : (Forager, 14),
    "Herder" : (Herder, 0),
    "Drone" : (Drone, 21),
    "Mantis" : (Mantis, 25),
    "Spider" : (Spider, 30),
    "Queen" : (Queen, 40)
    }

*/



