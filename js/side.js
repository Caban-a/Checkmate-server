var side = {};
side.newSide = function(id, command, rosters, deployZone, crown) {
	var _side = {
		id : id,
		command : command,
		rosters : rosters,
		deployZone : deployZone,
		crown : crown
	}
	if (_side.rosters == undefined) _side.rosters = [];
	if (_side.reserve == undefined) _side.reserve = [];
	if (_side.captured == undefined) _side.captured = [];
	if (_side.deployZone == undefined) _side.deployZone = 2;
	
	return _side;
}
if (typeof exports !== 'undefined') module.exports = function() {
	this.side = side;
}




