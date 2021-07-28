var upgrade = function() {
	var upgradeDiv = $("<div>", {
		id: "upgrade",
		class: "alert_message",
		html: $("<h2>", {
			text: "Upgrades"
		})
	}).appendTo("#main");
	var energyList = $("<ul>", {
		id: "energy_list"
	});
	$("<div>", {
		id: "energy_upgrades",
		html: $("<h3>", {
			text: "Energy:"
		})
	}).append(energyList).appendTo(upgradeDiv);
	var healthList = $("<ul>", {
		id: "health_list"
	});
	$("<div>", {
		id: "health_upgrades",
		html: $("<h3>", {
			text: "Health:"
		})
	}).append(healthList).appendTo(upgradeDiv);
	var weaponList = $("<ul>", {
		id: "weapon_list"
	});
	$("<div>", {
		id: "weapon_upgrades",
		html: $("<h3>", {
			text: "Weapons:"
		})
	}).append(weaponList).appendTo(upgradeDiv);
	var shipList = $("<ul>", {
		id: "ship_list"
	});
	$("<div>", {
		id: "ship_upgrades",
		html: $("<h3>", {
			text: "Spaceship:"
		})
	}).append(shipList).appendTo(upgradeDiv);
	var extraList = $("<ul>", {
		id: "extra_list"
	});
	$("<div>", {
		id: "extras",
		html: $("<h3>", {
			text: "Extras:"
		})
	}).append(extraList).appendTo(upgradeDiv);
	makeUpgradeList();
	$("#upgrade").append($("<div>", {
		id: "point_count",
		text: "Points: " + totalPoints
	})).append($("<a>", {
		text: "Next Level",
		href: "#",
		click: function() {
			$("#upgrade").remove();
			nextLevel();
			return false;
		}
	}));
	$("#upgrade").css({
		top: parseInt(($("#main").height() - $("#upgrade").height()) / 2),
		left: parseInt(($("#main").width() - $("#upgrade").width()) / 2)
	});
}

var makeUpgradeList = function() {
	var energyList = $("#energy_list");
	var healthList = $("#health_list");
	var weaponList = $("#weapon_list");
	var shipList = $("#ship_list");
	var extraList = $("#extra_list");
	energyList.html("");
	healthList.html("");
	weaponList.html("");
	shipList.html("");
	extraList.html("");
	var itemClass = "upgrade_item";
	if(totalPoints >= 7000) {itemClass = "upgrade_item affordable";}
	var s1 = ($("<li>", {
		id: "ship_upgrade_1",
		class: itemClass,
		html: "Ship Upgrade<br><span class='price'>Price: 7000</span>"
	}));
	shipList.prepend(s1);
	if(isBought(s1.attr("id"))) {s1.removeClass("affordable")}
	if(totalPoints >= 4500) {itemClass = "upgrade_item affordable";}
	var w3 = ($("<li>", {
		id: "weapon_upgrade_3",
		class: itemClass,
		html: "Seekers<br><span class='price'>Price: 4500</span>"
	}));
	weaponList.prepend(w3);
	if(isBought(w3.attr("id"))) {w3.removeClass("affordable")}
	if(totalPoints >= 3000) {itemClass = "upgrade_item affordable";}
	var h4 = ($("<li>", {
		id: "health_upgrade_4",
		class: itemClass,
		html: "Raise Max Health to 300<br><span class='price'>Price: 3000</span>"
	}));
	healthList.prepend(h4);
	if(isBought(h4.attr("id"))) {h4.removeClass("affordable")}
	var w2 = ($("<li>", {
		id: "weapon_upgrade_2",
		class: itemClass,
		html: "Triple Shooter<br><span class='price'>Price: 3000</span>"
	}));
	weaponList.prepend(w2);
	if(isBought(w2.attr("id"))) {w2.removeClass("affordable")}
	if(totalPoints >= 2100) {itemClass = "upgrade_item affordable";}
	var h3 = ($("<li>", {
		id: "health_upgrade_3",
		class: itemClass,
		html: "Raise Max Health to 250<br><span class='price'>Price: 2100</span>"
	}));
	healthList.prepend(h3);
	if(isBought(h3.attr("id"))) {h3.removeClass("affordable")}
	if(totalPoints >= 2000) {itemClass = "upgrade_item affordable";}
	var e4 = ($("<li>", {
		id: "energy_upgrade_4",
		class: itemClass,
		html: "Raise Max Energy to 300<br><span class='price'>Price: 2000</span>"
	}));
	energyList.prepend(e4);
	if(isBought(e4.attr("id"))) {e4.removeClass("affordable")}
	var x1 = ($("<li>", {
		id: "extra_1",
		class: itemClass,
		html: "Extra Life<br><span class='price'>Price: 2000</span>"
	}));
	extraList.prepend(x1);
	if(isBought(x1.attr("id"))) {x1.removeClass("affordable")}
	if(totalPoints >= 1500) {itemClass = "upgrade_item affordable";}
	var w1 = ($("<li>", {
		id: "weapon_upgrade_1",
		class: itemClass,
		html: "Side Shooters<br><span class='price'>Price: 1500</span>"
	}));
	weaponList.prepend(w1);
	if(isBought(w1.attr("id"))) {w1.removeClass("affordable")}
	var e3 = ($("<li>", {
		id: "energy_upgrade_3",
		class: itemClass,
		html: "Raise Max Energy to 250<br><span class='price'>Price: 1500</span>"
	}));
	energyList.prepend(e3);
	if(isBought(e3.attr("id"))) {e3.removeClass("affordable")}
	if(totalPoints >= 1400) {itemClass = "upgrade_item affordable";}
	var h2 = ($("<li>", {
		id: "health_upgrade_2",
		class: itemClass,
		html: "Raise Max Health to 200<br><span class='price'>Price: 1400</span>"
	}));
	healthList.prepend(h2);
	if(isBought(h2.attr("id"))) {h2.removeClass("affordable")}
	if(totalPoints >= 1000) {itemClass = "upgrade_item affordable";}
	var e2 = ($("<li>", {
		id: "energy_upgrade_2",
		class: itemClass,
		html: "Raise Max Energy to 200<br><span class='price'>Price: 1000</span>"
	}));
	energyList.prepend(e2);
	if(isBought(e2.attr("id"))) {e2.removeClass("affordable")}
	if(totalPoints >= 700) {itemClass = "upgrade_item affordable";}
	var h1 = ($("<li>", {
		id: "health_upgrade_1",
		class: itemClass,
		html: "Raise Max Health to 150<br><span class='price'>Price: 700</span>"
	}));
	healthList.prepend(h1);
	if(isBought(h1.attr("id"))) {h1.removeClass("affordable")}
	if(totalPoints >= 500) {itemClass = "upgrade_item affordable";}
	var e1 = ($("<li>", {
		id: "energy_upgrade_1",
		class: itemClass,
		html: "Raise Max Energy to 150<br><span class='price'>Price: 500</span>"
	}));
	energyList.prepend(e1);
	if(isBought(e1.attr("id"))) {e1.removeClass("affordable")}
	$("li.affordable").click(function() {
		var info = $(this).html().split("<br><span class=\"price\">Price: ");
		var name = info[0];
		var price = parseInt(info[1]);
		buyUpgrade($(this).attr("id"), name, price);
	});
}

var buyUpgrade = function(item, name, price) {
	totalPoints -= price;
	$("#point_count").text("Points: " + totalPoints);
	boughtList[boughtList.length] = item;
	makeUpgradeList();
	if(item == "energy_upgrade_1") {
		energyMax = 150;
		$("#energy_meter div.meter").width(150);
		energyMeter.width(150);
	} else if(item == "energy_upgrade_2") {
		energyMax = 200;
		$("#energy_meter div.meter").width(200);
		energyMeter.width(200);
	} else if(item == "energy_upgrade_3") {
		energyMax = 250;
		$("#energy_meter div.meter").width(250);
		energyMeter.width(250);
	} else if(item == "energy_upgrade_4") {
		energyMax = 300;
		$("#energy_meter div.meter").width(300);
		energyMeter.width(300);
	} else if(item == "health_upgrade_1") {
		healthMax = 150;
		$("#health_meter div.meter").width(150);
		healthMeter.width(150);
	} else if(item == "health_upgrade_2") {
		healthMax = 200;
		$("#health_meter div.meter").width(200);
		healthMeter.width(200);
	} else if(item == "health_upgrade_3") {
		healthMax = 250;
		$("#health_meter div.meter").width(250);
		healthMeter.width(250);
	} else if(item == "health_upgrade_4") {
		healthMax = 300;
		$("#health_meter div.meter").width(300);
		healthMeter.width(300);
	} else if(item == "weapon_upgrade_1") {
		sideShootersOn = true;
	} else if(item == "extra_1") {
		lives++;
	}
}

var isBought = function(item) {
	var answer = false;
	if(boughtList.indexOf(item) != -1) {answer = true}
	return answer;
}