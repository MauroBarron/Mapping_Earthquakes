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
console.log("Was our map presented in the branch?");