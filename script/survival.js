$(function() {
	// initialization of variables
	level = 1;
	levelTimer = 0;
	starfieldInterval = "";
	energyInterval = "";
	obstacleTimeout = "";
	photonTimeout = "";
	batteryTimeout = "";
	heartTimeout = "";
	pressed = false;
	gamePaused = false;
	gameSpeed = 1;
	currentBP = 0; // current vertical background position
	levelBackgroundStart = 0;
	energyMax = 100;
	healthMax = 100;
	lives = 3;
	sideShootersOn = false;
	energyMeter = $("#energy_meter div.meter div");
	healthMeter = $("#health_meter div.meter div");
	obstacleArray = new Array();
	explosionArray = new Array();
	photonArray = new Array();
	batteryArray = new Array();
	heartArray = new Array();
	boughtList = new Array();
	levelPhotonCount = 0;
	totalPoints = 0;
	prepScript()
})

var restartGame = function() {
	$("#ship").show();
	level = 1;
	gameSpeed = 1;
	totalPoints = 0;
	lives = 3;
	pressed = false;
	energyMax = 100;
	$("#energy_meter div.meter").width(100);
	healthMax = 100;
	$("#health_meter div.meter").width(100);
	sideShootersOn = false;
	boughtList = new Array();
	prepScript();
}

var restartLevel = function() {
	if(lives == 0) {
		restartGame();
	} else {
		$("#ship").show();
		gameSpeed = level;
		lives--;
		pressed = false;
		prepScript();
	}
}

var nextLevel = function() {
	level++;
	gameSpeed = level;
	prepScript();
}

var prepScript = function() {
	// clear everything out
	$("div.asteroid").remove();
	$("div.explosion").remove();
	$("div.photon").remove();
	$("div.battery").remove();
	$("div.heart").remove();
	obstacleArray = new Array();
	explosionArray = new Array();
	photonArray = new Array();
	batteryArray = new Array();
	heartArray = new Array();
	levelPhotonCount = 0;
	energyMeter.width(energyMax);
	healthMeter.width(healthMax);
	$("#ship").css("left", 430);
	$("#photon_meter").html(levelPhotonCount)
	levelBackgroundStart = currentBP;
	// start everything up
	startStarfield();
	startEnergyMeter();
	newObstacle();
	obstacleTimeout = setTimeout(function() {newObstacle()}, (Math.floor(Math.random() * 2000) + 3000) / gameSpeed);
	photonTimeout = setTimeout(function() {newPhoton()}, (Math.floor(Math.random() * 6000) + 5000) / gameSpeed);
	batteryTimeout = setTimeout(function() {newBattery()}, (Math.floor(Math.random() * 8000) + 5000) / gameSpeed);
	heartTimeout = setTimeout(function() {newHeart()}, (Math.floor(Math.random() * 3000) + 10000) / gameSpeed);
	$("body").bind("keydown", function(event) {keyDown(event)});
	$("body").bind("keyup", function(event) {keyUp(event)});
}

var keyDown = function(event) {
	if(event.which == 37) { // left arrow key
		if(pressed) {return}
		event.preventDefault();
		pressed = true;
		moveShip("left");
	} else if(event.which == 39) { // right arrow key
		if(pressed) {return}
		event.preventDefault();
		pressed = true;
		moveShip("right");
	} else if(event.which == 32) { // spacebar
		shoot();
	} else if(event.which == 90 && sideShootersOn) { // z key
		sideShoot();
	} else if(event.which == 38) { // up arrow key
		if(pressed) {return} // if it's being held down, don't shoot continuously
		pressed = true;
		event.preventDefault();
		gameSpeed = level * 5; // speed up the ship
		// restart everything with the new gamespeed to prevent problems
		clearTimeout(obstacleTimeout);
		clearTimeout(photonTimeout);
		clearTimeout(batteryTimeout);
		clearTimeout(heartTimeout);
		obstacleTimeout = setTimeout(function() {newObstacle()}, (Math.floor(Math.random() * 2000) + 3000) / gameSpeed);
		photonTimeout = setTimeout(function() {newPhoton()}, (Math.floor(Math.random() * 6000) + 5000) / gameSpeed);
		batteryTimeout = setTimeout(function() {newBattery()}, (Math.floor(Math.random() * 8000) + 5000) / gameSpeed);
		heartTimeout = setTimeout(function() {newHeart()}, (Math.floor(Math.random() * 3000) + 10000) / gameSpeed);
	} else if(event.which == 80) { // p key
		if(pressed) {return}
		pressed = true;
		pauseGame();
	}
}

var keyUp = function(event) {
	if(event.which == 37 || event.which == 39) { // left or right arrow key
		pressed = false;
		$("#ship").stop();
	} else if(event.which == 38) { // up arrow key
		pressed = false;
		gameSpeed = level;
	} else if(event.which == 80) { // p key
		pressed = false;
	}
}

var moveShip = function(direction) {
	if(direction == "left") {destination = 10} else {destination = 878}
	var timer = Math.abs(getSP() - destination) * 2;
	$("#ship").stop().animate({left: destination}, {duration: timer, queue: false, easing: "linear"});
}

// get the current position of the ship
var getSP = function() {
	var position = $("#ship").css("left");
	position = position.split("px");
	position = parseInt(position[0]);
	return position;
}

var shoot = function() {
	if(energyMeter.width() - 5 < 0) {
		energyMeter.width(0);
		endGame("Energy gone! Game over.");
	} else {
		energyMeter.css("width", energyMeter.width() - 5);
		var match = false;
		// check if the laser hit an asteroid
		for(i = 0; i < obstacleArray.length; i++) {
			if(match == false && obstacleArray[i].shot == false && Math.abs(obstacleArray[i].leftX - getSP()) < 64 && obstacleArray[i].topY < 350) {
				match = obstacleArray[i];
				match.shot = true;
			}
		}
		var laser = $("<div>", {class: "laser", css: {left: getSP() + 63}});
		$("#main").append(laser);
		var destination = -50;
		if(match != false) {destination = match.topY + 100}
		var timer = (450 - destination) * 4;
		laser.animate({top: destination}, timer, "linear", function() {
			laser.remove();
			if(match != false) {match.explode()}
		});
	}
}

var sideShoot = function() {
	if(energyMeter.width() - 10 < 0) {
		energyMeter.width(0);
		endGame("Energy gone! Game over.");
	} else {
		energyMeter.css("width", energyMeter.width() - 10);
		var matchList1 = new Array();
		var matchList2 = new Array();
		// add all the asteroids to either the left (1) or the right (2) list of obstacles
		for(i = 0; i < obstacleArray.length; i++) {
			if(!obstacleArray[i].shot && Math.abs(obstacleArray[i].topY - 475) < 64) {
				if(obstacleArray[i].leftX < getSP()) {
					matchList1[matchList1.length] = obstacleArray[i];
				} else {
					matchList2[matchList2.length] = obstacleArray[i];
				}
			}
		}
		// go through all the left asteroids and check for a hit
		var margin1 = 5000;
		var match1 = false;
		for(i = 0; i < matchList1.length; i++) {
			if(getSP() - matchList1[i].leftX < margin1) {
				match1 = matchList1[i];
				margin1 = getSP() - matchList1[i].leftX;
			}
		}
		// go through all the right asteroids and check for a hit
		var margin2 = 5000;
		var match2 = false;
		for(i = 0; i < matchList2.length; i++) {
			if(matchList2[i].leftX - getSP() < margin2) {
				match2 = matchList2[i];
				margin2 = matchList2[i].leftX - getSP();
			}
		}
		var laser1 = $("<div>", {class: "laser side_laser", css: {left: getSP() + 60}});
		var laser2 = $("<div>", {class: "laser side_laser", css: {left: getSP() + 60}});
		$("#main").append(laser1).append(laser2);
		var destination1 = -25;
		var destination2 = $("#main").width() + 25;
		// if either laser hit something, stop at the asteroid that was hit
		if(match1 != false) {destination1 = match1.leftX + 100}
		if(match2 != false) {destination2 = match2.leftX + 28}
		var timer1 = (getSP() + 60 - destination1) * 2;
		var timer2 = (destination2 - getSP() - 60) * 2;
		laser1.animate({left: destination1}, timer1, "linear", function() {
			laser1.remove();
			if(match1 != false) {match1.explode()}
		});
		laser2.animate({left: destination2}, timer2, "linear", function() {
			laser2.remove();
			if(match2 != false) {match2.explode()}
		});
	}
}

var damageShip = function(damage) {
	if(healthMeter.width() - damage < 0) {
		healthMeter.width(0);
		blowUpShip();
	} else {
		healthMeter.width(healthMeter.width() - damage);
	}
}

var blowUpShip = function() {
	var ship = $("#ship");
	makeExplosion(getSP() + 64, 524);
	ship.hide();
	endGame("Ship exploded!");
}

var startStarfield = function() {
	starfieldInterval = setInterval(function() {
		moveStarfield();
	}, 15);
}

var startEnergyMeter = function() {
	energyInterval = setInterval(function() {
		if(energyMeter.width() - gameSpeed < 0) {
			energyMeter.width(0);
			endGame("Energy gone!");
		} else {
			energyMeter.css("width", energyMeter.width() - gameSpeed);
		}
	}, 2000);
}

var createMessage = function(type, message) {
	var id;
	id = type;
	if(type == "error") {id = "game_over";}
	$("<div>", {
		id: id,
		class: "alert_message",
		html: $("<p>", {
			text: message
		})
	}).appendTo("#main");
	if((type != "paused" && type != "error") || (type == "error" && lives == 0)) {
		$("#" + id).append($("<div>", {
			id: "stats",
			html: $("<h3>", {
				text: "Stats:"
			})
		}))
		generateStats();
	}
	if(type == "error") {
		if(lives > 0) {
			$("<a>", {
				id: "try_again",
				text: "Try Again",
				href: "#",
				click: function() {
					$("#game_over").remove();
					restartLevel();
					return false;
				}
			}).appendTo("#game_over");
			if(lives > 1) {
				message += " You have " + lives + " lives left."
			} else {
				message += " You have " + lives + " life left."
			}
			$("#game_over p").html(message);
		} else {
			$("<a>", {
				id: "new_game",
				text: "New Game",
				href: "#",
				click: function() {
					$("#game_over").remove();
					restartGame();
					return false;
				}
			}).appendTo("#game_over");
			$("#game_over p").html(message + " Game over.");
		}
	} else if(type == "success") {
		$("<a>", {
			text: "Upgrade!",
			href: "#",
			click: function() {
				$("#success").remove();
				upgrade();
				return false;
			}
		}).appendTo("#success");
	}
	$("#" + id).css({
		top: parseInt(($("#main").height() - $("#" + id).height()) / 2),
		left: parseInt(($("#main").width() - $("#" + id).width()) / 2)
	});
}

var generateStats = function() {
	$("#stats").append($("<ul>", {
		id: "stat_list"
	}));
	var statList = $("#stat_list");
	statList.append($("<li>", {
		text: "Photons collected: " + levelPhotonCount
	}));
	statList.append($("<li>", {
		text: "Energy remaining: " + energyMeter.width()
	}));
	levelPoints = energyMeter.width() + (levelPhotonCount * 40);
	statList.append($("<li>", {
		text: "Points for level " + level + ": " + levelPoints
	}));
	totalPoints += levelPoints;
	statList.append($("<li>", {
		text: "Total points:" + totalPoints,
		css: {
			marginTop: "5px",
			borderTop: "2px solid #2B2B2B"}
	}));
}

var pauseGame = function() {
	if(!gamePaused) {
		// pause the game
		gamePaused = true;
		$("#ship").stop();
		clearInterval(starfieldInterval);
		clearInterval(energyInterval);
		clearTimeout(obstacleTimeout);
		clearTimeout(photonTimeout);
		clearTimeout(batteryTimeout);
		clearTimeout(heartTimeout);
		$("body").unbind("keydown").unbind("keyup");
		$("body").bind("keydown", function(event) {
			if(event.which == 80) { // the p key
				pauseGame();
			}
		});
		$("body").bind("keyup", function(event) {
			if(event.which == 80) {
				pressed = false;
			}
		});
		createMessage("paused", "Game paused. Press \"P\" to unpause.");
	} else {
		// unpause the game
		gamePaused = false;
		$("#paused").remove();
		startStarfield();
		startEnergyMeter();
		obstacleTimeout = setTimeout(function() {newObstacle()}, (Math.floor(Math.random() * 2000) + 3000) / gameSpeed);
		photonTimeout = setTimeout(function() {newPhoton()}, (Math.floor(Math.random() * 6000) + 5000) / gameSpeed);
		batteryTimeout = setTimeout(function() {newBattery()}, (Math.floor(Math.random() * 8000) + 5000) / gameSpeed);
		heartTimeout = setTimeout(function() {newHeart()}, (Math.floor(Math.random() * 3000) + 10000) / gameSpeed);
		$("body").unbind("keydown").bind("keydown", function(event) {keyDown(event)});
		$("body").unbind("keyup").bind("keyup", function(event) {keyUp(event)});
	}
}

var endGame = function(message) {
	clearInterval(starfieldInterval);
	clearInterval(energyInterval);
	clearTimeout(obstacleTimeout);
	clearTimeout(photonTimeout);
	clearTimeout(batteryTimeout);
	clearTimeout(heartTimeout);
	$("body").unbind("keypress").unbind("keydown").unbind("keyup");
	createMessage("error", message);
}

var winLevel = function() {
	clearInterval(starfieldInterval);
	clearInterval(energyInterval);
	clearTimeout(obstacleTimeout);
	clearTimeout(photonTimeout);
	clearTimeout(batteryTimeout);
	clearTimeout(heartTimeout);
	$("body").unbind("keypress").unbind("keydown").unbind("keyup");
	createMessage("success", "Level " + level + " completed successfully!");
}