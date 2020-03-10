// Basic console.log check to see if our code is working.
console.log("Entering code section - working so far");

// Create the map object with a center and zoom level.
// let map = L.map('mapid').setView([37.804, -122.272], 12);
let map = L.map('mapid').setView([40.7, -94.5], 4);

// Create the tile layer that serves as background
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
	maxZoom: 18,
	accessToken: API_KEY
});

//Add the tile layer to the map
streets.addTo(map);

//QA Check
console.log("Was our map presented?");


// let outdoors = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
// attribution: 'Map data © <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
// 	maxZoom: 18,
// 	accessToken: 'pk.eyJ1IjoiZGF0YW1vbmtleTQ0IiwiYSI6ImNrN2t1Z2c4MTAwdzMzZnBmeDB4cXNhcWoifQ.dwEqEBKubCrlPwfgBG81ig'
// });

// let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/sateliite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
// attribution: 'Map data © <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
// 	maxZoom: 18,
// 	accessToken: 'pk.eyJ1IjoiZGF0YW1vbmtleTQ0IiwiYSI6ImNrN2t1Z2c4MTAwdzMzZnBmeDB4cXNhcWoifQ.dwEqEBKubCrlPwfgBG81ig'
// });
// //var map = L.map('map');

//satelliteStreets.addTo(map);
// let streets = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
// attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
// 	maxZoom: 12,
// 	id: 'mapbox.streets',
// 	accessToken: API_KEY
// });
// let bikes = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
// attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
// 	maxZoom: 18,
// 	id: 'mapbox.run-bike-hike',
// 	accessToken: API_KEY
// });
// let comic = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
// attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
// 	maxZoom: 18,
// 	id: 'mapbox.comic',
// 	accessToken: API_KEY
// });
// let pirates = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
// attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
// 	maxZoom: 18,
// 	id: 'mapbox.pirates',
// 	accessToken: API_KEY
// });
// let dark = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
// attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
// 	maxZoom: 18,
// 	id: 'mapbox.dark',
// 	accessToken: API_KEY
// });


 


// Then we add our 'graymap' tile layer to the map.
//streets.addTo(map);
// // Then we add our 'bike layer' tile layer to the map.
// bikes.addTo(map);
// //comic.addTo(map);
// pirates.addTo(map);
// //dark.addTo(map);

