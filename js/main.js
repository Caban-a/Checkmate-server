var debug_mode = true;

/*var MAP_BOARD = [
	[1, 0, 1, 0, 1, 0, 1, 0],
	[0, 1, 0, 1, 0, 1, 0, 1],
	[1, 0, 1, 0, 1, 0, 1, 0],
	[0, 1, 0, 1, 0, 1, 0, 1],
	[1, 0, 1, 0, 1, 0, 1, 0],
	[0, 1, 0, 1, 0, 1, 0, 1],
	[1, 0, 1, 0, 1, 0, 1, 0],
	[0, 1, 0, 1, 0, 1, 0, 1]
];*/

var ATLAS_PIECES = {
	"frames": [
		{
			"filename": "piece_Cat",
			"frame": {"x":0, "y":0, "w":16, "h":16},
			"rotated": false,
			"trimmed": false,
			"pivot": {"x":0.5, "y":0.5}
		},
		{
			"filename": "piece_Marmoset",
			"frame": {"x":16, "y":0, "w":16, "h":16},
			"rotated": false,
			"trimmed": false,
			"pivot": {"x":0.5, "y":0.5}
		},
		{
			"filename": "piece_Ammo_Cart",
			"frame": {"x":32, "y":0, "w":16, "h":16},
			"rotated": false,
			"trimmed": false,
			"pivot": {"x":0.5, "y":0.5}
		},
		{
			"filename": "piece_Pirate",
			"frame": {"x":48, "y":0, "w":16, "h":16},
			"rotated": false,
			"trimmed": false,
			"pivot": {"x":0.5, "y":0.5}
		},
		{
			"filename": "piece_Shark",
			"frame": {"x":64, "y":0, "w":16, "h":16},
			"rotated": false,
			"trimmed": false,
			"pivot": {"x":0.5, "y":0.5}
		},
		{
			"filename": "piece_Cannon",
			"frame": {"x":80, "y":0, "w":16, "h":16},
			"rotated": false,
			"trimmed": false,
			"pivot": {"x":0.5, "y":0.5}
		},
		{
			"filename": "piece_Captain",
			"frame": {"x":112, "y":0, "w":16, "h":16},
			"rotated": false,
			"trimmed": false,
			"pivot": {"x":0.5, "y":0.5}
		},
		{
			"filename": "piece_Penguin",
			"frame": {"x":0, "y":16, "w":16, "h":16},
			"rotated": false,
			"trimmed": false,
			"pivot": {"x":0.5, "y":0.5}
		},
		{
			"filename": "piece_Husky",
			"frame": {"x":16, "y":16, "w":16, "h":16},
			"rotated": false,
			"trimmed": false,
			"pivot": {"x":0.5, "y":0.5}
		},
		{
			"filename": "piece_Fisher",
			"frame": {"x":32, "y":16, "w":16, "h":16},
			"rotated": false,
			"trimmed": false,
			"pivot": {"x":0.5, "y":0.5}
		},
		{
			"filename": "piece_Walrus",
			"frame": {"x":48, "y":16, "w":16, "h":16},
			"rotated": false,
			"trimmed": false,
			"pivot": {"x":0.5, "y":0.5}
		},
		{
			"filename": "piece_Hunter",
			"frame": {"x":64, "y":16, "w":16, "h":16},
			"rotated": false,
			"trimmed": false,
			"pivot": {"x":0.5, "y":0.5}
		},
		{
			"filename": "piece_Polar_Bear",
			"frame": {"x":80, "y":16, "w":16, "h":16},
			"rotated": false,
			"trimmed": false,
			"pivot": {"x":0.5, "y":0.5}
		},
		{
			"filename": "piece_Narwhale",
			"frame": {"x":112, "y":16, "w":16, "h":16},
			"rotated": false,
			"trimmed": false,
			"pivot": {"x":0.5, "y":0.5}
		},
		{
			"filename": "piece_Rat",
			"frame": {"x":0, "y":32, "w":16, "h":16},
			"rotated": false,
			"trimmed": false,
			"pivot": {"x":0.5, "y":0.5}
		},
		{
			"filename": "piece_Infected",
			"frame": {"x":16, "y":32, "w":16, "h":16},
			"rotated": false,
			"trimmed": false,
			"pivot": {"x":0.5, "y":0.5}
		},
/*		{
			"filename": "piece_Raven",
			"frame": {"x":32, "y":32, "w":16, "h":16},
			"rotated": false,
			"trimmed": false,
			"pivot": {"x":0.5, "y":0.5}
		},*/
		{
			"filename": "piece_Reanimated",
			"frame": {"x":48, "y":32, "w":16, "h":16},
			"rotated": false,
			"trimmed": false,
			"pivot": {"x":0.5, "y":0.5}
		},
		{
			"filename": "piece_Flesh_Eater",
			"frame": {"x":64, "y":32, "w":16, "h":16},
			"rotated": false,
			"trimmed": false,
			"pivot": {"x":0.5, "y":0.5}
		},
		{
			"filename": "piece_Mad_Doctor",
			"frame": {"x":80, "y":32, "w":16, "h":16},
			"rotated": false,
			"trimmed": false,
			"pivot": {"x":0.5, "y":0.5}
		},
		{
			"filename": "piece_Patient_Zero",
			"frame": {"x":112, "y":32, "w":16, "h":16},
			"rotated": false,
			"trimmed": false,
			"pivot": {"x":0.5, "y":0.5}
		},
		{
			"filename": "piece_Crow",
			"frame": {"x":0, "y":48, "w":16, "h":16},
			"rotated": false,
			"trimmed": false,
			"pivot": {"x":0.5, "y":0.5}
		},
		{
			"filename": "piece_Raider",
			"frame": {"x":32, "y":48, "w":16, "h":16},
			"rotated": false,
			"trimmed": false,
			"pivot": {"x":0.5, "y":0.5}
		},
		{
			"filename": "piece_Wolf",
			"frame": {"x":48, "y":48, "w":16, "h":16},
			"rotated": false,
			"trimmed": false,
			"pivot": {"x":0.5, "y":0.5}
		},
		{
			"filename": "piece_Bard",
			"frame": {"x":64, "y":48, "w":16, "h":16},
			"rotated": false,
			"trimmed": false,
			"pivot": {"x":0.5, "y":0.5}
		},
		{
			"filename": "piece_Berserker",
			"frame": {"x":80, "y":48, "w":16, "h":16},
			"rotated": false,
			"trimmed": false,
			"pivot": {"x":0.5, "y":0.5}
		},
		{
			"filename": "piece_Ettin",
			"frame": {"x":112, "y":48, "w":16, "h":16},
			"rotated": false,
			"trimmed": false,
			"pivot": {"x":0.5, "y":0.5}
		},
		{
			"filename": "piece_Hyena",
			"frame": {"x":0, "y":64, "w":16, "h":16},
			"rotated": false,
			"trimmed": false,
			"pivot": {"x":0.5, "y":0.5}
		},
		{
			"filename": "piece_Trident",
			"frame": {"x":16, "y":64, "w":16, "h":16},
			"rotated": false,
			"trimmed": false,
			"pivot": {"x":0.5, "y":0.5}
		},
		{
			"filename": "piece_Lion",
			"frame": {"x":32, "y":64, "w":16, "h":16},
			"rotated": false,
			"trimmed": false,
			"pivot": {"x":0.5, "y":0.5}
		},
		{
			"filename": "piece_Gladiator",
			"frame": {"x":48, "y":64, "w":16, "h":16},
			"rotated": false,
			"trimmed": false,
			"pivot": {"x":0.5, "y":0.5}
		},
		{
			"filename": "piece_Chariot",
			"frame": {"x":80, "y":64, "w":16, "h":16},
			"rotated": false,
			"trimmed": false,
			"pivot": {"x":0.5, "y":0.5}
		},
		{
			"filename": "piece_Elephant",
			"frame": {"x":96, "y":64, "w":16, "h":16},
			"rotated": false,
			"trimmed": false,
			"pivot": {"x":0.5, "y":0.5}
		},
	]
};


var scene_wait_game = {
	preload : preload,
	create : function() {
		this.waitingText = this.add.text(100, 100, 'FANTASY CHESS', {font : "64px Arial", fill : "#ff66ff"});
		this.waitingText = this.add.text(10, 400, 'Searching for other player...', {font : "36px Arial", fill : "#ff66ff"});
		this.crown = this.add.image(400, 300, "spr_crown");
		this.crown.setDisplaySize(80, 80);
		this.noOpponent = function() {
			this.waitingText.setText('Waiting for other player...');
		}
		initClient(game);
	}
}

/*var scene_game_board = {
	preload : preload,
	create : create_board,
	update : update_board
}*/

function newSceneGameSession(nb, rawGameData) {
	if (nb == undefined) nb = 0;
	var _gameSession = new Phaser.Scene({
		key : "gameSession" + nb,
		active : true,
		visible : true
	});
//	_gameSession.gameData = core.createData(nb, rawGameData.players, rawGameData.boardDimensions, rawGameData.turns, rawGameData.currentTurn);
	_gameSession.gameData = rawGameData;
	core.classifyData(_gameSession.gameData);
	_gameSession.preload = preload;
	_gameSession.create = create_board;
	_gameSession.update = update_board;
	return _gameSession;
}

var config = {
	type : Phaser.AUTO,
	width : 800,
	height : 600,
	scene : [scene_wait_game],//, scene_game_board],
	antialias : false
//	antialias : true
};

var game = new Phaser.Game(config);
//client.phaserGame = game;

function preload() {
	this.load.image('tiles_board', 'assets/tiles_board.png');
	this.load.image('spr_crown', 'assets/crown.png');
//	this.load.image('tiles_board_zones', 'assets/tiles_board_zones.png');
	this.load.tilemapTiledJSON('tilemap_board', 'assets/tilemap_game_board.json');
	this.load.atlas('atlas_pieces', 'assets/tiles_pieces.png', ATLAS_PIECES);
	this.load.atlas('atlas_zones', 'assets/tiles_board_zones.png', {
		"frames": [
			{
				"filename": "zone_canMove",
				"frame": {"x":0, "y":0, "w":16, "h":16},
				"rotated": false,
				"trimmed": false,
				"pivot": {"x":0.5, "y":0.5}
			},
			{
				"filename": "zone_cannotMove",
				"frame": {"x":0, "y":16, "w":16, "h":16},
				"rotated": false,
				"trimmed": false,
				"pivot": {"x":0.5, "y":0.5}
			}
		]
	});
}


