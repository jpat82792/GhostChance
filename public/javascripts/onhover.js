/*Output handler parses GhostChanceEnglish.xml */
function outputHandler(data, arrayTemp, tag, length, arrayEdits, tagEdits, container, finalcontainer){
	var source = jQuery(data); /*holder of xml*/
	var lengthStorage = Number(source.find(length).text()); /*Number(arg) makes arg an int if possible*/

	for(i = 0; i <= lengthStorage; i++)
	{
		arrayTemp[i] = source.find(tag + i.toString()).text();

	}
	
	for(i = 0; i <= 35; i++)
	{
		arrayEdits[i] = parseInt(source.find(tag + i.toString() + tagEdits).text());

	}
	
	for(i = 0; i <= 35; i++)
	{
		temp = [];
		for(x = 0; x <= arrayEdits[i]; x++)
		{
			temp[x] = parseInt(source.find(tag + i.toString() + tagEdits + x.toString()).text());
		}
		container[i] = temp;
	}
	var holder = 0;

	for(i = 0; i <= 35; i++)
	{
		for(x = 0; x <= (container[i].length); x++)
		{
			if(x == 0)
			{
				if(isNaN(container[i][x]))
				{
					finalcontainer[holder] = arrayTemp[i];
				}
				else{
					finalcontainer[holder] = arrayTemp[i].slice(x, container[i][x]);
				}
				holder += 1;
			}
			
			else if(typeof(container[i][x]) !== "undefined")
			{
				if(typeof(container[i][x+1]) == "undefined")
				{
					finalcontainer[holder] = arrayTemp[i].slice(container[i][x - 1]);
				}
				else
				{
					finalcontainer[holder] = arrayTemp[i].slice(container[i][x - 1], container[i][x]);
				}
				holder += 1;
			}
		}	
	}
}
var container_for_string_edits_number = [];
var translated_lines = [];
var container_edit_coords = [];
var container_for_edited_strings = [];

syncData().done(function(translation_Data){
	outputHandler(translation_Data, translated_lines, "line", "length", container_for_string_edits_number, "tabnumber", container_edit_coords, container_for_edited_strings);
	});

var primary_canvas = document.getElementById("primarycanvas");
var main_ctx = primary_canvas.getContext("2d");
main_ctx.font = "14px Arial";
main_ctx.fillStyle = "#09B025";
var translation_container = [];

/*Gets data via ajax request*/
function getUnparsedData(uri){
	return $.ajax({
		type: "GET",
		url: uri
	});
}
/*Encapsulates getUnparsedData, which contains the translated lines*/
function getTranslatedLines(){
	return getUnparsedData("/data/GhostChanceEnglish.xml");
}

function syncData(){
	return $.when(getTranslatedLines());
}


var x = 30;
var x1 = 250;
var x2 = 400;
var y = 30;
var offset = 15;
var holding_interval;
var flashing_switch = false;
var scrool_hold;
var offset_container = [];
var cursorSwitch = 0;


var coordinates_1stanza = [0, 1, 2, 4, 5, 6, 8, 9, 10, 12, 13, 14, 16, 17, 18, 20, 22, 23, 25, 27, 28, 29, 30,
32, 33, 34, 36, 37, 38, 40, 41, 42, 44, 45, 46, 48, 50, 51, 53, 54, 55, 57, 58, 59, 0, 1, 3, 4, 5, 7, 8, 9, 11, 12, 13, 15, 16, 17, 18, 19, 21, 22, 24, 26, 27, 28,
30, 31, 32, 34, 35, 37, 38, 40, 41, 42, 44, 45, 46, 48, 49, 50, 52, 53, 54, 56, 57, 58, 60, 62, 63, 64, 66, 67];	

/*intervals hold reference to cursor flashing function*/
var first_interval = window.setInterval(function (){cursorFlashing("first-line-cursor")}, 350);
var second_interval;
var third_interval;
var fourth_interval;
var fifth_interval;
var switch_container = [false];
var id_container = ["1char0", "1char1", "1char2", "1char3", "1char4", "1char5", "1char6", "1char7", "1char8", "1char9",
"1char10", "1char11", "1char12", "1char13", "1char14", "1char15", "1char16", "1char17", "1char18", "1char19", "1char20",
"1char21", "1char22", "1char23", "1char24", "1char25", "1char26", "1char27", "1char28", "1char29", "1char30", "1char31",
"1char32", "1char33", "1char34", "1char35"];
var textCounter = 0;
var flashing = true;
var holder = 1;
var flag = 0; 
var overall_offset = 0;

var scrolling_offset = 1;
function scrollUp()
{
	/*window.clearInterval(second_interval);
	document.getElementById("second-line-cursor").className = "hidden";*/
	window.clearInterval(third_interval);
	main_ctx.clearRect(0, 0, 700, 700);
	for(i = 0; i < 44; i++)
	{
		main_ctx.fillText(container_for_edited_strings[i], x, y + (coordinates_1stanza[i] - scrolling_offset));
	}
	scrolling_offset += 1;
	if(scrolling_offset >700)
	{
		flashing_switch = true;
		window.clearInterval(holding_interval);
		window.clearInterval(second_interval);
		main_ctx.clearRect(0,0,700,700);
		overall_offset = 0
		third_interval = window.setInterval(function(){cursorFlashing("third-line-cursor");}, 350);
	}
}

function scrollNextTest(interval, length, scroll_amount, first_index, last_index, stop_flashing, second_stanza)
{
	second_stanza = parseInt(second_stanza);
	if(second_stanza == 2){

		flashing = false;
		flashing_switch = false;
		window.clearInterval(interval);
		cursorSwitch = 0;
		main_ctx.clearRect(0, 0, 700, 700);

		for (i = 44; i <= length; i++)
		{
			coordinates_1stanza[i] -= (holder - (holder - 1));
			main_ctx.fillText(container_for_edited_strings[i], x, y + coordinates_1stanza[i]);
		}
		holder += 1;
		if(holder == scroll_amount)
		{
			overall_offset += holder;
			start_index= parseInt(first_index);
			last_index = parseInt(last_index);
			for(i= start_index; i <= last_index; i++)
			{
				coordinates_1stanza[i] *= offset;
				coordinates_1stanza[i] -= overall_offset;
			}
			offset_container[-1] = length;
			flashing = true;
			window.clearInterval(scrool_hold);
			holder = 1;
			if(stop_flashing == 2)
			{
				//second_interval = setInterval(function (){cursorFlashing("second-line-cursor");}, 350);
			}
		}
	}
	else{
		flashing = false;
		flashing_switch = false;
		window.clearInterval(interval);
		cursorSwitch = 0;
		main_ctx.clearRect(0, 0, 700, 700);

		for (i = 0; i <= length; i++)
		{
			coordinates_1stanza[i] -= (holder - (holder - 1));
			main_ctx.fillText(container_for_edited_strings[i], x, y + coordinates_1stanza[i]);
		}
		holder += 1;
		if(holder == scroll_amount)
		{
			overall_offset += holder;
			start_index= parseInt(first_index);
			last_index = parseInt(last_index);
			for(i= start_index; i <= last_index; i++)
			{
				coordinates_1stanza[i] *= offset;
				coordinates_1stanza[i] -= overall_offset;
			}
			offset_container[-1] = length;
			flashing = true;

			window.clearInterval(scrool_hold);
			holder = 1;
			if(stop_flashing == 2)
			{
				//second_interval = setInterval(function (){cursorFlashing("second-line-cursor");}, 350);
			}
		}
	}

}

function removeCharacters(start,end)
{
	for(i = start; i<= end; i++)
	{
		document.getElementById(id_container[i]).className= "not-visible";
	}
}
var x_coord_letter = [250, 270, 290, 310, 330, 350, 370, 390, 410, 430];
var y_coord_letter = [];
var possible_letter = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var falling_strings = [];
for (i = 0; i <= x_coord_letter.length; i++)
{
	y_coord_letter[i] = ((Math.random()* (-50)) + 0);
}



function letterFalling()
{
	updateLetterFalling();
	drawLetterFalling();
}

function updateLetterFalling()
{
	for(i = 0; i <=x_coord_letter.length; i++)
	{
		y_coord_letter[i] += 1;
		if(y_coord_letter[i] == 710)
		{
			y_coord_letter[i] = -1;
		}
	}
	updateLetter();
}

function drawLetterFalling()
{
	main_ctx.clearRect(250, 0, 700, 700);
	for(i = 0; i<= falling_strings.length; i++)
	{
		main_ctx.fillText(falling_strings[i], x_coord_letter[i], y_coord_letter[i]);
	}
}

function updateLetter()
{
	for(i = 0; i <= x_coord_letter.length; i++)
	{
		falling_strings[i] = possible_letter[Math.floor(Math.random()*25) + 0];
	}
}

function randomLines()
{
		var index = Math.floor(Math.random()*93) + 0;
		var not = parseInt((Math.floor(Math.random() * 700) + 10));
		var better = parseInt((Math.floor(Math.random() * 700) + 250));
		main_ctx.fillText(container_for_edited_strings[index], better, not);
}

function htmlElement(id)
{
	swanson = parseInt(Math.floor((Math.random()*100)+0));
	if (swanson <50)
	{
		document.getElementById(id).style.opacity = "0";
	}
	else
	{
		document.getElementById(id).style.opacity = "100";
	}
}

function initErrorScreen()
{
	document.getElementById("page").className = 'hidden';
	document.getElementById("primarycanvas").className = "hidden";
	document.getElementById('errorScreen').className = "thing";
	document.getElementById('errorScreen').background = "#3A7FBF";
	$('html').css({"background": "3A7FBF"});
	window.setInterval(showCredits, 5000)
}

function showCredits()
{
	document.getElementById('errorScreen').className = "hidden";
	document.getElementById('attribution').className= "thing";
	window.setInterval(function(){location.reload();}, 10000)
}

function killScroll()
{
	window.clearInterval(holding_interval);
}

function drawText(selector){
	
	if(selector == "#1char0")
	{
		coordinates_1stanza[0] *= offset;
		coordinates_1stanza[1] *= offset;
		coordinates_1stanza[2] *= offset;
		main_ctx.fillText(container_for_edited_strings[0], x, y + coordinates_1stanza[0]);
		main_ctx.fillText(container_for_edited_strings[1], x, y + coordinates_1stanza[1]);
		main_ctx.fillText(container_for_edited_strings[2], x, y + coordinates_1stanza[2]);
	}
	
	if(selector == "#1char1")
	{
		coordinates_1stanza[3] *= offset;
		coordinates_1stanza[4] *= offset;
		coordinates_1stanza[5] *= offset;
		main_ctx.fillText(container_for_edited_strings[3], x, y +  coordinates_1stanza[3]);
		main_ctx.fillText(container_for_edited_strings[4], x, y +  coordinates_1stanza[4]);
		main_ctx.fillText(container_for_edited_strings[5], x, y +  coordinates_1stanza[5]);
	}
	
	if(selector == "#1char2")
	{
		coordinates_1stanza[6] *= offset;
		coordinates_1stanza[7] *= offset;
		coordinates_1stanza[8] *= offset;
		main_ctx.fillText(container_for_edited_strings[6], x, y + coordinates_1stanza[6]);
		main_ctx.fillText(container_for_edited_strings[7], x, y + coordinates_1stanza[7]);
		main_ctx.fillText(container_for_edited_strings[8], x, y + coordinates_1stanza[8]);
	}
	
	if(selector == "#1char3")
	{
		coordinates_1stanza[9] *= offset;
		coordinates_1stanza[10] *= offset;
		coordinates_1stanza[11] *= offset;
		main_ctx.fillText(container_for_edited_strings[9], x, y + coordinates_1stanza[9]);
		main_ctx.fillText(container_for_edited_strings[10], x, y + coordinates_1stanza[10]);
		main_ctx.fillText(container_for_edited_strings[11], x, y + coordinates_1stanza[11]);
	}
	
	if(selector == "#1char4")
	{
		coordinates_1stanza[12] *= offset;
		coordinates_1stanza[13] *= offset;
		coordinates_1stanza[14] *= offset;
		main_ctx.fillText(container_for_edited_strings[12], x, y + coordinates_1stanza[12]);
		main_ctx.fillText(container_for_edited_strings[13], x, y + coordinates_1stanza[13]);
		main_ctx.fillText(container_for_edited_strings[14], x, y + coordinates_1stanza[14]);
	}
	
	if(selector == "#1char5")
	{
		coordinates_1stanza[15] *= offset; //alone
		main_ctx.fillText(container_for_edited_strings[15], x, y + coordinates_1stanza[15]);
	}
	
	if(selector == "#1char6")
	{
		coordinates_1stanza[16] *= offset; //i /exist
		coordinates_1stanza[17] *= offset; //a splinter
		main_ctx.fillText(container_for_edited_strings[16], x, y + coordinates_1stanza[16]);
		main_ctx.fillText(container_for_edited_strings[17], x, y + coordinates_1stanza[17]);
	}
	
	if(selector == "#1char7")
	{
		coordinates_1stanza[18] *= offset; //of cloud .]
		main_ctx.fillText(container_for_edited_strings[18], x, y + coordinates_1stanza[18]);
		document.getElementById("first-line-cursor").className = "hidden";
	}

	if(selector == "#1char8")
	{
		coordinates_1stanza[19] *= offset; // [i
		coordinates_1stanza[20] *= offset;// and region
		coordinates_1stanza[21] *= offset;// meet
		coordinates_1stanza[22] *= offset;//in chance connections ,
		main_ctx.fillText(container_for_edited_strings[19], x, y + coordinates_1stanza[19]);
		main_ctx.fillText(container_for_edited_strings[20], x, y + coordinates_1stanza[20]);
		main_ctx.fillText(container_for_edited_strings[21], x, y + coordinates_1stanza[21]);
		main_ctx.fillText(container_for_edited_strings[22], x, y + coordinates_1stanza[22]);
	}
	
	if(selector == "#1char9")
	{
		coordinates_1stanza[23] *= offset; //spaces between
		coordinates_1stanza[24] *= offset; // machine and flesh
		coordinates_1stanza[25] *= offset; // like this:
		main_ctx.fillText(container_for_edited_strings[23], x, y + coordinates_1stanza[23]);
		main_ctx.fillText(container_for_edited_strings[24], x, y + coordinates_1stanza[24]);
		main_ctx.fillText(container_for_edited_strings[25], x, y + coordinates_1stanza[25]);
	}
	
	if(selector == "#1char10")
	{
		coordinates_1stanza[26] *= offset;// wood spear
		coordinates_1stanza[27] *= offset;// skin palm
		coordinates_1stanza[28] *= offset;// curve of life and earth
		main_ctx.fillText(container_for_edited_strings[26], x, y + coordinates_1stanza[26]);
		main_ctx.fillText(container_for_edited_strings[27], x, y + coordinates_1stanza[27]);
		main_ctx.fillText(container_for_edited_strings[28], x, y + coordinates_1stanza[28]);
	}
	
	if(selector == "#1char11")
	{
		coordinates_1stanza[29] *= offset; //sun bleaches
		coordinates_1stanza[30] *= offset; // my hair in a natural relfection
		coordinates_1stanza[31] *= offset; // of bleached sun.
		main_ctx.fillText(container_for_edited_strings[29], x, y + coordinates_1stanza[29]);
		main_ctx.fillText(container_for_edited_strings[30], x, y + coordinates_1stanza[30]);
		main_ctx.fillText(container_for_edited_strings[31], x, y + coordinates_1stanza[31]);
	}
	
	if(selector =="#1char12")
	{
		coordinates_1stanza[32] *= offset; //i exist
		coordinates_1stanza[33] *= offset; //on the earth,
		coordinates_1stanza[34] *= offset;	// i am, with my hands
		main_ctx.fillText(container_for_edited_strings[32], x, y + coordinates_1stanza[32]);
		main_ctx.fillText(container_for_edited_strings[33], x, y + coordinates_1stanza[33]);
		main_ctx.fillText(container_for_edited_strings[34], x, y + coordinates_1stanza[34]);
		scrool_hold = window.setInterval(function(){scrollNextTest("scrool_hold","34", "65", '35', '35', '2')},20);
		//removeCharacters(0,0);
	}
	
	if(selector =="#1char13")
	{
		//coordinates_1stanza[35] *= offset; //flesh , like this
		main_ctx.fillText(container_for_edited_strings[35], x, y + coordinates_1stanza[35]);
		scrool_hold = window.setInterval(function(){scrollNextTest("scrool_hold","35", "65", '36', '37', '2')}, 20);
		//removeCharacters(1,1);
	}
	
	if(selector =="#1char14")
	{
		/*coordinates_1stanza[36] *= offset;
		coordinates_1stanza[37] *= offset;*/
		main_ctx.fillText(container_for_edited_strings[36], x, y + coordinates_1stanza[36]);
		main_ctx.fillText(container_for_edited_strings[37], x, y + coordinates_1stanza[37]);
		scrool_hold = window.setInterval(function(){scrollNextTest("scrool_hold", "37", "65", '38', '40', '2')}, 20);
		//removeCharacters(2,2);
	}
	
	if(selector == "#1char15")
	{
		/*coordinates_1stanza[38] *= offset;
		coordinates_1stanza[39] *= offset;
		coordinates_1stanza[40] *= offset;*/
		main_ctx.fillText(container_for_edited_strings[38], x, y + coordinates_1stanza[38]);
		main_ctx.fillText(container_for_edited_strings[39], x, y + coordinates_1stanza[39]);
		main_ctx.fillText(container_for_edited_strings[40], x, y + coordinates_1stanza[40]);
		scrool_hold = window.setInterval(function(){scrollNextTest("scrool_hold","40", "65", '41', '43','2')}, 20);
		//removeCharacters(3,3);
	}
	
	if(selector == "#1char16")
	{
		/*coordinates_1stanza[41] *= offset;
		coordinates_1stanza[42] *= offset;
		coordinates_1stanza[43] *= offset;
		coordinates_1stanza[44] *= offset;*/
		window.clearInterval(second_interval);
		document.getElementById("second-line-cursor").className = "hidden";
		main_ctx.fillText(container_for_edited_strings[41], x, y + coordinates_1stanza[41]);
		main_ctx.fillText(container_for_edited_strings[42], x, y + coordinates_1stanza[42]);
		main_ctx.fillText(container_for_edited_strings[43], x, y + coordinates_1stanza[43]);

		holding_interval = window.setInterval(scrollUp, 15);
		//third_interval = window.setInterval(function(){cursorFlashing("third-line-cursor");},350);
		//removeCharacters(4,16);
	}

	if(selector == "#1char17")//

	{
		coordinates_1stanza[44] *= offset;
		coordinates_1stanza[45] *= offset;

		coordinates_1stanza[44] += 1;
		main_ctx.fillText(container_for_edited_strings[44], x, y + coordinates_1stanza[44]);
		main_ctx.fillText(container_for_edited_strings[45], x, y + coordinates_1stanza[45]);
		window.setInterval(randomLines, 500);
		window.setInterval(function () { main_ctx.clearRect(250, 0, 1000, 700);}, 1000);
		window.setInterval(function () {htmlElement("1char0");}, 100);



		

		//scrool_hold = window.setInterval(function(){scrollNextTest("scrool_hold","40", "65", '41', '44')}, 20);
	}
	
	if(selector == "#1char18")//
	{
		coordinates_1stanza[46] *= offset;
		coordinates_1stanza[47] *= offset;
		coordinates_1stanza[48] *= offset;

		main_ctx.fillText(container_for_edited_strings[46], x, y + coordinates_1stanza[46]);
		main_ctx.fillText(container_for_edited_strings[47], x, y + coordinates_1stanza[47]);
		main_ctx.fillText(container_for_edited_strings[48], x, y + coordinates_1stanza[48]);
		window.setInterval(randomLines, 775);
		window.setInterval(function () { main_ctx.clearRect(250, 0, 700, 700);}, 1000);

	}
	
	if(selector == "#1char19")//
	{
		coordinates_1stanza[49] *= offset;
		coordinates_1stanza[50] *= offset;
		coordinates_1stanza[51] *= offset;
		main_ctx.fillText(container_for_edited_strings[49], x, y + coordinates_1stanza[49]);
		main_ctx.fillText(container_for_edited_strings[50], x, y + coordinates_1stanza[50]);
		main_ctx.fillText(container_for_edited_strings[51], x, y + coordinates_1stanza[51]);
		window.setInterval(randomLines, 350);
		//window.setInterval(function () { main_ctx.clearRect(250, 0, 700, 700);}, 1000);
	}
	
	if(selector == "#1char20")//
	{
		coordinates_1stanza[52] *= offset;
		coordinates_1stanza[53] *= offset;
		coordinates_1stanza[54] *= offset;
		main_ctx.fillText(container_for_edited_strings[52], x, y + coordinates_1stanza[52]);
		main_ctx.fillText(container_for_edited_strings[53], x, y + coordinates_1stanza[53]);
		main_ctx.fillText(container_for_edited_strings[54], x, y + coordinates_1stanza[54]);
		window.setInterval(function () {htmlElement("1char1");}, 20);
		window.setInterval(function () {htmlElement("1char2");}, 600);

		//main_ctx.fillText(container_for_edited_strings[55], x, y + coordinates_1stanza[55]);
		
	}
	
	if(selector == "#1char21")
	{
		coordinates_1stanza[55] *= offset;
		coordinates_1stanza[56] *= offset;
		coordinates_1stanza[57] *= offset;
		coordinates_1stanza[58] *= offset;
		coordinates_1stanza[59] *= offset;
		main_ctx.fillText(container_for_edited_strings[55], x, y + coordinates_1stanza[55]);
		main_ctx.fillText(container_for_edited_strings[56], x, y + coordinates_1stanza[56]);
		main_ctx.fillText(container_for_edited_strings[57], x, y + coordinates_1stanza[57]);
		main_ctx.fillText(container_for_edited_strings[58], x, y + coordinates_1stanza[58]);
		main_ctx.fillText(container_for_edited_strings[59], x, y + coordinates_1stanza[59]);
		window.setInterval(randomLines, 250);
	}
	
	if(selector == "#1char22")
	{
		coordinates_1stanza[60] *= offset;
		coordinates_1stanza[61] *= offset;
		main_ctx.fillText(container_for_edited_strings[60], x, y + coordinates_1stanza[60]);
		main_ctx.fillText(container_for_edited_strings[61], x, y + coordinates_1stanza[61]);
	}

	if(selector == "#1char23")
	{
		coordinates_1stanza[62] *= offset; //inverted
		main_ctx.fillText(container_for_edited_strings[62], x, y + coordinates_1stanza[62]);
	}
	
	if(selector == "#1char24")
	{
		coordinates_1stanza[63] *= offset;
		coordinates_1stanza[64] *= offset;
		coordinates_1stanza[65] *= offset;
		main_ctx.fillText(container_for_edited_strings[63], x, y + coordinates_1stanza[63]);
		main_ctx.fillText(container_for_edited_strings[64], x, y + coordinates_1stanza[64]);
		main_ctx.fillText(container_for_edited_strings[65], x, y + coordinates_1stanza[65]);
		window.setInterval(randomLines, 200);
	}
	
	if(selector == "#1char25")
	{
		coordinates_1stanza[66] *= offset;
		coordinates_1stanza[67] *= offset;
		coordinates_1stanza[68] *= offset;
		main_ctx.fillText(container_for_edited_strings[66], x, y + coordinates_1stanza[66]);
		main_ctx.fillText(container_for_edited_strings[67], x, y + coordinates_1stanza[67]);
		main_ctx.fillText(container_for_edited_strings[68], x, y + coordinates_1stanza[68]);
		window.setInterval(function () {htmlElement("1char3");}, 1500);
		window.setInterval(function () {htmlElement("1char4");}, 30);
	}
	
	if(selector == "#1char26")
	{
		coordinates_1stanza[69] *= offset;
		coordinates_1stanza[70] *= offset;
		main_ctx.fillText(container_for_edited_strings[69], x, y + coordinates_1stanza[69]);
		main_ctx.fillText(container_for_edited_strings[70], x, y + coordinates_1stanza[70]);
		window.setInterval(randomLines, 150);
	}
	
	if(selector == "#1char27")
	{
		coordinates_1stanza[71] *= offset;
		coordinates_1stanza[72] *= offset;
		main_ctx.fillText(container_for_edited_strings[71], x, y + coordinates_1stanza[71]);
		main_ctx.fillText(container_for_edited_strings[72], x, y + coordinates_1stanza[72]);
	}
	
	if(selector == "#1char28")
	{
		coordinates_1stanza[73] *= offset;
		coordinates_1stanza[74] *= offset;
		coordinates_1stanza[75] *= offset;
		main_ctx.fillText(container_for_edited_strings[73], x, y + coordinates_1stanza[73]);
		main_ctx.fillText(container_for_edited_strings[74], x, y + coordinates_1stanza[74]);
		main_ctx.fillText(container_for_edited_strings[75], x, y + coordinates_1stanza[75]);
		window.setInterval(function () {htmlElement("1char5");}, 45);
		window.setInterval(function () {htmlElement("1char6");}, 90);
		window.setInterval(function () {htmlElement("1char7");}, 50);
	}
	
	if(selector == "#1char29")
	{
		coordinates_1stanza[76] *= offset;
		coordinates_1stanza[77] *= offset;
		coordinates_1stanza[78] *= offset;
		main_ctx.fillText(container_for_edited_strings[76], x, y + coordinates_1stanza[76]);
		main_ctx.fillText(container_for_edited_strings[77], x, y + coordinates_1stanza[77]);
		main_ctx.fillText(container_for_edited_strings[78], x, y + coordinates_1stanza[78]);
		scrool_hold = window.setInterval(function() {scrollNextTest("scrool_hold", "78", "65", '79','81','2','2');}, 20);
		window.setInterval(function () {htmlElement("1char8");}, 45);
		window.setInterval(function () {htmlElement("1char9");}, 90);
		window.setInterval(function () {htmlElement("1char10");}, 50);
		window.setInterval(function () {htmlElement("1char11");}, 45);
		window.setInterval(function () {htmlElement("1char12");}, 90);
		window.setInterval(function () {htmlElement("1char13");}, 50);
	}
	
	if(selector == "#1char30")
	{
		/*coordinates_1stanza[79] *= offset;
		coordinates_1stanza[80] *= offset;
		coordinates_1stanza[81] *= offset;*/
		main_ctx.fillText(container_for_edited_strings[79], x, y + coordinates_1stanza[79]);
		main_ctx.fillText(container_for_edited_strings[80], x, y + coordinates_1stanza[80]);
		main_ctx.fillText(container_for_edited_strings[81], x, y + coordinates_1stanza[81]);
		scrool_hold = window.setInterval(function() {scrollNextTest("scrool_hold", "81", "65", '82','84','2','2');}, 20);
		window.setInterval(randomLines, 75);
		window.setInterval(function () {htmlElement("1char14");}, 45);
		window.setInterval(function () {htmlElement("1char15");}, 90);
		window.setInterval(function () {htmlElement("1char16");}, 50);
		window.setInterval(function () {htmlElement("1char17");}, 45);
		window.setInterval(function () {htmlElement("1char18");}, 90);
		window.setInterval(function () {htmlElement("1char19");}, 50);
	}
	
		if(selector == "#1char31")
	{
		/*coordinates_1stanza[82] *= offset;
		coordinates_1stanza[83] *= offset;
		coordinates_1stanza[84] *= offset;*/
		main_ctx.fillText(container_for_edited_strings[82], x, y + coordinates_1stanza[82]);
		main_ctx.fillText(container_for_edited_strings[83], x, y + coordinates_1stanza[83]);
		main_ctx.fillText(container_for_edited_strings[84], x, y + coordinates_1stanza[84]);
		scrool_hold = window.setInterval(function() {scrollNextTest("scrool_hold", "84", "65", '85','87','2','2');}, 20);
		window.setInterval(function () {htmlElement("1char20");}, 45);
		window.setInterval(function () {htmlElement("1char21");}, 90);
		window.setInterval(function () {htmlElement("1char22");}, 50);
		window.setInterval(function () {htmlElement("1char23");}, 45);
		window.setInterval(function () {htmlElement("1char24");}, 90);
		window.setInterval(function () {htmlElement("1char25");}, 50);
	}
		
	if(selector == "#1char32")
	{
		/*coordinates_1stanza[85] *= offset;
		coordinates_1stanza[86] *= offset;
		coordinates_1stanza[87] *= offset;*/
		main_ctx.fillText(container_for_edited_strings[85], x, y + coordinates_1stanza[85]);
		main_ctx.fillText(container_for_edited_strings[86], x, y + coordinates_1stanza[86]);
		main_ctx.fillText(container_for_edited_strings[87], x, y + coordinates_1stanza[87]);
		scrool_hold = window.setInterval(function() {scrollNextTest("scrool_hold", "87", "65", '88','88','2','2');}, 20);
	}
	if(selector == "#1char33")
	{
		//coordinates_1stanza[89] *= offset;
		main_ctx.fillText(container_for_edited_strings[88], x, y + coordinates_1stanza[88]);
		scrool_hold = window.setInterval(function() {scrollNextTest("scrool_hold", "88", "65", '89','91','2','2');}, 20);	
	}
	
	if(selector == "#1char34")
	{
		/*coordinates_1stanza[90] *= offset;
		coordinates_1stanza[91] *= offset;
		coordinates_1stanza[92] *= offset;*/
		main_ctx.fillText(container_for_edited_strings[89], x, y + coordinates_1stanza[89]);
		main_ctx.fillText(container_for_edited_strings[90], x, y + coordinates_1stanza[90]);
		main_ctx.fillText(container_for_edited_strings[91], x, y + coordinates_1stanza[91]);
		scrool_hold = window.setInterval(function() {scrollNextTest("scrool_hold", "91", "65", '92','93','2','2');}, 20);
		window.setInterval(randomLines, 50);
	}
	
	if(selector == "#1char35")
	{
		/*coordinates_1stanza[93] *= offset;
		coordinates_1stanza[94] *= offset;*/
		main_ctx.fillText(container_for_edited_strings[92], x, y + coordinates_1stanza[92]);
		main_ctx.fillText(container_for_edited_strings[93], x, y + coordinates_1stanza[93]);
		window.setInterval(function () {htmlElement("1char26");}, 35);
		window.setInterval(function () {htmlElement("1char27");}, 800);
		window.setInterval(function () {htmlElement("1char28");}, 30);
		window.setInterval(function () {htmlElement("1char29");}, 60);
		window.setInterval(function () {htmlElement("1char30");}, 90);
		window.setInterval(function () {htmlElement("1char31");}, 15);
		window.setInterval(function () {htmlElement("1char32");}, 600);
		window.setInterval(function () {htmlElement("1char33");}, 890);
		window.setInterval(function () {htmlElement("1char34");}, 47);
		window.setInterval(initErrorScreen, 5000);	

	//	window.setInterval(function () {htmlElement("1char35");}, 50);
		
//			scrool_hold = window.setInterval(function() {scrollNextTest("scrool_hold", "78", "65", '79','81','2','2');}, 20);
	}
}



function cursorFlashing(element_id){

	if (cursorSwitch == 0 )
	{
		document.getElementById(element_id).className = "cursor-on";
		cursorSwitch = 1
	}
	else
	{
		document.getElementById(element_id).className = "cursor-off";
		cursorSwitch = 0;
	}
}
function revealChineseCharactersText(character_number, interval_to_clear, interval_to_initiate, cursor_to_end, cursor_to_initialize )
{
	for (i=0; i <= switch_container.length - 1; i++)
	{
		if(flashing)
		{
			if(textCounter < character_number)
			{
				if(switch_container[i] == false)
				{
					switch_container[i] = true;
					/*if container is defined*/
					if(typeof(id_container[i]) !== 'undefined'){
						document.getElementById(id_container[i]).className = "thing"; //makes element display
						drawText("#"+ id_container[i]); //Causes text to appear on screen
						switch_container[i+1] = false;
						i = switch_container.length + 1;
						textCounter += 1;
						if(textCounter == character_number)
						{

							document.getElementById(cursor_to_end).className = "hidden";
							if(cursor_to_end == "first-line-cursor")
							{
								window.clearInterval(interval_to_clear);
								second_interval = window.setInterval(function(){cursorFlashing('second-line-cursor');}, 350);
							}
							if(cursor_to_end == "second-line-cursor")
							{
								window.clearInterval(interval_to_clear);
								window.clearInterval(second_interval);
								third_interval = window.setInterval(function(){cursorFlashing("third-line-cursor");}, 350);
							}
							if(cursor_to_end == "third-line-cursor")
							{
								window.clearInterval(interval_to_clear);
								window.clearInterval(third_interval);
								fourth_interval = window.setInterval(function(){cursorFlashing("fourth-line-cursor");}, 350);
							}
							if(cursor_to_end == "fourth-line-cursor")
							{
								window.clearInterval(interval_to_clear);
								window.clearInterval(fourth_interval);
								fifth_interval = window.setInterval(function(){cursorFlashing("fifth-line-cursor");}, 350);
							}
							if(cursor_to_end == "fifth-line-cursor")
							{
								window.clearInterval(interval_to_clear);
								window.clearInterval(fifth_interval);
							}
							
						}
				}
			}
		}
	}
	}
}
