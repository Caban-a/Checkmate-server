var client;

function initClient(phaserGame) {
	client = {
//		socket : io.connect(),
		socket : io.connect('http://localhost:3000'),
		phaserGame : phaserGame
	};

	client.askMovePiece = function(gameId, movedPiece, dest) {
		console.log("Trying to move a piece...");
		this.socket.emit('tryMovePiece', {
			gameId : gameId,
			origin : movedPiece.pos,
			dest : dest.pos
		});
	};
	
	client.askLeave = function() {
		console.log("Trying to leave game...");
		this.socket.emit('tryLeave', {
			gameId : gameId
		});
	}

	client.socket.on('connected', function(playerId) {
		console.log("Connected to server with id " + playerId);
		client.socket.playerId = playerId;
	});

	client.socket.on('noOpponent', function() {
		console.log("No opponent for the moment.");
		if (client.phaserGame == undefined) return;
		for (let iter of client.phaserGame.scene.scenes) {
			if (iter.noOpponent == undefined) continue;
			iter.noOpponent();
		}
	});

	client.socket.on('gameStart', function(gameId, rawGameData) {
		if (client.phaserGame == undefined) return;
		console.log("Starting game session.");
		console.log(client.phaserGame.scene.scenes);
//		for (let i=client.phaserGame.scene.scenes.length-1; i>=0; i-=1) client.phaserGame.scene.scenes[i].destroy();
		client.phaserGame.scene.scenes = [];
		client.phaserGame.scene.add(gameId, newSceneGameSession(gameId, rawGameData), true);
	});

	client.socket.on('updateGameData', function(rawGameData) {
		console.log("Received game state update.");
		if (client.phaserGame == undefined) return;
		for (let iter of client.phaserGame.scene.scenes) {
			if (iter.updateGameView == undefined) continue;
			iter.updateGameView(rawGameData);
		}
	});
}




