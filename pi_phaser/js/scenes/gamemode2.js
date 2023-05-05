class GameScene extends Phaser.Scene {
	constructor(){
		super('GameScene');
		this.cards=null;
		this.firstClick=null;
		this.num_card=4;
		this.score=100;
		this.correct=0;
		this.encertats=[];
		this.items=['co','cb','sb','so','tb','to'];
		this.tempor=1000;
		this.començat=false;
		this.dificultat="hard";
		this.username="";
		this.botoguardar="";
		this.bad_clicks=0;
		this.arraycards=[];
		this.comencat=false;
		this.nivell=1;
		//this.l_partida=null;

	}
	
	preload(){
		this.load.image('back','../resources/back.png');
		this.load.image('cb','../resources/cb.png');
		this.load.image('co','../resources/co.png');
		this.load.image('sb','../resources/sb.png');
		this.load.image('so','../resources/so.png');
		this.load.image('tb','../resources/tb.png');
		this.load.image('to','../resources/to.png');
	}

	create(){
		let l_partida=null;
		let l_ronda=null;
		if(sessionStorage.ronda){
			l_ronda=JSON.parse(sessionStorage.ronda);
		}
		else if(sessionStorage.idPartida && localStorage.partidesrush){
			let arrayPartides=JSON.parse(localStorage.partidesrush);
			if(sessionStorage.idPartida<arrayPartides.length)
			l_partida=arrayPartides[sessionStorage.idPartida];
		}
		if(l_ronda){
			this.username=l_ronda.username;
			this.current_card=l_ronda.current_card;
			//this.items=l_ronda.items;
			this.num_card=l_ronda.num_cards;
			this.score=l_ronda.score;
			this.comencat=true;
			//this.arraycards=l_ronda.arraycards;
			//this.correct=l_ronda.correct;
			//this.encertats=l_ronda.encertats;
			//this.dificultat=l_ronda.dificultat;
			this.tempor=l_ronda.temporitzador;
			this.nivell=l_ronda.nivell;
			this.items = this.items.slice();
			this.items.sort(function(){return Math.random() - 0.5});
			this.items = this.items.slice(0, this.num_card);
			this.items = this.items.concat(this.items);
			this.items.sort(function(){return Math.random() - 0.5});
			for (var k = 0; k < this.items.length; k++){
				this.arraycards.push(this.items[k]);
			}
		}
		else if(l_partida){
			this.username=l_partida.username;
			this.current_card=l_partida.current_card;
			this.items=l_partida.items;
			this.num_card=l_partida.num_cards;
			this.score=l_partida.score;
			this.comencat=true;
			//this.cards=this.l_partida.cards;
			this.arraycards=l_partida.arraycards;
			this.correct=l_partida.correct;
			this.encertats=l_partida.encertats;
			//this.dificultat=l_partida.dificultat;
			this.tempor=l_partida.temporitzador;
			this.nivell=l_partida.nivell;
		}
		else{
			this.username = sessionStorage.getItem("username","unknown");
			var json = localStorage.getItem("config") || '{"cards":2,"dificulty":"hard"}';
			var game_data = JSON.parse(json);
			this.num_card=2;
			//this.dificultat=game_data.dificulty;
			this.items = this.items.slice();
			this.items.sort(function(){return Math.random() - 0.5});
			this.items = this.items.slice(0, this.num_card);
			this.items = this.items.concat(this.items);
			this.items.sort(function(){return Math.random() - 0.5});
			console.log(this.encertats.length);
			for (var k = 0; k < this.items.length; k++){
				this.arraycards.push(this.items[k]);
			}
			/*if(this.dificultat=="hard"){
				this.tempor=500;
			}
			else if(this.dificultat=="normal"){
				this.tempor=1000;
			}
			else{
				this.tempor=1500;
			}*/
			this.tempor=1500;
		}
		sessionStorage.clear();
		this.cameras.main.setBackgroundColor(0xBFFCFF);
		let x=150;
		let y=200;
		for (let v=0;v<this.arraycards.length;v++){
			console.log(this.arraycards[v]);
			this.add.image(x,y,this.arraycards[v]);
			x+=150;
			if(x>=550){
				x=150;
				y=y+150;
			}
		}
		this.cards= this.physics.add.staticGroup();
		
		/*if(this.dificultat=="hard"){
			this.tempor=500;
		}
		else if(this.dificultat=="normal"){
			this.tempor=1000;
		}
		else{
			this.tempor=1500;
		}*/
		this.botoguardar = this.add.text(500, 500, 'Save game', {fill: '#fff'} );
		this.botoguardar.setBackgroundColor('#7b3046')
		this.botoguardar.setInteractive();
		this.botoguardar.on('pointerup', ()=> {
			this.save();
		});
		setTimeout(() => {
			let x=150;
			let y=200;
			for (let z=0;z<this.arraycards.length;z++){
				let descoberta=false;
				let k=0;
				while(k<this.encertats.length && !descoberta){
					if(this.arraycards[z]===this.encertats[k]){
						descoberta=true
					}
					k++;
				}
				if(!descoberta){
					this.cards.create(x,y,'back');
				}
				console.log("no");
				x+=150;
				if(x>=550){
					x=150;
					y=y+150;
				}
			}
			this.comencat=true;
			let i=0;
			this.cards.children.iterate((card)=>{
				let m=0;
				while(m<this.encertats.length){
					if(this.arraycards[i]===this.encertats[m]){
						i++;
					}
					else{
						m++;
					}
				}
				card.card_id=this.arraycards[i];
				i++;
				card.setInteractive();
				card.on('pointerup', ()=> {
					card.disableBody(true,true);
					console.log(card.card_id);
					if(this.firstClick){
						if(this.firstClick.card_id !== card.card_id){
							this.score-=20;
							/*if(this.dificultat=="hard"){
								this.score-=35;
							}
							else if(this.dificultat=="normal"){
								this.score-=20;
							}
							else{
								this.score-=10;
							}*/
							setTimeout(() => {	
								this.firstClick.enableBody(false,0,0,true,true);
								card.enableBody(false,0,0,true,true);
								this.firstClick=null;
							},500);
							if(this.score<=0){
								alert("Game Over");
								let partida={
									username: this.username,
									current_card: this.current_card,
									items: this.items,
									num_cards: this.num_card,
									score: this.score,
									arraycards: this.arraycards,
									correct: this.correct,
									encertats: this.encertats,
									dificultat:this.dificultat,
									temporitzador:this.tempor,
									nivell:this.nivell
									//cards: this.cards
								}
								let arrayPartides=[];
								if(localStorage.partidesrush){
									arrayPartides=JSON.parse(localStorage.partidesrush);
									if(!Array.isArray(arrayPartides))arrayPartides=[];
								}
								arrayPartides.push(partida);
								localStorage.partidesrush=JSON.stringify(arrayPartides);
								loadpage("../");
							}
						}
						else{
							this.correct++;
							this.encertats.push(this.firstClick.card_id);
							if(this.correct>=this.num_card){
								let nombre_cartes=this.num_card;
								let temps=this.tempor;
								this.nivell++;
								if(this.nivell%2!=0 && nombre_cartes<=6){
									nombre_cartes++;
								}
								else if(this.nivell%2===0 || nombre_cartes===6){
									temps=temps/1.5;
								}
								let ronda={
									username: this.username,
									current_card: this.current_card,
									items: this.items,
									num_cards: nombre_cartes,
									score: this.score,
									//arraycards: this.arraycards,
									//correct: this.correct,
									//encertats: this.encertats,
									//dificultat:this.dificultat,
									temporitzador:temps,
									nivell:this.nivell
								}
								
									sessionStorage.ronda=JSON.stringify(ronda);
								alert("You Win with "+ this.score + " points.");
								loadpage("./phasergamemode2.html");
							}
							this.firstClick=null;
						}
					}
					else{
						this.firstClick=card;
					}
				},card);
			});
		}, this.tempor);	
	}
	save(){
		console.log(this.username);
		let partida={
			username: this.username,
			current_card: this.current_card,
			items: this.items,
			num_cards: this.num_card,
			score: this.score,
			arraycards: this.arraycards,
			correct: this.correct,
			encertats: this.encertats,
			dificultat:this.dificultat,
			temporitzador:this.tempor,
			nivell:this.nivell
			//cards: this.cards
		}
		let arrayPartides=[];
		if(localStorage.partidesrush){
			arrayPartides=JSON.parse(localStorage.partidesrush);
			if(!Array.isArray(arrayPartides))arrayPartides=[];
		}
		arrayPartides.push(partida);
		localStorage.partidesrush=JSON.stringify(arrayPartides);
		sessionStorage.clear();
		loadpage("../");
	}
	update(){}
}


//VERSIÓ VELLA DEL CODI (BORRAR)

/*class GameScene extends Phaser.Scene {
	constructor(){
		super('GameScene');
		this.cards=null;
		this.firstClick=null;
		this.score=100;
		this.correct=0;
	}
	preload(){
		this.load.image('back','../resources/back.png');
		this.load.image('cb','../resources/cb.png');
		this.load.image('co','../resources/co.png');
		this.load.image('sb','../resources/sb.png');
		this.load.image('so','../resources/so.png');
		this.load.image('tb','../resources/tb.png');
		this.load.image('to','../resources/to.png');
	}

	create(){
		let arraycards=['co','sb','co','sb']
		this.cameras.main.setBackgroundColor(0xBFFCFF);

		this.add.image(250,300,'co');
		this.add.image(350,300,'sb');
		this.add.image(450,300,'co');
		this.add.image(550,300,'sb');

		this.cards= this.physics.add.staticGroup();

		this.cards.create(250,300,'back');
		this.cards.create(350,300,'back');
		this.cards.create(450,300,'back');
		this.cards.create(550,300,'back');

		let i=0;
		this.cards.children.iterate((card)=>{
			card.card_id=arraycards[i];
			i++;
			card.setInteractive();
			card.on('pointerup', ()=> {
				card.disableBody(true,true);
				if(this.firstClick){
					if(this.firstClick.card_id !== card.card_id){
						this.score-=20;
						this.firstClick.enableBody(false,0,0,true,true);
						card.enableBody(false,0,0,true,true);
						if(this.score<=0){
							alert("Game Over");
							loadpage("../");
						}
					}
					else{
						this.correct++;
						if(this.correct>=2){
							alert("You Win with "+ this.score + " points.");
							loadpage("../");
						}
					}
					this.firstClick=null;
				}
				else{
					this.firstClick=card;
				}
			},card);
		});
	}

	update(){}
}*/