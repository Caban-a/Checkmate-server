var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

// directories with game resources
app.use('/js', express.static(__dirname + '/js'));
app.use('/assets', express.static(__dirname + '/assets'));

// alternative way :
// piece = require('./js/piece.js');
// and in piece.js :
// module.exports = {
//	loadPiece¨ : loadPiece
//}
/*require('./js/utils.js')();
require('./js/piece.js')();
require('./js/player.js')();
require('./js/gameData.js')();*/
//console.log("TestVar2 : " + helloWorldVar2);
require('./js/utils.js')();
require('./js/piece.js')();
require('./js/side.js')();
require('./js/turn.js')();
require('./js/core.js')();



server.gameSessions = {};
server.clients = {};


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

server.listen(80, function() { // Listens to port 8080
    console.log('Listening on ' + server.address().port);
});

server.giveClientId = function(socket) {
	var _clientId = 1;
	while (this.clients[_clientId] != undefined) _clientId += 1;
	this.clients[_clientId] = socket;
	socket.playerId = _clientId;
}

server.createGame = function(player1Id, player2Id) {
	var _gameId = 1;
	while (this.gameSessions[_gameId] != undefined) _gameId += 1;
/*	this.gameSessions[_gameId] = core.loadStartingGameData(_gameId, [
			side.newSide(player1Id, 10, [], []),
			side.newSide(player2Id, 20, [], [])
		], core.BOARD_SIZES);*/
	this.gameSessions[_gameId] = core.loadStartingGameData(_gameId, [player1Id, player2Id], core.BOARD_SIZES, [
			side.newSide(player1Id, 10, [], []),
			side.newSide(player2Id, 20, [], [])
		]);
	return [_gameId, this.gameSessions[_gameId]];
}

// cheap function to find an idle player, excluding asking (asking wants to be matched with an idle player)
server.freePlayer = function(asking) {
	var playerBusy;
	for (let iter in this.clients) {
		if (iter == asking) continue;
		playerBusy = false;
		for (let jter in this.gameSessions) {
			for (let kter of this.gameSessions[jter].players) {
				if (kter == iter) {
					playerBusy = true;
					break;
				}
			}
			if (playerBusy) continue;
		}
		if (!playerBusy) return iter;
	}
}


// example
/*io.on('connection', function(socket) {
    socket.on('newplayer', function() {
        socket.player = {
            id : server.lastPlayderID
        };
		server.lastPlayderID += 1;
        socket.emit('allplayers', getAllPlayers());
        socket.broadcast.emit('newplayer', socket.player);
    });
});
function getAllPlayers(){
    var players = [];
    Object.keys(io.sockets.connected).forEach(function(socketID){
        var player = io.sockets.connected[socketID].player;
        if(player) players.push(player);
    });
    return players;
}*/
io.on('connection', function(socket) {
/*	socket.on('newPlayer', function(data) {
		server.giveClientId(socket);
		var _freeOpponent = server.freePlayer(socker.player1Id);
		if (_freeOpponent == undefined) {
			socket.emit('noOpponent');
			return;
		}
		var _newGame = server.createGame(_freeOpponent, asking);
		for (let iter of [_freeOpponent, asking]) {
			server.clients[iter].emit("gameStart", ..._newGame);
		}
	});*/
	console.log("A client connected !");
	server.giveClientId(socket);
	socket.emit('connected', socket.playerId);
	console.log(socket.playerId);
	var _freeOpponent = server.freePlayer(socket.playerId);
	if (_freeOpponent == undefined) {
		console.log("No opponent. Client list :");
		console.log(Object.keys(server.clients));
		socket.emit('noOpponent');
	} else {
		var _newGame = server.createGame(_freeOpponent, socket.playerId);
		for (let iter of [_freeOpponent, socket.playerId]) {
			console.log("Sending game start to player with id number " + iter);
			server.clients[iter].emit("gameStart", ..._newGame);
		}
	}
	
    socket.on('tryMovePiece', function(data) {
		console.log("Trying to move a piece.");
		// does the game session exist ?
		var _chosenGame = server.gameSessions[data.gameId];
		if (_chosenGame == undefined) return;
		console.log("Found game session.");
		
		console.log(_chosenGame.players[_chosenGame.actingPlayerNb()]);
		console.log(socket.playerId);
		// TODO : log the whole game for code analysis
		// is the sender allowed to move a piece ?
		if (_chosenGame.players[_chosenGame.actingPlayerNb()] != socket.playerId) {
			console.log("Move cancelled : not the player's turn.");
			return;
		}
		// is the game over ?
		if (_chosenGame.ended()) {
			console.log("Move cancelled : game already over.");
			return;
		}
		console.log("Player allowed to make move.");
				
		// whether or not the move was legal or had any effect, sends the updated game state to the players
		_chosenGame.tryMove(data.origin, data.dest);
		for (let iter of _chosenGame.players) {
			console.log("Sending updated game state.");
			server.clients[iter].emit('updateGameData', _chosenGame);
		}
    });

    socket.on('tryMovePiece', function(data) {
		console.log("A player wants to leave the game.");
		// does the game session exist ?
		var _chosenGame = server.gameSessions[data.gameId];
		if (_chosenGame == undefined) return;
		console.log("Found game session.");
    });		
});









