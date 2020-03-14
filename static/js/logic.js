// Basic console.log check to see if our code is working.
console.log("Entering code section - working so far");

// Create the base dark layer
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data: © <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create the optional light layer
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data: © <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
  Dark: dark,
  Light: light
};

// Create the map object with Toronto as center and zoom level.
let map = L.map('mapid', {
  center:[44.0, -80.0],
  zoom: 2,
  layers: [dark]
 });

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

//QA Check
console.log("Was our Toronto map presented with the Dark and Light options?");


// Accessing the airport GeoJSON via GitHub URL
let torontoData = "https://raw.githubusercontent.com/MauroBarron/Mapping_Earthquakes/Mapping_GeoJSON_Linestrings/static/data/torontoRoutes.json";

// Create a style for the lines.
let geoStyle = {
	color: "#ffffa1",
	weight: 2
}

// Grabbing our GeoJSON data.
d3.json(torontoData).then(function(data) {
  console.log(data);

// Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    style: geoStyle,
    onEachFeature: function(feature, layer) {
      console.log(layer);
      layer.bindPopup("<h2>" + "Airline: " + feature.properties.airline + "</h2>"
      + "<hr>" + "<h3>" + "Destination:" + feature.properties.dst + "</h3>");
  }
  }).addTo(map);
});
//QA Check
console.log("Was our airport data map presented?");

//
// Adding GeoJSONData from a GeoJSON data structure.
// 
// First present a data structure.
//
// let sanFranAirport =
// {"type":"FeatureCollection","features":[{
//     "type":"Feature",
//     "properties":{
//         "id":"3469",
//         "name":"San Francisco International Airport",
//         "city":"San Francisco",
//         "country":"United States",
//         "faa":"SFO",
//         "icao":"KSFO",
//         "alt":"13",
//         "tz-offset":"-8",
//         "dst":"A",
//         "tz":"America/Los_Angeles"},
// 	"geometry":{
// 		"type":"Point",
// 		"coordinates":[-122.375,37.61899948120117]}}
// ]};
//
// Secondly,the code  
//
// Basic Code
// L.geoJSON(sanFranAirport).addTo(map);
// 
// Use the pointToLayer 
//
// L.geoJson(sanFranAirport, {
//     // We turn each feature into a marker on the map.
//     pointToLayer: function(feature, latlng) {
//     	console.log(feature);
// 		return L.marker(latlng)
// 		.bindPopup("<h2>" + feature.properties.name + "</h2>"
// 		+ "<hr>" + "<h3>" + feature.properties.city + ", " + feature.properties.country + "</h3>") 
// 	}
//   }).addTo(map);
//
// Use the onEachFeature Function
//
//  L.geoJson(sanFranAirport, {
//     // We turn each feature into a marker on the map.
//     onEachFeature: function(feature, layer) {
//     	console.log(layer);
// 		layer.bindPopup("<h2>" + "Airport code: " + feature.properties.faa + "</h2>"
// 		+ "<hr>" + "<h3>" + "Airport Name:" + feature.properties.name + "</h3>");
// 	}
//   }).addTo(map);

//
// Oakland coordintes([37.8044, -122.2712]);
//
//
// Add a circle to the map for LA 
// 
// let circleM = L.circleMarker([34.0522, -118.2437], {
// 	radius: 300,
// 	color: 'black',
//     fillColor: '#ffffa1'    
// });
// circleM.addTo(map);
// 
//
//Loop through the cities array and create one marker for each city.
//
// cities.forEach(function(city) {
// 	console.log(city)
//    });
// Loop through the cities array and create one marker for each city.
//// 
//  Loop thru cites and create a marker with a popup for each city,
// 
// Get data from cities.js
// let cityData = cities;

// // Loop and Pop
// cityData.forEach(function(city) {
// 	console.log(city)
// 	L.circleMarker(city.location, {
// 		radius: city.population/200000,
// 		color: 'orange',
// 		weight: 4
// 	})	
// 	.bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
// 	.addTo(map);
// });
// // Post marker check
// console.log("Was our city array with markers added to the map?");
//
//
//  Add multilines to map
//
// Coordinates for each point to be used in the line.
// let line = [
// 	[37.6213, -122.3790],
// 	[44.0582, -121.3153],
// 	[30.1975, -97.6664],
// 	[43.6777, -79.6248],
// 	[40.6413, -73.7781]
//   ];

// // Create a polyline using the line coordinates and make the line red.
// L.polyline(line, {
// 	color: "blue",
// 	dashArray: '15, 15', 
// 	dashOffset: '10',
// 	weight: 4,
// 	opacity: 0.5
//   }).addTo(map);

// // Post line  check
// console.log("Were our lines added to the map?");