var load_obj = function(){
		var vue_instance=new Vue ({
			el:"#rank",
			data: {
				rankdata: localStorage.partidesrush? JSON.parse(localStorage.partidesrush).sort(this.ordena): []
			},
			methods: {
				exit: function (){
					loadpage("../")
				}
			}
		});
		return {};
} ();

function ordena(a,b){
	if(a.nivell<b.nivell){
		return -1;
	}
	else if(a.nivell>b.nivell){
		return 1;
	}
	else {
		return 1;
	}
	return 0;
}