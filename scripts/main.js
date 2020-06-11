//declare variables

var timeLeft = 601;
var landed = false;

var var1 = ["High", "Medium", "Low", "Dangerous", "Brace for impact"];
var var2 = 10;
var var3 = [5,3,10,9,27,6,9,3,23,17,13];
var var4 = [10,20,30,40,50,60,70,80,90,100,110,120,130];
var var5 = "Safe Travels!";

var var1Picker = 1;
var var3Picker = 1;
var var4Picker = 1;

var timer600 = 0;

//varaible for unsplash api

var searchTerm = "black"

// initialise mapbox api

mapboxgl.accessToken = 'pk.eyJ1IjoiamFjb2J2YWFuZHJhZ2VyIiwiYSI6ImNrYjl2czBoMTBpMzcydWpwNGM1cjlyZ2wifQ.Pv1lJ2WHFkk4wQfH5qwa0A';

let url = "";

//make the map

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [4.322840, 52.067101],
  zoom: 11.15
});

//allows the user to enter coordinates

var coordinatesGeocoder = function(query) {

// match anything which looks like a decimal degrees coordinate pair

var matches = query.match(
	/^[ ]*(?:Lat: )?(-?\d+\.?\d*)[, ]+(?:Lng: )?(-?\d+\.?\d*)[ ]*$/i
	);
	if (!matches) {
		return null;
	}
 
	function coordinateFeature(lng, lat) {
		return {
	center: [lng, lat],
	geometry: {
	type: 'Point',
	coordinates: [lng, lat]
	},
	place_name: 'Lat: ' + lat + ' Lng: ' + lng,
	place_type: ['coordinate'],
	properties: {},
	type: 'Feature'
  };
}
 
	var coord1 = Number(matches[1]);
	var coord2 = Number(matches[2]);
	var geocodes = [];
 
	if (coord1 < -90 || coord1 > 90) {
		// must be lng, lat
		geocodes.push(coordinateFeature(coord1, coord2));
	}
	 
	if (coord2 < -90 || coord2 > 90) {
		// must be lat, lng
		geocodes.push(coordinateFeature(coord2, coord1));
	}
	 
	if (geocodes.length === 0) {
		// else could be either lng, lat or lat, lng
		geocodes.push(coordinateFeature(coord1, coord2));
		geocodes.push(coordinateFeature(coord2, coord1));
	}
	 
		return geocodes;
};

//adding search function and markers

	map.addControl(
  	new MapboxGeocoder({
    	accessToken: mapboxgl.accessToken,
    	localGeocoder: coordinatesGeocoder,
    	mapboxgl: mapboxgl
 
  	}),
  	'top-left'
);

function startUp(){

	//run every second
	everySecond();

	//display all variables in HTML
	document.getElementById('var1').innerHTML = "Incoming asteroids: " + var1[var1Picker];
	document.getElementById('var2').innerHTML = "Elevation of landing site: " + var2 + "m";
	document.getElementById('var3').innerHTML = "Thrust: " + var3[var3Picker] +"m/s";
    document.getElementById('var4').innerHTML = "Acceleration: " + var4[var4Picker] +"m/s";
	document.getElementById('var5').innerHTML = "" + var5;

	//timed functions for variables
	setInterval(everySecond, 1000);
	setInterval(every5Seconds, 10000);
	setInterval(every4Seconds, 4000);
	setInterval(every6Seconds, 6000);

}

	var center;

	function everySecond(){

	if (timer600 < 600)
	{

		//if time is less than 600 
		timer600 = timer600 + 1;
		timeLeft = timeLeft - 1;
		document.getElementById('timeLeft').innerHTML = "Time left to Earth: " + timeLeft + "s";

	}
	else {

		//if time is more than 600
		document.getElementById("ship2").style.visibility = "hidden";
		document.getElementById('timeLeft').innerHTML = "Congrats, Successful Landing!";

	}

      let accessKey = "aJ3pbVZjSd3hYPGrDZQMpQFUe3WCKjMP4o2yU__2QZ4";
    
      let urlPics = "https://api.unsplash.com/search/photos?client_id=" +accessKey + "&page=1&query=" + searchTerm;
     

      // Request API pics

      fetch(urlPics)
        .then(function(data) {
          return data.json();
        })
        .then(function(data) {
        	
        	//console.log("working");
         	// console.log(data);

          var imgLink = data.results[0].urls.regular;
         
         	// console.log(imgLink);

         document.getElementById("landingSite").src = imgLink;

        });
;}

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
	
	document.getElementById('var4').innerHTML = "Acceleration: " + var4[var4Picker] +"m/s";

}

function linkImageMap() {

	// get middle of map coords
	var NewMapCenter = map.getCenter();
	var real = mapboxgl.LngLat.convert(NewMapCenter);
	
	//console.log(real);


	let URLpos = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + String(real.lng) + "," + String(real.lat) + ".json?access_token=pk.eyJ1IjoiamFjb2J2YWFuZHJhZ2VyIiwiYSI6ImNrYjl2czBoMTBpMzcydWpwNGM1cjlyZ2wifQ.Pv1lJ2WHFkk4wQfH5qwa0A";
	
	//console.log(URLpos);
	//let URLpos = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + String(0.1278) + "," + String(51.5074) + ".json?access_token=pk.eyJ1IjoiamFjb2J2YWFuZHJhZ2VyIiwiYSI6ImNrYjl2czBoMTBpMzcydWpwNGM1cjlyZ2wifQ.Pv1lJ2WHFkk4wQfH5qwa0A";
	
	//fetch place_name from coordinates
	fetch(URLpos)
		.then(function(data){
			return data.json();
		})
		.then(function(data)
		{


	     var posSRC = JSON.stringify(data);

	     console.log(data);

	     searchTerm = data.features[0].place_name;
	    // console.log(searchTerm);

		});
}

//when lock-in target is pressed, call link image and map function

document.getElementById("generate").onclick = function(){

linkImageMap();

}



//initialisation 
startUp();




 

