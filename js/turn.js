var turn = {};
//turn.newTurn = function(players, board, lastPlayed) {
turn.newTurn = function(sides, pieces, lastPlayed) {
	var _turn = {
		sides : sides,
//		board : board,
		pieces : pieces,
		lastPlayed : lastPlayed,
		lost : undefined
	}
	if (_turn.pieces == undefined) _turn.pieces = {};
	if (_turn.lastPlayed == undefined) _turn.lastPlayed = [];
	return _turn;
}

turn.boardPos = function(pos, aTurn) {
//	return aTurn.board[JSON.stringify(pos)];
	for (let iter in aTurn.pieces) {
		if (aTurn.pieces[iter].pos[0] == pos[0] && aTurn.pieces[iter].pos[1] == pos[1]) return iter;
	}
}

turn.isPieceOnBoard = function(pieceId, aTurn) {
	if (aTurn.pieces[pieceId] == undefined) return false;
	return piece.isOnBoard(aTurn.pieces[pieceId]);
}

turn.isEmpty = function(pos, aTurn) {
	return turn.boardPos(pos, aTurn) == undefined;
}

turn.board = function(aTurn) {
	var _board = [];
	for (let iter in aTurn.pieces) {
		if (!turn.isPieceOnBoard(iter, aTurn)) continue;
		_board.push(aTurn.pieces[iter]);
	}
	return _board;
}

turn.addPiece = function(aPiece, aTurn) {
	var idNb = 0;
	var _id;
	while (_id == undefined || aTurn.pieces[_id] != undefined) {
		idNb += 1;
		_id = "p" + idNb;
	}
	aPiece.id = _id;
	aTurn.pieces[_id] = aPiece;
}
	
/*turn.end = function(aTurn) {
	var playerCrown;
	for (let i=0; i<aTurn.players.length; i+=1) {
		if (aTurn.players[i].crown == undefined) {
			aTurn.players[i].lost = true;
			continue;
		}
		playerCrown = aTurn.pieces[aTurn.players[i].crown];
		if (playerCrown == undefined) {
			aTurn.players[i].lost = true;
			continue;
		}
		if (playerCrown.ownerNb != i || typeof(playerCrown.pos) == "string") aTurn.players[i].lost = true;
	}
	
	var _pieceControl;
	for (let iter of aTurn.pieces) {
		if (typeof(iter.pos) == "string") continue;
//		if (iter.ownerNb != this.currentPlayer()) continue;
		iter.trackTargets = [];
		if (!utils.isIn(piece.AB_TRACK, iter.abilities)) continue;
		_pieceZones = aTurn.pieceZones(iter, true);*/
/*		for (let jter of this.board) {
			if (jter.ownerNb == this.currentPlayer()) continue;
			if (core.isPosIn(jter.pos, _pieceZones)) {
				iter.trackTargets.push(jter);
			}
		}*/
/*	}
	
	this.turn += 1;

	// check if the new player has a viable action
	var hasAction = false;
	for (let iter of this.board) {
		if (iter.ownerNb != this.currentPlayer()) continue;
		for (let jter of this.pieceZones(iter)) {
			if (!jter.canMove) continue;
			hasAction = true;
			break;
		}
		if (hasAction) break;
	}
	if (!hasAction) this.players[this.currentPlayer()].lost = true;
}*/


	
if (typeof exports !== 'undefined') module.exports = function() {
	this.turn = turn;
}
