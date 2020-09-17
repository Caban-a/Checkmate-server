var MAP_BOARD = [
	[1, 0, 1, 0, 1, 0, 1, 0],
	[0, 1, 0, 1, 0, 1, 0, 1],
	[1, 0, 1, 0, 1, 0, 1, 0],
	[0, 1, 0, 1, 0, 1, 0, 1],
	[1, 0, 1, 0, 1, 0, 1, 0],
	[0, 1, 0, 1, 0, 1, 0, 1],
	[1, 0, 1, 0, 1, 0, 1, 0],
	[0, 1, 0, 1, 0, 1, 0, 1]
];

var DISPLAY_SIZES = [64, 64];

var TRANSPARENT_TINT = "0xffffff";
var PLAYER_COLORS = [
	"ff5555",
	"5555ff"
];
var PLAYER_INFO_POS = [
	[550, 500],
	[550, 100]
]
var CONTROL_COLOR_FADE = 0.5;

//function boardToDisplayCoords(x, y, boardOrigins, squareSizes, nbRows, fromBottom) {
function boardToDisplayCoords(x, y, grid, boardDimensions, fromBottom) {
	if (fromBottom == undefined) fromBottom = true;
//	if (fromBottom) y = nbRows - (y + 1);
//	return [boardOrigins[0] + (squareSizes[0] * x), boardOrigins[1] + (squareSizes[1] * y)];
	if (fromBottom) y = boardDimensions[1] - (y + 1);
	return grid.tileToWorldXY(x, y);
}

function displayToBoardCoords(x, y, grid, boardDimensions, fromBottom) {
	if (fromBottom == undefined) fromBottom = true;
//	var pos = [Math.floor((x - boardOrigins[0]) / squareSizes[0]), Math.floor((y - boardOrigins[1]) / squareSizes[1])];
	var pos = grid.worldToTileXY(x, y);
	if (pos.x < 0 || pos.x >= boardDimensions[0] || pos.y < 0 || pos.y >= boardDimensions[1]) return;
	if (fromBottom) pos.y = boardDimensions[1] - (pos.y + 1);
	return pos;
}

//function updateControlZones(caller, mainBoardLayer, gameData, fromBottom) {
function updateBoardZones(caller, gameData, squareSizes, fromBottom) {
	if (fromBottom == undefined) fromBottom = true;

	var zoneSprite;
	var spritePos;
	var spriteRef;
	if (caller.boardZones != undefined) {
		for (let i=caller.boardZones.length-1; i>=0; i-=1) caller.boardZones[i].destroy();
	}
	caller.boardZones = [];

	var hoveredZones = [];
	if (caller.boardView.hoveredPieceId != undefined) {
		hoveredZones = gameData.pieceZones(gameData.currentTurn.pieces[caller.boardView.hoveredPieceId]);
	}

	for (let iter of hoveredZones) {
// could also used pieceSprite.setFrame(jter.id) to set the correct piece image
//			pieceSprite = caller.add.sprite(...boardToDisplayCoords(...jter.pos, boardOrigins, squareSizes, gameData.boardDimensions[1]), 'atlas_pieces', jter.id);
		spritePos = boardToDisplayCoords(...iter.pos, caller.layer_board_main, gameData.boardDimensions, fromBottom);
		if (iter.canMove) spriteRef = "zone_canMove";
		else spriteRef = "zone_cannotMove";
		zoneSprite = caller.add.sprite(spritePos.x, spritePos.y, 'atlas_zones', spriteRef);
		zoneSprite.setOrigin(0, 0);
		zoneSprite.setDisplaySize(...squareSizes);
		zoneSprite.setTint("0x" + PLAYER_COLORS[caller.gameData.currentTurn.pieces[caller.boardView.hoveredPieceId].ownerNb]);
		zoneSprite.setAlpha(0.5);
		zoneSprite.serverZoneObj = iter;
		caller.boardZones.push(zoneSprite);
	}
	
/*	for (let i=0; i<gameData.boardDimensions[0]; i+=1) {
		for (let j=0; j<gameData.boardDimensions[1]; j+=1) {
			if (fromBottom) _tile = mainBoardLayer.getTileAt(i, gameData.boardDimensions[1] - (j+1));
			else _tile = mainBoardLayer.getTileAt(i, j);
			_tile.tint = TRANSPARENT_TINT;
			for (let kter of hoveredPossibleMoves) {
				if (kter.zone[0] == i && kter.zone[1] == j) {
					for (let lter of ["red", "green", "blue"]) {
						_tint[lter] = 255 - ((255 - _tint[lter]) * CONTROL_COLOR_FADE);
					}
					_tile.tint = _tint.color;
					break;
				}
			}
		}
	}*/
}

function updateBoardPieces(caller, gameData, squareSizes) {
	var pieceSprite;
	var crownSprite;
	var spritePos;
	if (caller.boardPieces != undefined) {
		for (let i=caller.boardPieces.length-1; i>=0; i-=1) {
			if (caller.boardPieces[i].crown != undefined) caller.boardPieces[i].crown.destroy();
			caller.boardPieces[i].destroy();
		}
	}
	caller.boardPieces = [];
	for (let iter of turn.board(gameData.currentTurn)) {
		// could also used pieceSprite.setFrame(jter.id) to set the correct piece image
//			pieceSprite = caller.add.sprite(...boardToDisplayCoords(...jter.pos, boardOrigins, squareSizes, gameData.boardDimensions[1]), 'atlas_pieces', jter.id);
		spritePos = boardToDisplayCoords(...iter.pos, caller.layer_board_main, gameData.boardDimensions, true);
		pieceSprite = caller.add.sprite(spritePos.x, spritePos.y, 'atlas_pieces', iter.templateName);
		pieceSprite.setOrigin(0, 0);
		pieceSprite.setDisplaySize(...squareSizes);
		pieceSprite.setTint("0x" + PLAYER_COLORS[iter.ownerNb]);
		pieceSprite.serverPieceObj = iter;
		caller.boardPieces.push(pieceSprite);
		for (let jter of gameData.currentTurn.sides) {
			console.log(jter.crown);
			if (iter.id == jter.crown) {
				crownSprite = caller.add.image(spritePos.x, spritePos.y, 'spr_crown');
				crownSprite.setOrigin(0, 0);
				crownSprite.setDisplaySize(...squareSizes);
				pieceSprite.crown = crownSprite;
			}
		}
	}
}

function updateLastPlayed(caller, gameData, squareSizes) {
	console.log(gameData.currentTurn.lastPlayed);
	var lpSprite;
	var spritePos;
	if (caller.lastPlayed != undefined) {
		for (let i=caller.lastPlayed.length-1; i>=0; i-=1) {
			caller.lastPlayed[i].destroy();
		}
	}
	caller.lastPlayed = [];
	for (let iter of gameData.turns[gameData.turns.length-1].lastPlayed) {
		for (let jter of ["origin", "dest"]) {
			if (iter[jter] == undefined) continue;
			spritePos = boardToDisplayCoords(...iter[jter], caller.layer_board_main, gameData.boardDimensions, true);
			lpSprite = caller.add.sprite(spritePos.x, spritePos.y, 'atlas_zones', "zone_canMove");
			lpSprite.setOrigin(0, 0);
			lpSprite.setDisplaySize(...squareSizes);
			lpSprite.setAlpha(0.5);
//			lpSprite.setTint("0x" + PLAYER_COLORS[iter.ownerNb]);
//			lpSprite.serverPieceObj = iter;
			caller.lastPlayed.push(lpSprite);
		}
	}
}

function playerNb(gameData) {
	for (let i=0; i<gameData.players.length; i+=1) if (gameData.players[i] == client.socket.playerId) return i;
}

function updateWhosTurn(caller, gameData) {
	if (gameData.currentTurn.lost == playerNb(gameData)) caller.whosTurn.setText("Opponent won !");
	else if (gameData.currentTurn.lost != undefined) caller.whosTurn.setText("You won !");
	else if (gameData.actingPlayerNb() == playerNb(gameData)) caller.whosTurn.setText("Your turn");
	else caller.whosTurn.setText("Opponent's turn");
}

function updateLeaveButton(caller, gameData) {
	if (gameData.ended()) caller.leaveButton.setText("ESC to leave game");
	else caller.leaveButton.setText("ESC to concede game");
}

function snapToGrid(x, y, grid, boardDimensions, fromBottom) {
	var boardCoords = displayToBoardCoords(x, y, boardOrigins, squareSizes, boardDimensions, fromBottom);
	if (boardCoords == undefined) return;
	return boardToDisplayCoords(boardCoords.x, boardCoords.y, grid, boardDimensions[1], fromBottom);
}

/*function myColorPiece(aPiece, gameData) {
	return gameData.players[aPiece.ownerNb].id == client.socket.playerId;
}*/


//********** BOARD SCENE **********

function create_board() {
	var theBoard = core.generateBoard(...this.gameData.boardDimensions);
/*	var map_board = this.make.tilemap({key:'tilemap_board'});
	var tileset_board = map_board.addTilesetImage("tiles_game_board", "tiles_board");
	this.layer_board_main = map_board.createDynamicLayer("Tile Layer 1", tileset_board);*/
	var map_board = this.make.tilemap({ data: theBoard, tileWidth: 32, tileHeight: 32 });
//	var tileset_board = map_board.addTilesetImage("");
	var tileset_board = map_board.addTilesetImage("tiles_game_board", "tiles_board");
	this.layer_board_main = map_board.createDynamicLayer(0, tileset_board, 0, 0);
	this.layer_board_main.displayWidth = DISPLAY_SIZES[0] * 8;
	this.layer_board_main.displayHeight = DISPLAY_SIZES[1] * 8;
	this.layer_board_main.x = 0;
	this.layer_board_main.y = (config.height - this.layer_board_main.displayHeight) / 2;

/*	var map_board_zones = this.make.tilemap({key:'tilemap_board_zones'});
	var tileset_board_zones = map_board_zones.addTilesetImage("tiles_game_board_zones", "tiles_board_zones");
	this.layer_board_main = map_board.createDynamicLayer("Tile Layer 2", tileset_board);*/
	var yourNb = playerNb(this.gameData);
	this.add.text(...PLAYER_INFO_POS[yourNb], 'You', {font : "48px Arial", fill : "#" + PLAYER_COLORS[yourNb]});
	this.add.text(...PLAYER_INFO_POS[(yourNb + 1) % this.gameData.players.length], 'Opponent', {font : "48px Arial", fill : "#" + PLAYER_COLORS[(yourNb + 1) % this.gameData.players.length]});
	this.whosTurn = this.add.text(550, 300, '', {font : "32px Arial", fill : "#ffffff"});
	this.leaveButton = this.add.text(550, 10, '', {font : "16px Arial", fill : "#ffffff"});
    var escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
/*	escKey.on('down', function (key, event) {
        // event.stopPropagation();
        client.askLeave();
    });*/

	updateBoardPieces(this, this.gameData, DISPLAY_SIZES);
	updateLastPlayed(this, this.gameData, DISPLAY_SIZES);
	updateWhosTurn(this, this.gameData);
	updateLeaveButton(this, this.gameData);
	this.boardView = {
//		hoveredPiece :
//		movedPiece :
//		hoveredControlZone : []
	}
	
	this.checkMousePos = function(pointer) {
//		var pos = snapToGrid(pointer.x, pointer.y, [this.layer_board_main.x, this.layer_board_main.y], DISPLAY_SIZES, core.BOARD_SIZES, true);
		var pos = displayToBoardCoords(pointer.x, pointer.y, this.layer_board_main, core.BOARD_SIZES, true);
		if (pos == undefined) return;
		
		if (this.boardView.movedPiece == undefined) {
			this.boardView.hoveredPieceId = turn.boardPos([pos.x, pos.y], this.gameData.currentTurn);
			updateBoardZones(this, this.gameData, DISPLAY_SIZES, true);
		} else {
//			pos = boardToDisplayCoords(...pos, [this.layer_board_main.x, this.layer_board_main.y], DISPLAY_SIZES, core.BOARD_SIZES[1], true);
			pos = boardToDisplayCoords(pos.x, pos.y, this.layer_board_main, core.BOARD_SIZES, true);
			this.boardView.movedPiece.x = pos.x;
			this.boardView.movedPiece.y = pos.y;
		}
	}
	this.input.on('pointermove', function(pointer) {
		this.checkMousePos(pointer);
	}, this);
	
	this.updateGameView = function(rawGameData) {
		if (rawGameData != undefined) {
			this.gameData = rawGameData;
			core.classifyData(this.gameData);
		}
		console.log("Sides");
		console.log(this.gameData.currentTurn.sides);
		updateBoardPieces(this, this.gameData, DISPLAY_SIZES);
		updateLastPlayed(this, this.gameData, DISPLAY_SIZES);
		updateWhosTurn(this, this.gameData);
		updateLeaveButton(this, this.gameData);
		this.checkMousePos(game.input.mousePointer.x, game.input.mousePointer.y);
	}
}

function update_board() {
	if (this.input.mousePointer.justDown && !this.gameData.ended()) {
		var boardPos = displayToBoardCoords(this.input.mousePointer.downX, this.input.mousePointer.downY, this.layer_board_main, core.BOARD_SIZES, true);
		if (boardPos != undefined) {
			if (this.boardView.movedPiece == undefined) {
				for (let iter of this.boardPieces) {
					if (iter.serverPieceObj.pos == undefined) continue;
					if (iter.serverPieceObj.pos[0] == boardPos.x && iter.serverPieceObj.pos[1] == boardPos.y) {
						if (iter.serverPieceObj.ownerNb == this.gameData.actingPlayerNb() && this.gameData.players[this.gameData.actingPlayerNb()] == client.socket.playerId) {
							this.boardView.movedPiece = iter;
							this.boardView.movedPiece.alpha = 0.5;
						}
						break;
					}
				}
			} else {
				var movedPiece = this.boardView.movedPiece.serverPieceObj;
				var triedMove = false;
				this.boardView.movedPiece = undefined;
				for (let iter of this.gameData.pieceZones(movedPiece)) {
					if (iter.pos[0] == boardPos.x && iter.pos[1] == boardPos.y) {
						if (iter.canMove !== true) continue;
//						this.gameData.move(movedPiece, iter);
						client.askMovePiece(this.gameData.id, movedPiece, iter);
						triedMove = true;
						break;
					}
				}
				if (!triedMove) this.updateGameView();
/*				updateBoardPieces(this, this.gameData, DISPLAY_SIZES);
				this.boardView.hoveredPiece = this.gameData.onBoard([boardPos.x, boardPos.y]);
				updateBoardZones(this, this.gameData, DISPLAY_SIZES, true);*/
			}
		}
	}
}




