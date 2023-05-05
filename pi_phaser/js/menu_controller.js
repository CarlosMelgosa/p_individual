function start_game(){
	name = prompt("User name");
	
	sessionStorage.setItem("username", name);
	
	loadpage("./html/game.html");
}

function phaser_game(){
	loadpage("./pi_phaser/index.html");
}

function start_phasergame(){
	name = prompt("User name");
	sessionStorage.setItem("username", name);
	loadpage("./html/phasergame.html");
}

function start_phasergame_mode2(){
	name = prompt("User name");
	sessionStorage.setItem("username", name);
	loadpage("./html/phasergamemode2.html");
}

function load(){
	loadpage("./html/load.html");
}

function load_rush(){
	loadpage("./html/loadrush.html");
}

function ranking(){
	loadpage("./html/rank.html");
}

function exit (){
	if (name != ""){
		alert("Leaving " + name + "'s game");
	}
	name = "";
}

function enrere (){
	loadpage("../index.html");
}

function options(){
	loadpage("./html/options.html");
}


