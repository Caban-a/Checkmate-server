//(function(core) {
var core = {};
core.BOARD_SIZES = [8, 8];

/*var ACTING_PIECE = "ACTING_PIECE";
var ACTION = "ACTION";
var PLAYER = "PLAYER";
var TARGET_PIECE = "TARGET_PIECE";*/

core.ACT_FELL = "ACT_FELL";
core.ACT_MOVE = "ACT_MOVE";
core.ACT_PLACE = "ACT_PLACE";
core.ACT_PROMOTE = "ACT_PROMOTE";

core.CAPT_CONTACT = "CAPT_CONTACT";
core.CAPT_RANGED = "CAPT_RANGED";


core.isPosIn = function(aPos, anArray) {
	for (let iter of anArray) {
		if (iter.pos != undefined) iter = iter.pos;
		if (aPos[0] == iter[0] && aPos[1] == iter[1]) return true;
	}
	return false;
}

// TODO : move to sceneBoard if not used anywhere else
core.generateBoard = function(cols, rows) {
	var map_board = [];
	var _map_board_line;
	for (let i=0; i<rows; i+=1) {
		map_board_line = [];
		for (let j=0; j<cols; j+=1) {
			map_board_line.push((i + j + 1) % 2);
		}
		map_board.push(map_board_line);
	}
	return map_board;
}

// all the data of a game in a raw format (no classes or object functions)
core.createData = function(id, players, boardDimensions, turns, currentTurn) {
	var _gameData = {
		id : id,
		players : players,
		boardDimensions : boardDimensions,
		turns : turns,
		currentTurn : currentTurn
	}
	if (_gameData.turns == undefined) _gameData.turns = [];
	return _gameData;
}

// creates a class out of a game data object, giving it all methods necesasry to handle a game
core.classifyData = function(gd) {
	gd.currentTurnNb = function() {
		return this.turns.length + 1;
	}

	gd.actingPlayerNb = function(turnNb) {
		if (turnNb == undefined) turnNb = this.currentTurnNb();
		return turnNb % this.players.length;
	}

	gd.oppositePlayerNb = function(turnNb) {
		if (turnNb == undefined) turnNb = this.currentTurnNb();
		return (turnNb + 1) % this.players.length;
	}

	gd.hasLost = function() {
		var side;
		for (let sideNb of [this.actingPlayerNb(), this.oppositePlayerNb()]) {
			side = this.currentTurn.sides[sideNb];
			console.log("Crown");
			console.log(side.crown);
			console.log(this.currentTurn.pieces[side.crown]);
//			if (side.crown != undefined && side.command >= 0) if (this.currentTurn.pieces[side.crown].pos != "felled") continue;
			if (side.crown != undefined && side.command >= 0) if (turn.isPieceOnBoard(side.crown, this.currentTurn)) continue;
			return sideNb;
		}
	}
	
	gd.checkLost = function() {
		var loserNb = this.hasLost();
		if (loserNb != undefined) this.currentTurn.lost = loserNb;
	}
	
	gd.ended = function() {
		return this.currentTurn.lost != undefined;
	}

	gd.boardPos = function(pos) {
		return turn.boardPos(pos, this.currentTurn);
	}
	
/*	gd.isOnBoard = function(pieceId, turnNb) {
		if (turnNb == undefined) turnNb = this.turns.length - 1;
		return turn.isPieceOnBoard(pieceId, this.turns[turnNb]);
	}*/

	gd.recordTurn = function() {
		console.log(this.currentTurn.sides);
		this.turns.push(utils.jsonDeepCopy(this.currentTurn));
		this.currentTurn.lastPlayed = [];
	}

	gd.endTurn = function() {
/*		var playerCrown;
		for (let i=0; i<this.currentTurn.players.length; i+=1) {
			if (this.currentTurn.players[i].crown == undefined) {
				this.currentTurn.players[i].lost = true;
				continue;
			}
			playerCrown = this.currentTurn.pieces[this.currentTurn.players[i].crown];
			if (playerCrown != undefined) if (playerCrown.ownerNb == i && piece.isOnBoard(playerCrown)) continue;
			this.currentTurn.players[i].lost = true;
			break;
		}*/
		this.checkLost();
		
		// checking for the TRACKING ability
		var _pieceControl;
		for (let iter of turn.board(this.currentTurn)) {
			if (iter.ownerNb != this.actingPlayerNb()) continue;
			iter.trackTargets = [];
			if (!utils.isIn(piece.AB_TRACK, iter.abilities)) continue;
			_pieceZones = this.pieceZones(iter, true);
			for (let jter of turn.board(this.currentTurn)) {
				if (jter.ownerNb == this.actingPlayerNb()) continue;
				if (core.isPosIn(jter.pos, _pieceZones)) {
					iter.trackTargets.push(jter.id);
				}
			}
		}
		
//		this.turn += 1;
//		turnNb += 1;
		this.recordTurn();

		// check if the new player has a viable action
		var hasAction = false;
		for (let iter of turn.board(this.currentTurn)) {
			if (iter.ownerNb != this.actingPlayerNb()) continue;
			for (let jter of this.pieceZones(iter)) {
				if (!jter.canMove) continue;
				hasAction = true;
				break;
			}
			if (hasAction) break;
		}
		if (!hasAction) _turn.sides[this.actingPlayerNb()].lost = true;
	}
		
/*	gd.isEmpty = function(pos, turnNb) {
		return this.boardPos(pos, turnNb) == undefined;
	}*/

	gd.pieceZones = function(aPiece, resetTracking) {
		if (resetTracking == undefined) resetTracking = false;
		if (!piece.isOnBoard(aPiece)) return [];
		var flipMoveY = 1;
		if (aPiece.ownerNb == 1) flipMoveY = -1;
		var _pieceZones = [];
		var lineCanMove;
		var lineCaptured;
		var newPos;
		var canMove;
		var canSlide;
		var pieceOnNewPos;
		var pieceMet;
		
		if (!resetTracking) {
			if (utils.isIn(piece.AB_TRACK, aPiece.abilities) && aPiece.trackTargets != undefined) {
				for (let iter of aPiece.trackTargets) {
					if (turn.isPieceOnBoard(iter, this.currentTurn)) _pieceZones.push({
							pos : this.currentTurn.pieces[iter].pos.slice(),
							canMove : true,
							captured : [iter]
						});
				}
			}
//			if (utils.isIn(AB_IMMOBILE, aPiece.abilities)) return _pieceZones;
		}
		canMove = !utils.isIn(piece.AB_IMMOBILE, aPiece.abilities);
		for (let iter in aPiece.moves) {
			if (iter == "leap") {
				for (let jter of aPiece.moves[iter]) {
					newPos = [jter[0] + aPiece.pos[0], (jter[1] * flipMoveY) + aPiece.pos[1]];
					if (newPos[0] < 0 || newPos[1] < 0 || newPos[0] >= this.boardDimensions[0] || newPos[1] >= this.boardDimensions[1]) continue;
					pieceIdOnNewPos = turn.boardPos(newPos, this.currentTurn);
					if (pieceIdOnNewPos == undefined) _pieceZones.push({
							pos : newPos,
							canMove : canMove,
							captured : []
						});
					else _pieceZones.push({
							pos : newPos,
							canMove : canMove && this.currentTurn.pieces[pieceIdOnNewPos].ownerNb != aPiece.ownerNb,
							captured : [pieceIdOnNewPos]
						});
				}
				continue;
			}
			lineCanMove = [];
			lineCaptured = [];
			pieceMet = false;
			for (let j=1; j<=aPiece.moves[iter]; j+=1) {
				newPos = [(piece.PIECE_DIRECTIONS[iter][0] * j) + aPiece.pos[0], (piece.PIECE_DIRECTIONS[iter][1] * j * flipMoveY) + aPiece.pos[1]];
				if (newPos[0] < 0 || newPos[1] < 0 || newPos[0] >= this.boardDimensions[0] || newPos[1] >= this.boardDimensions[1]) break;
				pieceIdOnNewPos = turn.boardPos(newPos, this.currentTurn);
				if (pieceIdOnNewPos == undefined) lineCanMove.push({
						pos : newPos,
						canMove : canMove,
						captured : lineCaptured.slice()
					});
				else {
					lineCaptured.push(pieceIdOnNewPos);
					if (!pieceMet) lineCanMove.push({
						pos : newPos,
						canMove : canMove && this.currentTurn.pieces[pieceIdOnNewPos].ownerNb != aPiece.ownerNb,
						captured : lineCaptured.slice()
					});
					if (!utils.isIn(piece.AB_TRAMPLE, aPiece.abilities)) break;
					pieceMet = true;
				}
			}
			if (utils.isIn(piece.AB_SLIDE, aPiece.abilities)) {
//				lineCanMove = lineCanMove.slice(-1);
				canSlide = true;
				for (let j=lineCanMove.length-1; j>=0; j-=1) {
					if (canSlide) {
						if (lineCanMove[j].canMove) canSlide = false;
					} else lineCanMove[j].canMove = false;
				}
			}
			_pieceZones = _pieceZones.concat(lineCanMove);
		}
		return _pieceZones;
	}

	/*    def record(self, action, actingPlayer=None, actingPiece=None, targetPiece=None) :
			newRecord = {ACTION:action}
			if actingPiece != None :
				newRecord[ACTING_PIECE] = actingPiece
			if actingPlayer != None :
				newRecord[PLAYER] = actingPlayer
			if targetPiece != None :
				newRecord[TARGET_PIECE] = targetPiece
			self.replay.append(newRecord)*/

	/*	_gameData.moveTo = function(aPiece, pos) {
			aPiece.pos = pos.slice();
	//		self.record(ACT_PLACE, actingPlayer=self.currentPlayer(), actingPiece=aPiece);
		}*/

	gd.fell = function(felled, player) {
		for (let iter of felled.abilities) {
/*            if type(ability) == tuple :
				if ability[0] == SACRIFICE :
					felled.owner.command += ability[1]*/
		}
//        self.record(ACT_FELL, actingPlayer=self.currentPlayer(), targetPiece=felled)
//        for player in self.players :
//            if felled == player.ring :
//		player.captured.push(felled);
		felled.pos = "felled";
	}

	gd.capture = function(captured, capturer, typeCapture) {
		this.fell(captured, this.players[capturer.ownerNb]);
		if (utils.isIn(piece.AB_REWARD, capturer.abilities)) {
			this.currentTurn.sides[capturer.ownerNb].command += Math.ceil(captured.cost / 2);
		}
		if (typeCapture == piece.CAPT_CONTACT) {
			for (let iter of captured.abilities) {
				if (iter == piece.AB_POISON) piece.gainAbility(capturer, piece.AB_DISEASED);
			}
		}
	}

	gd.move = function(aPiece, dest) {		
		console.log("Moving !");
        this.currentTurn.lastPlayed.push({
			type : core.ACT_MOVE,
			origin : aPiece.pos.slice(),
			dest : dest.pos.slice()
		});
		var contactCapture = false;
		for (let iter of dest.captured) {
			this.capture(this.currentTurn.pieces[iter], aPiece, core.CAPT_CONTACT);
			_contactCapture = true;
		}
		aPiece.pos = dest.pos.slice();
		for (let iter of aPiece.abilities) {
//            if type(ability) == tuple :
//                if ability[0] == WAKE :
//                    self.place(ability[1](toMove.owner), origin)
//                    break
		}
//        if _contactCapture and KAMIKAZE in toMove.abilities :
//            this.fell(dest)
		this.endTurn();
	}
	
	// checks if a move is legal, does not check if the actor has the right to play
	// or if it's the right turn for the piece to move
	gd.tryMove = function(origin, dest) {
		console.log("Trying the move...");
		aPiece = this.currentTurn.pieces[turn.boardPos(origin, this.currentTurn)];
		if (aPiece == undefined) return;
		for (let iter of this.pieceZones(aPiece)) {
			if (iter.pos[0] == dest[0] && iter.pos[1] == dest[1] && iter.canMove) {
				this.move(aPiece, iter);
				return;
			}
		}
	}
		
	/*	_gameData.isInControlZone = function(nbPlayer, pos) {
			if (nbPlayer == 0) return (pos[1] <= this.players[nbPlayer].controlZone);
			else if (nbPlayer == 1) return (pos[1] >= 8 - this.players[nbPlayer].controlZone);
		}*/

/*		_gameData.canDeploy = function(thePiece) {
			var possible = [];
			var rowLimit = this.players[(thePiece.ownerNb)].controlZone;
			if (utils.isIn(INVASION, thsPiece.abilities)) rowLimit = core.BOARD_SIZES[1] - this.oppositePlayer(thePiece.ownerNb).controlZone;
			for (let i=0; i<rowLimit; i+=1) {
				for (let j=0; j<core.BOARD_SIZES[0]; j+=1) {
					if (isEmpty([i, j])) possible.push([i,j]);
				}
			}
			return possible;
		}*/
		

	/*    _gameData.deploy = function(toDeploy, dest) {
			this.players[(toDeploy.ownerNb)].reserves.remove(toDeploy);
			this.place(toDeploy, dest);
	//        self.record(ACT_PLACE, actingPlayer=self.currentPlayer(), actingPiece=toPlay)
		}*/
		
/*		_gameData.promote = function(origin) {
			var promotedPiece = this.onBoard(origin);
			this.controlZone += 1;
	//		if (this.controlZone >= 8) victory();
	//        self._reserves.append(promotedPiece)
	//        self.place(None, origin)
	//        self.record(ACT_PROMOTE, actingPlayer=self.currentPlayer(), actingPiece=promotedPiece)
		}
			
		return _gameData;
	}*/
	
	gd.selectFreeId = function() {
		var freeId = 0;
		while (this.currentTurn.pieces[freeId] != undefined) freeId += 1;
		return freeId;
	}

	gd.loadStartingPieces = function(setup, ownerNb, reversed) {
		if (reversed == undefined) reversed = false;
		var _piecePos;
		var _newPiece;
		for (let iter of setup) {
			if (iter[1][0] >= this.boardDimensions[0]) continue;
			_piecePos = iter[1].slice();
			if (reversed) _piecePos = [this.boardDimensions[0] - (_piecePos[0] + 1), this.boardDimensions[1] - (_piecePos[1] + 1)];
			_newPiece = piece.loadPiece(this.selectFreeId(), iter[0], ownerNb, _piecePos);
			turn.addPiece(_newPiece, this.currentTurn);
			if (iter.length > 2) if (iter[2] === true) this.currentTurn.sides[ownerNb].crown = _newPiece.id;
		}
	}
}

core.loadStartingGameData = function(id, players, boardDimensions, initialSides) {
	var _gameData = core.createData(id, players, boardDimensions);
	core.classifyData(_gameData);
	_gameData.currentTurn = turn.newTurn(initialSides);
//	loadStartingPieces(this.gameData.board, this.gameData.boardDimensions, FILIBUSTER_FLEET_STARTING1, 0, false);
//	loadStartingPieces(this.gameData.board, this.gameData.boardDimensions, FILIBUSTER_FLEET_STARTING1, 1, true);
//	_gameData.loadStartingPieces(piece.FROZEN_FRONTIER_STARTING1, 0, false);
//	_gameData.loadStartingPieces(piece.FROZEN_FRONTIER_STARTING1, 1, true);
//	_gameData.loadStartingPieces(piece.VALHALLA_WARRIORS_STARTING1, 0, false);
//	_gameData.loadStartingPieces(piece.VALHALLA_WARRIORS_STARTING1, 1, true);
	_gameData.loadStartingPieces(piece.	ARENA_MASTERS_STARTING1, 0, false);
	_gameData.loadStartingPieces(piece.	ARENA_MASTERS_STARTING1, 1, true);
	_gameData.recordTurn();
	return _gameData;
}
	/*
	def loadRoster(player, roster) :
		for pieceName, pieceCharacs in roster :
			player.available[pieceName] = pieceCharacs


	# TODO : use turn numbers in record to avoid SLOW glitch when using replay
	def isSlow(gameData, aPiece) :
		if SLOW not in aPiece.abilities :
			return False
		players = []
		for action in reversed(gameData.replay) :
			if action.PLAYER in players :
				return False
			players.append(action.PLAYER)
			if action.ACTING_PIECE == aPiece or (action.TARGET_PIECE == aPiece and action.ACTION == ENTANGLE) :
				return True
		return False

	// returns all squares in line between origin and dest
	function traceLine(origin, dest) {
		factor = max(1, abs(dest[0]-origin[0])) * max(1, abs(dest[1]-origin[1])) *2
		print factor
		inLine = []
		for i in range(1, factor) :
			newSpot = ((((2*i*(dest[0]-origin[0])) / factor) + [1,-1][dest[0]<origin[0]])/2 + origin[0],\
					(((2*i*(dest[1]-origin[1])) / factor) + [1,-1][dest[1]<origin[1]])/2 + origin[1])
			if VERBOSE :
				print newSpot
			if newSpot not in inLine + [origin, dest] :
				inLine.append(newSpot)
		return inLine
	}

	// returns True if all cases in a straight line betweeen the centers of origin and dest are free
	function freeLine(origin, dest, board) {
		for (spot in traceLine(origin, dest)) {
			if isinstance(board(spot), Piece) :
				return False
		}
		return True
	}

	def reach(gameData, origin) :
		"""Returns the squares that a piece at origin can reach."""
		if gameData.isEmpty(origin) :
			return []
		originPiece = gameData.board(origin)
		inRange, canMove = [], []
		for move in originPiece.moves :
			if originPiece.owner == gameData.players[0] :
				dest = (origin[0] + move[0], origin[1] + move[1])
			else :
				dest = (origin[0] - move[0], origin[1] - move[1])
			if dest[0] in range(core.BOARD_SIZES[0]) and dest[1] in range(core.BOARD_SIZES[1]) :
				destSpot = gameData.board(dest)
				if originPiece.moveType == LEAP or\
						freeLine(origin, dest, gameData.board) :
					inRange.append(dest)
				if (TRAMPLE in originPiece.abilities and gameData.isEmpty(dest)) :
					canMove.append(dest)
				elif dest in inRange and originPiece.moveType != IMMOBILE :
					if gameData.isEmpty(dest) :
						canMove.append(dest)
					elif destSpot.owner != originPiece.owner :
						if FEAR not in destSpot.abilities or FEAR in originPiece.abilities :
							canMove.append(dest)
						elif origin not in reach(gameData, dest)[0] :
							canMove.append(dest)
		return inRange, canMove

	def tryPromote(gameData, origin) :
		"""The current player tries to promote a piece."""
		if not isinstance(gameData.board(origin), Piece) :
			raise Exception("No piece in this spot.")
		if gameData.board(origin).owner != gameData.currentPlayer() :
			raise Exception("You can only move or act your own pieces.")
		if origin not in gameData.oppositePlayer().homeZone :
			raise Exception("This piece is not in your opponent's home zone.")
		gameData.promote(origin)

	def tryMove(gameData, origin, dest) :
		"""The current player tries to move a piece."""
		if not isinstance(gameData.board(origin), Piece) :
			raise Exception("No piece in this spot.")
		if gameData.board(origin).owner != gameData.currentPlayer() :
			raise Exception("You can only move or act your own pieces.")
		price = 0
		for ability in gameData.board(origin).abilities :
			if type(ability) == tuple :
				if ability[0] == RETIVE :
					price += ability[1]
		if price > gameData.currentPlayer().command :
			raise Exception("That piece is Retive and you do not have enough command points to move it.")
		if dest in reach(gameData, origin)[1] :
			gameData.currentPlayer().command -= price
			gameData.move(origin, dest)

	def tryBuy(gameData, pieceName) :
		"""The current player tries to buy a piece."""
		if pieceName not in gameData.currentPlayer().available.keys() :
			raise Exception("You cannot buy such a piece.")
		if gameData.currentPlayer().available[pieceName][1] > gameData.currentPlayer().command :
			raise Exception("No enough command points.")
		gameData.currentPlayer().command -= gameData.currentPlayer().available[pieceName][1]
		gameData._reserves.append(gameData.currentPlayer().available[pieceName][0](gameData.currentPlayer(),\
				name=pieceName, cost=gameData.currentPlayer().available[pieceName][1]))

	def tryPlay(gameData, reservePos, dest) :
		"""The current player tries to play a piece."""
		thePiece = [elem for elem in gameData._reserves if elem.owner==gameData.currentPlayer()][reservePos]
		if isinstance(gameData.board(dest), Piece) :
			raise Exception("There is already a piece on the board at that spot.")
		if dest not in gameData.canPlay(thePiece) :
			raise Exception("You cannot play that piece here.")
		gameData.play(thePiece, dest)
	*/











//})(typeof exports === "undefined"? this['core']={} : exports);
if (typeof exports !== 'undefined') module.exports = function() {
	this.core = core;
}
