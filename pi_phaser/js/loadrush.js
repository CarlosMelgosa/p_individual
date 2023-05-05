var load_obj = function(){
		var vue_instance=new Vue ({
			el:"#saves_id",
			data: {
				saves:[]
			},
			created: function () {
				let arrayPartides=[];
				if(localStorage.partidesrush){
					arrayPartides=JSON.parse(localStorage.partidesrush);
					if(!Array.isArray(arrayPartides)) arrayPartides=[];
				}
				this.saves=arrayPartides;
			},
			methods: {
				load: function(i){
					sessionStorage.idPartida=i;
					loadpage("../html/phasergamemode2.html")
				}
			}
		});
		return {};
} ();