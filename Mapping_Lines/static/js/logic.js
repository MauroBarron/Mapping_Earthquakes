// Basic console.log check to see if our code is working.
console.log("Entering code section - working so far");

// Create the map object with a center and zoom level.
// let map = L.map('mapid').setView([37.804, -122.272], 12);
let map = L.map('mapid').setView([37.6213, -122.3790], 5);

// Create the tile layer that serves as background
//let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {

attribution: 'Map data: © <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
	maxZoom: 18,
	accessToken: API_KEY
});

//Add the tile layer to the map
streets.addTo(map);

//QA Check
console.log("Was our map presented with the Streets tile?");

// Add a marker to the map for Oakland
//let marker = L.marker([37.8044, -122.2712]);
//marker.addTo(map);

// // Add a circle to the map for LA 
// let circleM = L.circleMarker([34.0522, -118.2437], {
// 	radius: 300,
// 	color: 'black',
//     fillColor: '#ffffa1'    
// });
// circleM.addTo(map);
// Loop through the cities array and create one marker for each city.
// cities.forEach(function(city) {
// 	console.log(city)
//    });
// Loop through the cities array and create one marker for each city.

// Get data from cities.js
let cityData = cities;

// Loop through the cities array and create one marker for each city.
// With a PopUp
cityData.forEach(function(city) {
	console.log(city)
	L.circleMarker(city.location, {
		radius: city.population/200000,
		color: 'orange',
		weight: 4

	})	
	.bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
	.addTo(map);
});

// Post marker check
console.log("Was our city array added to the map?");


// Coordinates for each point to be used in the line.
let line = [
	[37.6213, -122.3790],
	[44.0582, -121.3153],
	[30.1975, -97.6664],
	[43.6777, -79.6248],
	[40.6413, -73.7781]
  ];

// Create a polyline using the line coordinates and make the line red.
L.polyline(line, {
	color: "blue",
	dashArray: '15, 15', 
	dashOffset: '10',
	weight: 4,
	opacity: 0.5
  }).addTo(map);

  // Post line  check
console.log("Were our lines added to the map?");
