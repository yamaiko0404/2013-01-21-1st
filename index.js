var flag;
var mouseX;
var mouseY;
var seq = new Array(3);

function setup(){
	var canvas = document.getElementById("canvas");
	if(canvas.getContext){
		var ctx = canvas.getContext("2d");
		canvas.width = canvas.width;
		
		ctx.beginPath();
		canvas.onclick = onClickListener;
		
        for(var x = 100; x < 300; x += 100){
            ctx.moveTo(x, 0);
            ctx.lineTo(x, 300);
        }
        for(var y = 100; y < 300; y += 100){
            ctx.moveTo(0, y);
            ctx.lineTo(300, y);
        }
        ctx.strokeStyle = "#000";
        ctx.stroke();
    }
    flag = true;
    for(var i = 0; i < 3; i++){
    	seq[i] = new Array(3);
    	for(var j = 0; j < 3; j++){
    		seq[i][j] = 0;
    	}
    }
}

function onClickListener(e){
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	
	adjustXY(e);	
	var x = mouseX - (mouseX % 100) + 50;
	var y = mouseY - (mouseY % 100) + 50;
	var x_space = parseInt(mouseX / 100);
	var y_space = parseInt(mouseY / 100);
	
    if(seq[x_space][y_space] == 0){
        if(flag){
            ctx.beginPath();
            ctx.arc(x, y, 20, 0, Math.PI * 2, false);
            ctx.stroke();
            seq[x_space][y_space] = 1;
        } else {
            ctx.beginPath();
            ctx.moveTo(x-20, y-20);
            ctx.lineTo(x+20, y+20);
            ctx.moveTo(x-20, y+20);
            ctx.lineTo(x+20, y-20);
            ctx.stroke();
            seq[x_space][y_space] = 2;
        }
        flag = !flag;
        
        if(judge() == 1){
            alert("おめでとう！勝ちだよ");
            setup();
        } else if(judge() == -1){
            alert("残念(´･ω･`)負けだよ");
            setup();
        } else if(judge() == 999){
            alert("おしい！引き分け");
            setup();
        }
    }
}

function adjustXY(e) {
	var rect = e.target.getBoundingClientRect();
	mouseX = e.clientX - rect.left;
	mouseY = e.clientY - rect.top;
}

function judge(){
	var test;
	for(i = 0; i < 3; i++){
		test = seq[i][0] * seq[i][1] * seq[i][2];
		if(test == 1) return 1;
		if(test == 8) return -1;
		
		test = seq[0][i] * seq[1][i] * seq[2][i];
		if(test == 1) return 1;
		if(test == 8) return -1;
	}
    test = seq[0][0] * seq[1][1] * seq[2][2];
    if(test == 1) return 1;
    if(test == 8) return -1;
    
    test = seq[0][2] * seq[1][1] * seq[2][0];
    if(test == 1) return 1;
    if(test == 8) return -1;
    
    test = 1;
    for(i = 0; i < 3; i++){
        for(j = 0; j < 3; j++){
        	test *= seq[i][j];
        }
    }
    if(test != 0) return 999;
    
    return 0;
}
