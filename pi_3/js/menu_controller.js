function start_game(){
	name = prompt("User name");
	
	sessionStorage.setItem("username", name);
	
	loadpage("./html/game.html");
}

function carrega_pi_3(){
	loadpage("./pi_3/index.html");
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


