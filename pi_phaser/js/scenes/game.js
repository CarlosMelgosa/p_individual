class GameScene extends Phaser.Scene {
	constructor(){
		super('GameScene');
		this.cards=null;
		this.firstClick=null;
		this.num_card=4;
		this.score=100;
		this.correct=0;
		this.items=['co','cb','sb','so','tb','to'];
		this.tempor=1000;
		this.començat=false;
		this.dificultat="hard";
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
		var json = localStorage.getItem("config") || '{"cards":2,"dificulty":"hard"}';
		var game_data = JSON.parse(json);
		this.num_card=game_data.cards;
		this.dificultat=game_data.dificulty;
		let arraycards=[];
		this.items = this.items.slice();
		this.items.sort(function(){return Math.random() - 0.5});
		this.items = this.items.slice(0, this.num_card);
		this.items = this.items.concat(this.items);
		this.items.sort(function(){return Math.random() - 0.5});
		for (var k = 0; k < this.items.length; k++){
			arraycards.push(this.items[k]);
		}
		this.cameras.main.setBackgroundColor(0xBFFCFF);
		let x=150;
		let y=200;
		for (let v=0;v<arraycards.length;v++){
			this.add.image(x,y,arraycards[v]);
			x+=150;
			if(x>=550){
				x=150;
				y=y+150;
			}
		}

		this.cards= this.physics.add.staticGroup();

		setTimeout(() => {
			let x=150;
			let y=200;
			for (let z=0;z<arraycards.length;z++){
				this.cards.create(x,y,'back');
				x+=150;
				if(x>=550){
					x=150;
					y=y+150;
				}
			}
			this.comencat=true;
			let i=0;
			this.cards.children.iterate((card)=>{
				card.card_id=arraycards[i];
				i++;
				card.setInteractive();
				card.on('pointerup', ()=> {
					card.disableBody(true,true);
					if(this.firstClick){
						if(this.firstClick.card_id !== card.card_id){
							if(this.dificultat=="hard"){
								this.score-=35;
							}
							else if(this.dificultat=="normal"){
								this.score-=20;
							}
							else{
								this.score-=10;
							}
							setTimeout(() => {	
								this.firstClick.enableBody(false,0,0,true,true);
								card.enableBody(false,0,0,true,true);
								this.firstClick=null;
							},500);
							if(this.score<=0){
								alert("Game Over");
								loadpage("../");
							}
						}
						else{
							this.correct++;
							if(this.correct>=this.num_card){
								alert("You Win with "+ this.score + " points.");
								loadpage("../");
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

	update(){}
}


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