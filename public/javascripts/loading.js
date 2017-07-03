var canvas = document.getElementById('loader');
canvas.width = 1000;
canvas.width = 1000;
var ctx = canvas.getContext('2d');
var raf;
var inner_circle_offset = 25.714;
var middle_circle_offset = 18;
var test_window_width= $(window).width();

var test_window_height = $(window).height();


function onReady(callback) {
	var thing = 10; 
	var counter = 0;
	var load_screen_switch = true;
	var first_char = {
		x : 300,
		x0: 300,
		y0: 300,
		y : 300,
		angle : 0,
		index : 0,
		alpha : Math.PI * 2 / 180,
		radius : 100,
		draw : function(){
			var img = document.getElementById("char1");
			ctx.drawImage(img, this.x, this.y);
		},
		update : function(){
			if (this.index == 360){
				this.index = -360;
			};
			this.angle += this.angle * Math.PI / 180;
			this.index += 1;
			var theta = this.alpha * this.index;
			this.x = this.x0 + Math.floor(1 - Math.cos(theta + this.angle) * this.radius);
			this.y = this.y0 + Math.floor(1 - Math.sin(theta + this.angle) * this.radius);
		}
	};
	
	var second_char = {
		x: 300,
		x0: 300,
		y: 300,
		y0: 300,
		angle: 0,
		index: 0,
		alpha: Math.PI * 2 / 180,
		radius: 100,
		draw : function(){
			var img = document.getElementById("char2");

			ctx.drawImage(img, this.x, this.y);
		},
		update : function(){
			if (this.index == 360){

				this.index = -360;
			};
			this.angle += this.angle * Math.PI / 180;
			this.index += 1;
			var theta = this.alpha * this.index;
			this.x = this.x0 + Math.floor(1 - Math.cos(theta + this.angle) * this.radius);
			this.y = this.y0 + Math.floor(1 - Math.sin(theta + this.angle) * this.radius);
		}
	};
	
	var third_char = {
		x: 300,
		x0: 300,
		y: 300,
		y0: 300,
		angle: 0,
		index: 0,
		alpha: Math.PI * 2 / 180,
		radius: 100,
		draw : function(){
			var img = document.getElementById("char3");
			ctx.drawImage(img, this.x, this.y);
		},
		update : function(){
			if (this.index == 360){
				this.index = -360;
			};
			this.angle += this.angle * Math.PI / 180;
			this.index += 1;
			var theta = this.alpha * this.index;
			this.x = this.x0 + Math.floor(1 - Math.cos(theta + this.angle) * this.radius);
			this.y = this.y0 + Math.floor(1 - Math.sin(theta + this.angle) * this.radius);
		}
	};

	var fourth_char = {
		x: 300,
		x0: 300,
		y: 300,
		y0: 300,
		angle: 0,
		index: 0,
		alpha: Math.PI * 2 / 180,
		radius: 100,
		draw : function(){
			var img = document.getElementById("char4");

			ctx.drawImage(img, this.x, this.y);
		},
		update : function(){
			if (this.index == 360){

				this.index = -360;
			};
			this.angle += this.angle * Math.PI / 180;
			this.index += 1;
			var theta = this.alpha * this.index;
			this.x = this.x0 + Math.floor(1 - Math.cos(theta + this.angle) * this.radius);
			this.y = this.y0 + Math.floor(1 - Math.sin(theta + this.angle) * this.radius);
		}
	};
	
	var fifth_char = {
		x: 300,
		x0: 300,
		y: 300,
		y0: 300,
		angle: 0,
		index: 0,
		alpha: Math.PI * 2 / 180,
		radius: 100,
		draw : function(){
			var img = document.getElementById("char5");
			ctx.drawImage(img, this.x, this.y);
		},
		update : function(){
			if (this.index == 360){
				this.index = -360;
			};
			this.angle += this.angle * Math.PI / 180;
			this.index += 1;
			var theta = this.alpha * this.index;
			this.x = this.x0 + Math.floor(1 - Math.cos(theta + this.angle) * this.radius);
			this.y = this.y0 + Math.floor(1 - Math.sin(theta + this.angle) * this.radius);
		}
	};
	
	var sixth_char = {
		x: 300,
		x0: 300,
		y: 300,
		y0: 300,
		angle: 0,
		index: 0,
		alpha: Math.PI * 2 / 180,
		radius: 100,
		draw : function(){
			var img = document.getElementById("char18");
			ctx.drawImage(img, this.x, this.y);
		},
		update : function(){
			if (this.index == 360){
				this.index = -360;
			};
			this.angle += this.angle * Math.PI / 180;
			this.index += 1;
			var theta = this.alpha * this.index;
			this.x = this.x0 + Math.floor(1 - Math.cos(theta + this.angle) * this.radius);
			this.y = this.y0 + Math.floor(1 - Math.sin(theta + this.angle) * this.radius);
		}
	};
	
	var seventh_char = {
		x: 300,
		x0: 300,
		y: 300,
		y0: 300,
		angle: 0,
		index: 0,
		alpha: Math.PI * 2 / 180,
		radius: 100,
		draw : function(){
			var img = document.getElementById("char17");
			ctx.drawImage(img, this.x, this.y);
		},
		update : function(){
			if (this.index == 360){
				this.index = -360;
			};
			this.angle += this.angle * Math.PI / 180;
			this.index += 1;
			var theta = this.alpha * this.index;
			this.x = this.x0 + Math.floor(1 - Math.cos(theta + this.angle) * this.radius);
			this.y = this.y0 + Math.floor(1 - Math.sin(theta + this.angle) * this.radius);
		}
	};
	
	var eighth_char = {
		x: 300,
		x0: 300,
		y: 300,
		y0: 300,
		angle: 0,
		index: 0,
		alpha: Math.PI * 2 / 180,
		radius: 100,
		draw : function(){
			var img = document.getElementById("char16");
			ctx.drawImage(img, this.x, this.y);
		},
		update : function(){
			if (this.index == 360){
				this.index = -360;
			};
			this.angle += this.angle * Math.PI / 180;
			this.index += 1;
			var theta = this.alpha * this.index;
			this.x = this.x0 + Math.floor(1 - Math.cos(theta + this.angle) * this.radius);
			this.y = this.y0 + Math.floor(1 - Math.sin(theta + this.angle) * this.radius);
		}
	};

	var ninth_char = {
		x: 300,
		x0: 300,
		y: 300,
		y0: 300,
		angle: 0,
		index: 0,
		alpha: Math.PI * 2 / 180,
		radius: 100,
		draw : function(){
			var img = document.getElementById("char13");
			ctx.drawImage(img, this.x, this.y);
		},
		update : function(){
			if (this.index == 360){
				this.index = -360;
			};
			this.angle += this.angle * Math.PI / 180;
			this.index += 1;
			var theta = this.alpha * this.index;
			this.x = this.x0 + Math.floor(1 - Math.cos(theta + this.angle) * this.radius);
			this.y = this.y0 + Math.floor(1 - Math.sin(theta + this.angle) * this.radius);
		}
	};
	
	var second_line_first_char = {
		x: 310,
		x0: 310,
		y: 300,
		y0: 300,
		angle: 0,
		index: 0,
		alpha: Math.PI * 2 / 180,
		radius: 250,
		draw : function(){
			var img = document.getElementById("char12");
			ctx.drawImage(img, this.x, this.y);
		},
		update : function(){
			if (this.index == 360){
				this.index = -360;
			};
			this.angle += this.angle * Math.PI / 180;
			this.index += 1;
			var theta = this.alpha * this.index;
			this.x = this.x0 + Math.floor(Math.cos(theta + this.angle) * this.radius);
			this.y = this.y0 + Math.floor(1 - Math.sin(theta + this.angle) * this.radius);
		}
	};
	
	var second_line_second_char = {
		x: 310,
		x0: 310,
		y: 300,
		y0: 300,
		angle: 0,
		index: 0,
		break_index: 0, 
		alpha: Math.PI * 2 / 180,
		radius: 250,
		draw : function(){
			var img = document.getElementById("char10");
			ctx.drawImage(img, this.x, this.y);
		},
		update : function(){
			if (this.index == 360){
				this.index = -360;
			};
			this.angle += this.angle * Math.PI / 180;
			this.index += 1;
			var theta = this.alpha * this.index;
			this.x = this.x0 + Math.floor(Math.cos(theta + this.angle) * this.radius);
			this.y = this.y0 + Math.floor(1 - Math.sin(theta + this.angle) * this.radius);
		}
	};
	
	var second_line_third_char = {
		x: 310,
		x0: 310,
		y: 300,
		y0: 300,
		angle: 0,
		index: 0,
		alpha: Math.PI * 2 / 180,
		radius: 250,
		draw : function(){
			var img = document.getElementById("char11");
			ctx.drawImage(img, this.x, this.y);
		},
		update : function(){
			if (this.index == 360){
				this.index = -360;
			};
			this.angle += this.angle * Math.PI / 180;
			this.index += 1;
			var theta = this.alpha * this.index;
			this.x = this.x0 + Math.floor(Math.cos(theta + this.angle) * this.radius);
			this.y = this.y0 + Math.floor(1 - Math.sin(theta + this.angle) * this.radius);
		}
	};
	
	var second_line_fourth_char = {
		x: 310,
		x0: 310,
		y: 300,
		y0: 300,
		angle: 0,
		index: 0,
		alpha: Math.PI * 2 / 180,
		radius: 250,
		draw : function(){
			var img = document.getElementById("char12");
			ctx.drawImage(img, this.x, this.y);
		},
		update : function(){
			if (this.index == 360){
				this.index = -360;
			};
			this.angle += this.angle * Math.PI / 180;
			this.index += 1;
			var theta = this.alpha * this.index;
			this.x = this.x0 + Math.floor(Math.cos(theta + this.angle) * this.radius);
			this.y = this.y0 + Math.floor(1 - Math.sin(theta + this.angle) * this.radius);
		}
	};
	
	var second_line_fifth_char = {
		x: 310,
		x0: 310,
		y: 300,
		y0: 300,
		angle: 0,
		index: 0,
		alpha: Math.PI * 2 / 180,
		radius: 250,
		draw : function(){
			var img = document.getElementById("char13");
			ctx.drawImage(img, this.x, this.y);
		},
		update : function(){
			if (this.index == 360){
				this.index = -360;
			};
			this.angle += this.angle * Math.PI / 180;
			this.index += 1;
			var theta = this.alpha * this.index;
			this.x = this.x0 + Math.floor(Math.cos(theta + this.angle) * this.radius);
			this.y = this.y0 + Math.floor(1 - Math.sin(theta + this.angle) * this.radius);
		}
	};
	
	var second_line_sixth_char = {
		x: 310,
		x0: 310,
		y: 300,
		y0: 300,
		angle: 0,
		index: 0,
		alpha: Math.PI * 2 / 180,
		radius: 250,
		draw : function(){
			var img = document.getElementById("char14");
			ctx.drawImage(img, this.x, this.y);
		},
		update : function(){
			if (this.index == 360){
				this.index = -360;
			};
			this.angle += this.angle * Math.PI / 180;
			this.index += 1;
			var theta = this.alpha * this.index;
			this.x = this.x0 + Math.floor(Math.cos(theta + this.angle) * this.radius);
			this.y = this.y0 + Math.floor(1 - Math.sin(theta + this.angle) * this.radius);
		}
	};
	
	var second_line_seventh_char = {
		x: 310,
		x0: 310,
		y: 300,
		y0: 300,
		angle: 0,
		index: 0,
		alpha: Math.PI * 2 / 180,
		radius: 250,
		draw : function(){
			var img = document.getElementById("char15");
			ctx.drawImage(img, this.x, this.y);
		},
		update : function(){
			if (this.index == 360){
				this.index = -360;
			};
			this.angle += this.angle * Math.PI / 180;
			this.index += 1;
			var theta = this.alpha * this.index;
			this.x = this.x0 + Math.floor(Math.cos(theta + this.angle) * this.radius);
			this.y = this.y0 + Math.floor(1 - Math.sin(theta + this.angle) * this.radius);
		}
	};
	
	var second_line_eighth_char = {
		x: 310,
		x0: 310,
		y: 300,
		y0: 300,
		angle: 0,
		index: 0,
		alpha: Math.PI * 2 / 180,
		radius: 250,
		draw : function(){
			var img = document.getElementById("char16");
			ctx.drawImage(img, this.x, this.y);
		},
		update : function(){
			if (this.index == 360){
				this.index = -360;
			};
			this.angle += this.angle * Math.PI / 180;
			this.index += 1;
			var theta = this.alpha * this.index;
			this.x = this.x0 + Math.floor(Math.cos(theta + this.angle) * this.radius);
			this.y = this.y0 + Math.floor(1 - Math.sin(theta + this.angle) * this.radius);
		}
	};
	
	var second_line_ninth_char = {
		x: 310,
		x0: 310,
		y: 300,
		y0: 300,
		angle: 0,
		index: 0,
		alpha: Math.PI * 2 / 180,
		radius: 250,
		draw : function(){
			var img = document.getElementById("char17");
			ctx.drawImage(img, this.x, this.y);
		},
		update : function(){
			if (this.index == 360){
				this.index = -360;
			};
			this.angle += this.angle * Math.PI / 180;
			this.index += 1;
			var theta = this.alpha * this.index;
			this.x = this.x0 + Math.floor(Math.cos(theta + this.angle) * this.radius);
			this.y = this.y0 + Math.floor(1 - Math.sin(theta + this.angle) * this.radius);
		}
	};
	
	var second_line_tenth_char = {
		x: 310,
		x0: 310,
		y: 300,
		y0: 300,
		angle: 0,
		index: 0,
		alpha: Math.PI * 2 / 180,
		radius: 250,
		draw : function(){
			var img = document.getElementById("char18");
			ctx.drawImage(img, this.x, this.y);
		},
		update : function(){
			if (this.index == 360){
				this.index = -360;
			};
			this.angle += this.angle * Math.PI / 180;
			this.index += 1;
			var theta = this.alpha * this.index;
			this.x = this.x0 + Math.floor(Math.cos(theta + this.angle) * this.radius);
			this.y = this.y0 + Math.floor(1 - Math.sin(theta + this.angle) * this.radius);
		}
	};
	

	
	function move() {
		if(load_screen_switch){		
			ctx.clearRect(0, 0, 800, 800);				
			ctx.drawImage(document.getElementById('titlechar1'), 0, 15);
			ctx.drawImage(document.getElementById("titlechar2"), 0, 50);
			ctx.drawImage(document.getElementById("1line"), 50, 15);
			ctx.drawImage(document.getElementById("2line"), 50, 50);
			//ctx.drawImage(document.getElementById("author"), 700, 700);
			first_char.update();
			second_line_first_char.update();
			second_line_first_char.draw();
			first_char.draw();
			if (counter > (inner_circle_offset * 1)){
			second_char.update();
			second_char.draw();		
			};
			if (counter > middle_circle_offset * 1){
				second_line_second_char.update();
				second_line_second_char.draw();
			};
			if (counter > (inner_circle_offset * 2) ){
				third_char.update();
				third_char.draw();
			};
			if (counter > middle_circle_offset * 2){
				second_line_third_char.update();
				second_line_third_char.draw();
			}
			if (counter > (inner_circle_offset * 3)){
				fourth_char.update();
				fourth_char.draw();
			}
			if (counter > middle_circle_offset * 3){
				second_line_fourth_char.update();
				second_line_fourth_char.draw();
			}
			if (counter > (inner_circle_offset * 4)){
				fifth_char.update();
				fifth_char.draw();
			}
			if (counter > middle_circle_offset * 4){
				second_line_fifth_char.update();
				second_line_fifth_char.draw();
			}
			if (counter > (inner_circle_offset * 5)){
				sixth_char.update();
				sixth_char.draw();
			}
			if (counter > middle_circle_offset * 5){
				second_line_sixth_char.update();
				second_line_sixth_char.draw();
			}
			if (counter > (inner_circle_offset * 6)){
				seventh_char.update();
				seventh_char.draw();
			}
			if(counter > middle_circle_offset * 6){
				second_line_seventh_char.update();
				second_line_seventh_char.draw();
			}
			if(counter > middle_circle_offset * 7){
				second_line_eighth_char.update();
				second_line_eighth_char.draw();
			}
			if (counter > middle_circle_offset * 8){
				second_line_ninth_char.update();
				second_line_ninth_char.draw();
			}
			if ( counter > middle_circle_offset * 9){
				second_line_tenth_char.update();
				second_line_tenth_char.draw();
				return;
			}
		counter += 1;	
		}
	}
	var redraw_first_line = window.setInterval(move, 20);
/*Controls loading screen length*/
    var intervalID = window.setInterval(checkReady, 7000);

    function checkReady() {
		ctx.clearRect(0,0,ctx.width, ctx.height);
        if (document.getElementsByTagName('body')[0] !== undefined) {
            window.clearInterval(redraw_first_line);
            callback.call(this);
			load_screen_switch = false;
			window.clearInterval(intervalID);
        }
    }
}

function show(id, value) {

    document.getElementById(id).className = value ? 'visible' : 'hidden';
}

function primaryCanvasLogic()
{
	var primarycanvas = document.getElementById('primarycanvas');
	var window_width = $(window).width();
	var window_height = $(window).height();
	primarycanvas.width = window_width;
	primarycanvas.height = window_height;
}

onReady(function () {
    show('page', true);
    show('loader-wrapper', false);
	show("loader", false);
	new Audio('/audio/startBeep.mp3').play();
	return;
});
