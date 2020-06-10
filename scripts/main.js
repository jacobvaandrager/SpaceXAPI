var timeLeft = 601;
var landed = false;

var var1 = ["High", "Medium", "Low", "Dangerous", "Brace for impact"];
var var2 = 10;
var var3 = [5,3,10,9,27,6,9,3,23,17,13];
var var4 = [10,20,30,40,50,60,70,80,90,100,110,120,130];
var var5 = "test";

var var1Picker = 1;
var var3Picker = 1;
var var4Picker = 1;

mapboxgl.accessToken = 'pk.eyJ1IjoiamFjb2J2YWFuZHJhZ2VyIiwiYSI6ImNrYjl2czBoMTBpMzcydWpwNGM1cjlyZ2wifQ.Pv1lJ2WHFkk4wQfH5qwa0A';


var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [4.322840, 52.067101],
  zoom: 11.15
});

map.addControl(
  new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
  }),
  'top-left'
);

//get location data and find nearest restaurnts 


function startUp(){

	everySecond();

	document.getElementById('var1').innerHTML = "Incoming asteroids: " + var1[var1Picker];
	document.getElementById('var2').innerHTML = "Elevation of landing site: " + var2 + "m";
	document.getElementById('var3').innerHTML = "Thrust: " + var3[var3Picker] +"m/s";
    document.getElementById('var4').innerHTML = "Acceleration: " + var4[var4Picker] +"m/s";
	document.getElementById('var5').innerHTML = "" + var5;

	setInterval(everySecond, 1000);
	setInterval(every5Seconds, 10000);
	setInterval(every4Seconds, 4000);
	setInterval(every6Seconds, 6000);

}


function everySecond(){

	if (timeLeft <= 0){

		landed = true;
		document.getElementById("ship").style.visibility =="hidden";

	}
	else
	{

		timeLeft = timeLeft - 1;
		document.getElementById('timeLeft').innerHTML = "Time left to Earth: " + timeLeft + "s";

	}

}

function every5Seconds(){

	var1Picker = Math.floor(Math.random()*5);
	document.getElementById('var1').innerHTML = "Incoming asteroids: " + var1[var1Picker];
	document.getElementById('var2').innerHTML = "Elevation of landing site: " + var2 + "m";
	document.getElementById('var5').innerHTML = "" + var5;

}



function every4Seconds(){

	var3Picker = Math.floor(Math.random()*9);
	document.getElementById('var3').innerHTML = "Thrust: " + var3[var3Picker] +"m/s";

}

function every6Seconds(){

	var4Picker = Math.floor(Math.random()*11);
	console.log(var4Picker);
	document.getElementById('var4').innerHTML = "Acceleration: " + var4[var4Picker] +"m/s";

}


startUp();
