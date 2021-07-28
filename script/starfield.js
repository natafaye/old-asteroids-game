function Asteroid(id) {
	this.width = 128;
	this.height = 128;
	this.topY = (this.height * -1);
	this.id = id;
	this.shot = false;
	this.asteroid = $("<div>", {class: "asteroid"});
	this.leftX = randomX(this.width);
	// Make sure the asteroids have space in between them
	if(id == 1) {
		while(Math.abs(this.leftX - obstacleArray[id - 1].leftX) < 200) {
			this.leftX = randomX(this.width);
		}
	} else if(id > 1) {
		while(Math.abs(this.leftX - obstacleArray[id - 1].leftX) < 200 || Math.abs(this.leftX - obstacleArray[id - 2].leftX) < 200) {
			this.leftX = randomX(this.width);
		}
	}
	$("#main").append(this.asteroid);
	this.asteroid.css({left: this.leftX, top: this.topY});
	this.move = function() {
		this.topY += gameSpeed;
		this.asteroid.css("top", this.topY);
		this.checkForCollision();
	}
	this.checkForCollision = function() {
		if(this.topY > 345 && this.topY < 550) {
			var match = false;
			var i = 0;
			while(!match) {
				if(this.topY - 350 <= i) {
					match = true;
					damageAmount = Math.abs(this.leftX - getSP());
					if(damageAmount < SA[i]) {
						damageAmount = 130 - Math.sqrt(Math.pow(damageAmount, 2) + Math.pow(Math.abs(430 - this.topY), 2));
						this.explode();
						damageShip(damageAmount);
					}
				};
				i += 5;
			}
		};
	}
	this.explode = function() {
		removeFromArray(this.id, obstacleArray);
		makeExplosion(this.leftX + 64, this.topY + 64);
		this.asteroid.remove();
	}
}

function Photon(id) {
	this.width = 14;
	this.height = 14;
	this.topY = this.height * -1;
	this.id = id;
	this.photon = $("<div>", {class: "photon"});
	this.leftX = randomX(this.width);
	$("#main").append(this.photon);
	this.photon.css({left: this.leftX, top: this.topY});
	this.move = function() {
		this.topY += gameSpeed;
		this.photon.css("top", this.topY);
		this.checkForCollection();
	}
	this.checkForCollection = function() {
		if(this.topY > 450 && this.topY < 550) {
			var match = false;
			var i = 0;
			while(!match) {
				if(this.topY - 450 <= i) {
					match = true;
					if(Math.abs(this.leftX - (getSP() + 55)) < SP[i]) {
						this.collect();
					}
				};
				i += 5;
			}
		};
	}
	this.collect = function() {
		removeFromArray(this.id, photonArray);
		this.photon.remove();
		levelPhotonCount++;
		$("#photon_meter").html(levelPhotonCount);
	}
}

function Battery(id) {
	this.width = 32;
	this.height = 32;
	this.topY = this.height * -1;
	this.id = id;
	this.battery = $("<div>", {class: "battery"});
	this.leftX = randomX(this.width);
	$("#main").append(this.battery);
	this.battery.css({left: this.leftX, top: this.topY});
	this.move = function() {
		this.topY += gameSpeed;
		this.battery.css("top", this.topY);
		this.checkForCollection();
	}
	this.checkForCollection = function() {
		if(this.topY > 435 && this.topY < 555) {
			var match = false;
			var i = 0;
			while(!match) {
				if(this.topY - 435 <= i) {
					match = true;
					if(Math.abs(this.leftX - (getSP() + 46)) < SB[i]) {
						this.collect();
					}
				};
				i += 5;
			}
		};
	}
	this.collect = function() {
		this.battery.remove();
		removeFromArray(this.id, batteryArray);
		var newWidth = energyMeter.width() + 10;
		if(newWidth > energyMax) {newWidth = energyMax}
		energyMeter.css("width", newWidth);
	}
}

function Heart(id) {
	this.width = 32;
	this.height = 32;
	this.topY = this.height * -1;
	this.id = id;
	this.heart = $("<div>", {class: "heart"});
	this.leftX = randomX(this.width);
	$("#main").append(this.heart);
	this.heart.css({left: this.leftX, top: this.topY});
	this.move = function() {
		this.topY += gameSpeed;
		this.heart.css("top", this.topY);
		this.checkForCollection();
	}
	this.checkForCollection = function() {
		if(this.topY > 450 && this.topY < 550) {
			var match = false;
			var i = 0;
			while(!match) {
				if(this.topY - 450 <= i) {
					match = true;
					if(Math.abs(this.leftX - (getSP() + 55)) < SP[i]) {
						this.collect();
					}
				};
				i += 5;
			}
		};
	}
	this.collect = function() {
		this.heart.remove();
		removeFromArray(this.id, heartArray);
		var newWidth = healthMeter.width() + 25;
		if(newWidth > healthMax) {newWidth = healthMax}
		healthMeter.css("width", newWidth);
	}
}

var removeFromArray = function(id, array) {
	array.splice(id, 1);
	for(i = 0; i < array.length; i++) {
		array[i].id = i;
	}
}

var randomX = function(width) {
	windowWidth = $("#main").width() - 20 - width;
	var number = Math.floor(Math.random() * (windowWidth + 1)) + 20;
	return number;
}

var newObstacle = function() {
	clearTimeout(obstacleTimeout);
	var id = obstacleArray.length;
	obstacleArray[id] = new Asteroid(id);
	obstacleTimeout = setTimeout(function() {newObstacle()}, (Math.floor(Math.random() * 2000) + 3000) / gameSpeed);
}

var newPhoton = function() {
	clearTimeout(photonTimeout);
	var id = photonArray.length;
	photonArray[id] = new Photon(id);
	photonTimeout = setTimeout(function() {newPhoton()}, (Math.floor(Math.random() * 6000) + 5000) / gameSpeed);
}

var newBattery = function() {
	clearTimeout(batteryTimeout);
	var id = batteryArray.length;
	batteryArray[id] = new Battery(id);
	batteryTimeout = setTimeout(function() {newBattery()}, (Math.floor(Math.random() * 8000) + 5000) / gameSpeed);
}

var newHeart = function() {
	clearTimeout(heartTimeout);
	var id = heartArray.length;
	heartArray[id] = new Heart(id);
	heartTimeout = setTimeout(function() {newHeart()}, (Math.floor(Math.random() * 3000) + 10000) / gameSpeed);
}

var moveStarfield = function() {
	currentBP += gameSpeed;
	$("#wrap").css("background-position", "0 " + currentBP + "px");
	if((currentBP - levelBackgroundStart) >= (7000 * level)) {winLevel()}
	for(i = 0; i < obstacleArray.length; i++) {
		obstacleArray[i].move();
	}
	for(i = 0; i < photonArray.length; i++) {
		photonArray[i].move();
	}
	for(i = 0; i < batteryArray.length; i++) {
		batteryArray[i].move();
	}
	for(i = 0; i < heartArray.length; i++) {
		heartArray[i].move();
	}
	for(i = 0; i < explosionArray.length; i++) {
		explosionArray[i].css({top: function(index, value) {
			return parseFloat(value) + gameSpeed;
		}});
	}
}

var makeExplosion = function(x, y) {
	var explosion = $("<div>", {
		class: "explosion",
		css: {
			top: y - 175,
			left: x - 175
		}
	})
	$("#main").append(explosion);
	explosionArray[explosionArray.length] = explosion;
	setTimeout(function() {
		for(i = 0; i < explosionArray.length; i++) {
			if(explosionArray[i] == explosion) {
				explosionArray.splice(i, 1);
			}
		}
		explosion.remove();
	}, 2400);
}

// Map of the shape of the asteroid for accurate collection
var SA = new Array();
SA[0] = 25;
SA[5] = 32.5;
SA[10] = 40;
SA[15] = 45;
SA[20] = 50;
SA[25] = 55;
SA[30] = 57.5;
SA[35] = 60;
SA[40] = 62.5;
SA[45] = 65;
SA[50] = 67.5;
SA[55] = 70;
SA[60] = 70;
SA[65] = 72.5;
SA[70] = 72.5;
SA[75] = 75;
SA[80] = 77.5;
SA[85] = 80;
SA[90] = 85;
SA[95] = 90;
SA[100] = 92.5;
SA[105] = 95;
SA[110] = 97.5;
SA[115] = 100;
SA[120] = 100;
SA[125] = 100;
SA[130] = 100;
SA[135] = 100;
SA[140] = 100;
SA[145] = 100;
SA[150] = 97.5;
SA[155] = 95;
SA[160] = 92.5;
SA[165] = 87.5;
SA[170] = 85;
SA[175] = 80;
SA[180] = 77.5;
SA[185] = 72.5;
SA[190] = 60;
SA[195] = 52.5;
SA[200] = 40;

// Map of the shape of the photon (and heart) for accurate collection
var SP = new Array();
SP[0] = 5;
SP[5] = 9;
SP[10] = 12;
SP[15] = 14;
SP[20] = 16;
SP[25] = 18;
SP[30] = 19;
SP[35] = 21;
SP[40] = 22
SP[45] = 23;
SP[50] = 24;
SP[55] = 23;
SP[60] = 23;
SP[65] = 35;
SP[70] = 40;
SP[75] = 42.5;
SP[80] = 45;
SP[85] = 47.5;
SP[90] = 47.5;
SP[95] = 47.5;
SP[100] = 65;

// Map of the shape of the battery for accurate collection
var SB = new Array();
SB[0] = 10;
SB[5] = 15;
SB[10] = 16;
SB[15] = 18;
SB[20] = 20;
SB[25] = 21;
SB[30] = 23;
SB[35] = 24;
SB[40] = 25;
SB[45] = 26;
SB[50] = 26;
SB[55] = 26;
SB[60] = 26;
SB[65] = 40;
SB[70] = 45;
SB[75] = 47.5;
SB[80] = 50;
SB[85] = 50;
SB[90] = 50;
SB[95] = 50;
SB[100] = 50;
SB[105] = 50;
SB[110] = 50;
SB[115] = 45;
SB[120] = 35;