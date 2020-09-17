var utils = {};

//***** UTILITARY FUNCTIONS


// does not copy methods, doesn't work with Date
utils.jsonDeepCopy = function(obj) {
	return JSON.parse(JSON.stringify(obj));
}


//** MATH
utils.modulo = function(x, y) {
	while (x < 0) x += y;
	return x % y;
}

utils.dist = function(x1, y1, x2, y2) {
	return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}


//** DICTIONARY
utils.addElement = function(aKey, anElem, aDictionary) {
	if (aDictionary[aKey] == undefined) aDictionary[aKey] = [anElem];
	else aDictionary[aKey].push(anElem);
}

//** ARRAY
utils.nbIn = function(anElement, anArray) {
	var matching = 0;
	for (let i of anArray) {
		if (i == anElement) matching += 1;
	}
	return matching;
}

utils.shuffleArray = function(anArray) {
	for (let i=anArray.length; i>0; i-=1) {
		var chosen = Math.floor(Math.random() * i);
		anArray.push(anArray[chosen]);
		anArray.splice(chosen, 1);
	}
}

utils.nbDifferentElems = function(anArray) {
	diffElems = [];
	for (let i of anArray) {
		if (!utils.isIn(i, diffElems)) diffElems.push(i);
	}
	return diffElems.length;
}

utils.removeElem = function(anElem, anArray) {
	for (let i=0; i<anArray.length; i+=1) {
		if (anArray[i] === anElem) {
			anArray.splice(i, 1);
			return true;
		}
	}
	return false;
}

utils.uniquePos = function(anElem, anArray) {
	for (let i=0; i<anArray.length; i+=1) if (anArray[i] == anElem) return i;	
}

utils.isIn = function(anElem, anArray) {
	if (utils.uniquePos(anElem, anArray) == undefined) return false;
	else return true;
}

utils.shiftElem = function(anElem, anArray, val) {
	for (let i=0; i<anArray.length; i+=1) if (anArray[i] == anElem) {
		if (i + val < 0 || i + val >= anArray.length) return;
		return anArray[i + val];
	}
},

utils.randChoice = function(anArray) {
	return anArray[Math.floor(Math.random() * anArray.length)];
}

utils.nextPos = function(anArray, pos) {
	return (pos + 1) % anArray.length;
}

utils.areEqual = function(array1, array2) {
	if (array1.length != array2.length) return false;
	for (let iter of array1) {
		if (!utils.isIn(iter, array2)) return false;
	}
	return true;
}


//** TEXT

utils.initials = function(txt) {
	return txt.charAt(0).toUpperCase() + txt.slice(1);
}

utils.integerWithCommas = function(integer) {
	if (typeof integer != "string") integer = integer.toString();
	var thousands = [];
	for (let i=integer.length; i>0; i-=3) {
		thousands.unshift(integer.slice(Math.max(0, i-3), i));
	}
	return thousands.join(",");
}


// ***** GRAPHICAL

utils.randomColorChange = function(colorValues) {
	var col = "#";
	for (let i in colorValues) {
		for (let j=0; j<100; j+=1) colorValues[i] = Math.max(0, Math.min(255, Math.floor(Math.random() * 3) + colorValues[i] - 1));
		col += ("0" + colorValues[i].toString(16)).slice(-2);
	}
	return col;
}
//if (typeof exports !== "undefined") exports = utils;
if (typeof exports !== 'undefined') module.exports = function() {
	this.utils = utils;
}




