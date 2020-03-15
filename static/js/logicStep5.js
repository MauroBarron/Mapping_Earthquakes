// Basic console.log check to see if our code is working.
console.log("Entering code section - working so far");

// Create the base dark layer
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data: © <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create the optional light layer
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data: © <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
  "Streets": streets,
  "Satellite": satelliteStreets
};

// Create the earthquake layer for our map.
let earthquakes = new L.layerGroup();

// We define an object that contains the overlays.
// This overlay will be visible all the time.
let overlays = {
  Earthquakes: earthquakes
};


// Create the map object with US  center and zoom level.
let map = L.map('mapid', {
  center:[39.5, -98.5],
  zoom: 3,
  layers: [streets]
 });

// Then we add a control to the map that will allow the user to change
// which layers are visible.
L.control.layers(baseMaps, overlays).addTo(map);


//QA Check
console.log("Was the US map presented with the Street and Satellite options?");


// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {

// Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
// We turn each feature into a circleMarker on the map.
    pointToLayer: function(feature, latlng) {
        console.log(data);
        return L.circleMarker(latlng);
        },
    style: styleInfo,
    //Create a popup for each circleMarker to display the magnitude and
    //location of the earthquake after the marker has been created and styled.
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }
  }).addTo(earthquakes);
  // Add the earthquake layer to map
  earthquakes.addTo(map);
});


// Legend
// Create a legend control object.
let legend = L.control({position: "bottomright"});

legend.onAdd = function() {
  let div = L.DomUtil.create("div", "info legend");
  const magnitudes = [0, 1, 2, 3, 4, 5];
  const colors = [
    "#98ee00",
    "#d4ee00",
    "#eecc00",
    "#ee9c00",
    "#ea822c",
    "#ea2c2c"
   ];
  // Looping through our intervals to generate a label with a colored square for each interval.
  for (var i = 0; i < magnitudes.length; i++) {
    console.log(colors[i]);
    div.innerHTML +=
    '<i style="background:' +  getColor(magnitudes[i] + 1) + '"></i> ' +
      magnitudes[i] + (magnitudes[i + 1] ? "–" + magnitudes[i + 1] + '<br>' : "+");
  }
  return div;
  };

legend.addTo(map);

// This function returns the style data for each of the earthquakes we plot on the map. 
// We pass the magnitude of the earthquake into a functionto calculate the radius.
    function styleInfo(feature) {
    return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(feature.properties.mag),
        color: "#000000",
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5
    };
};

// This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
function getRadius(magnitude) {
    if (magnitude === 0) {
        return 1;
    }
    return magnitude * 4;
};

// This function determines the color of the circle based on the magnitude of the earthquake.
function getColor(magnitude) {
  if (magnitude > 5) {
    return "#ea2c2c";
  }
  if (magnitude > 4) {
    return "#ea822c";
  }
  if (magnitude > 3) {
    return "#ee9c00";
  }
  if (magnitude > 2) {
    return "#eecc00";
  }
  if (magnitude > 1) {
    return "#d4ee00";
  }
  return "#98ee00";
}



// // Accessing the airport GeoJSON via GitHub URL
// let torontoHoods = "https://raw.githubusercontent.com/MauroBarron/Mapping_Earthquakes/Mapping_GeoJSON_Polygons/static/data/torontoNeighborhoods.json";

// // Create a style for the lines.
// let geoStyle = {
// 	color: "#3399FF",
// 	weight: 1
// }

// // Grabbing our GeoJSON data.
// d3.json(torontoHoods).then(function(data) {
//   console.log(data);

// // Creating a GeoJSON layer with the retrieved data.
//   L.geoJson(data, {
//     style: geoStyle,
//     onEachFeature: function(feature, layer) {
//       console.log(layer);
//       layer.bindPopup("<h2>" + "Neighborhood: " + feature.properties.AREA_NAME + "</h2>"
//       //+ "<hr>" + "<h3>" + "Destination:" + feature.properties.dst + "</h3>");
//       );
//   }
//   }).addTo(map);
// });
// //QA Check
// console.log("Was our airport data map presented?");

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