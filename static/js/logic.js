// Basic console.log check to see if our code is working.
console.log("Entering code section - working so far");

// Create the base map using streets layer
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data: © <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create the satellite streets layer
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data: © <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create the outdoors layer
let outdoors = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data: © <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create a base layer that holds all three maps.
let baseMaps = {
  "Streets": streets,
  "Satellite": satelliteStreets,
  "Outdoors": outdoors
};

// Create the earthquake layer for our map.
let earthquakes = new L.layerGroup();
let tectonics = new L.layerGroup();

// We define an object that contains the overlays.
// This overlay will be visible all the time.
let overlays = {
  "Earthquakes": earthquakes,
  "Tectonic Plates": tectonics
};

// Create the map object to World center and zoom level of 3 wiht strees as base layer.
let map = L.map('mapid', {
  center:[30, -30],
  zoom: 3,
  layers: [streets]
 });

// Add a control to the map that will allow the user to change which layers are visible.
L.control.layers(baseMaps, overlays).addTo(map);

//QA Check
console.log("Was the world map presented with the streets, satellite and outdoor options?");

// Get the USGS earthquake data for last seven days and map with circleMarker. 
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
    //Popup for each circleMarker to display the magnitude and location
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


//
// Challenge Section: add tectonic plates and data to map
//
// Accessing the tectonic plates data in GeoJSON format via fraxen GitHub
let tectonicData =  "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"

// Create a style for the fracture lines. Dark Green. 
let geoStyle = {
	color: "#006400",
	weight: 2
}

// Grabbing our GeoJSON data.
d3.json(tectonicData).then(function(data) {
  console.log(data);

// Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    style: geoStyle,
    onEachFeature: function(feature, layer) {
      console.log(layer);
  }
  }).addTo(tectonics);
  
  tectonics.addTo(map)
});
//Exit QA Check
console.log("Was our map presented with 3 layer options and two overlays?");