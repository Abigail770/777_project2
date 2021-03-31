$('.btn.btn-primary').click( function(e) {
    $('.collapse').collapse('hide');
    // $("select").each(function() { this.selectedIndex = 0 });
});

const client = new carto.Client({
    apiKey: '5u-RGrhxG21jti2xJQUAfA',
    username: 'amgleason2'
  });

var lengthQuery = 'All';
var difficultyQuery = 'All';
var filterInfo = "";

const boundarySource = new carto.source.SQL('SELECT * from park_boundary');
const boundaryStyle = new carto.style.CartoCSS(`
#layer {
    line-color: black;
    polygon-fill:  #228b22;
    polygon-opacity: 0.15;
}
`);

const boundaryLayer = new carto.layer.Layer(boundarySource, boundaryStyle);

const hikingSource = new carto.source.SQL('SELECT * from hikingtr_dissolve');
const hikingStyle = new carto.style.CartoCSS(`
#layer {
    line-width: 3;
    line-color: #000;
    line-dasharray: 4;
}
`);
const hikingLayer = new carto.layer.Layer(hikingSource, hikingStyle, {
    featureClickColumns: ['name', 'length', 'difficulty']
});

const xcSource = new carto.source.SQL('SELECT * from xctr_dissolve');
const xcStyle = new carto.style.CartoCSS(`
#layer {
    line-width: 3;
    line-color: #000080;
}
`);
const xcLayer = new carto.layer.Layer(xcSource, xcStyle, {
    featureClickColumns: ['name']
});

const bikeSource = new carto.source.SQL('SELECT * from mtntr_dissolve');
const bikeStyle = new carto.style.CartoCSS(`
#layer {
    line-width: 3;
    line-color: #be6400;
}
`);
const bikeLayer = new carto.layer.Layer(bikeSource, bikeStyle, {
    featureClickColumns: ['name']
});

const hikingBufferSource = new carto.source.SQL('SELECT * from hikingtr_dissolve');
const hikingBufferStyle = new carto.style.CartoCSS(`
#layer {
    line-width: 15;
    line-opacity: 0;
}
`);
const hikingBufferLayer = new carto.layer.Layer(hikingBufferSource, hikingBufferStyle, {
    featureClickColumns: ['name', 'length', 'difficulty']
});

hikingBufferLayer.on('featureClicked', featureEvent => {
    var content = `<h6>Hiking Trail</h6>
    <strong>Name: </strong>${featureEvent.data.name}<br>
    <strong>Length: </strong>${featureEvent.data.length}<br>
    <strong>Difficulty: </strong>${featureEvent.data.difficulty}`;

    var popup = L.popup()
        .setLatLng(featureEvent.latLng)
        .setContent(content)
        .openOn(map);
});

const xcBufferSource = new carto.source.SQL('SELECT * from xctr_dissolve');
const xcBufferStyle = new carto.style.CartoCSS(`
#layer {
    line-width: 15;
    line-opacity: 0;
}
`);
const xcBufferLayer = new carto.layer.Layer(xcBufferSource, xcBufferStyle, {
    featureClickColumns: ['name', 'length', 'difficulty']
});

xcBufferLayer.on('featureClicked', featureEvent => {
    var content = `<h6>Ski Trail</h6>
    <strong>Name: </strong>${featureEvent.data.name}<br>
    <strong>Length: </strong>${featureEvent.data.length}<br>
    <strong>Difficulty: </strong>${featureEvent.data.difficulty}`;

    var popup = L.popup()
        .setLatLng(featureEvent.latLng)
        .setContent(content)
        .openOn(map);
});

const bikeBufferSource = new carto.source.SQL('SELECT * from mtntr_dissolve');
const bikeBufferStyle = new carto.style.CartoCSS(`
#layer {
    line-width: 15;
    line-opacity: 0;
}
`);
const bikeBufferLayer = new carto.layer.Layer(bikeBufferSource, bikeBufferStyle, {
    featureClickColumns: ['name', 'length', 'difficulty']
});

bikeBufferLayer.on('featureClicked', featureEvent => {
    var content = `<h6>Bike Trail</h6>
    <strong>Name: </strong>${featureEvent.data.name}<br>
    <strong>Length: </strong>${featureEvent.data.length}<br>
    <strong>Difficulty: </strong>${featureEvent.data.difficulty}`;


    var popup = L.popup()
        .setLatLng(featureEvent.latLng)
        .setContent(content)
        .openOn(map);
});

const historicSource = new carto.source.SQL('SELECT * from historicplaces_devilslake');
const historicStyle = new carto.style.CartoCSS(`
#layer {
    [zoom > 12][zoom <= 14]{
        marker-width: 22;
    }
    [zoom > 14][zoom <= 16]{
        marker-width: 35;
    }
    [zoom > 16]{
        marker-width: 45;
    }
    marker-fill: #1E8449;
    marker-file: url(https://s3.amazonaws.com/com.cartodb.users-assets.production/maki-icons/triangle-18.svg);
}
`);
const historicLayer = new carto.layer.Layer(historicSource, historicStyle, {
    featureClickColumns: ['name', "description", "the_geom"]
});

const reviewSource = new carto.source.SQL('SELECT * from reviews');
const reviewStyle = new carto.style.CartoCSS(`
#layer {
    [zoom > 12][zoom <= 14]{
        marker-width: 20;
    }
    [zoom > 14][zoom <= 16]{
        marker-width: 35;
    }
    [zoom > 16]{
        marker-width: 45;
    }
    marker-fill:#ffb84d;
    marker-allow-overlap: true;
    marker-line-width: 0.5;
    marker-line-color: #000;
    marker-line-opacity: 1;
    marker-file: url(https://s3.amazonaws.com/com.cartodb.users-assets.production/maki-icons/camera-18.svg) 
}
`);
const reviewLayer = new carto.layer.Layer(reviewSource, reviewStyle, {
    featureClickColumns: ['date', "comments", "rating", "issue"]
});

const historicBufferSource = new carto.source.SQL('SELECT * from historicplaces_devilslake');
const historicBufferStyle = new carto.style.CartoCSS(`
#layer {
    marker-width: 14; 
    opacity: 0;
}
`);
const historicBufferLayer = new carto.layer.Layer(historicBufferSource, historicBufferStyle, {
    featureClickColumns: ['name', "description", "the_geom"]
});


historicBufferLayer.on('featureClicked', featureEvent => {
    if (featureEvent.data.description){
        var content = `
        <h6>${featureEvent.data.name}</h6>
        ${featureEvent.data.description}`;
    }else{
        var content = `<h6>${featureEvent.data.name}</h6>`;
    }

    var popup = L.popup()
        .setLatLng(featureEvent.latLng)
        .setContent(content)
        .openOn(map);
});

const reviewBufferSource = new carto.source.SQL('SELECT * from reviews');
const reviewBufferStyle = new carto.style.CartoCSS(`
#layer {
    marker-width: 15; 
    opacity: 0;
}
`);
const reviewBufferLayer = new carto.layer.Layer(reviewBufferSource, reviewBufferStyle, {
    featureClickColumns: ['date', "comments", "rating", "issue"]
});


reviewBufferLayer.on('featureClicked', featureEvent => {
    const content = `
      <strong> Date: </strong> ${featureEvent.data.date}<br>
      <strong>Comments: </strong>${featureEvent.data.comments}<br>
      <strong>Rating: </strong>${featureEvent.data.rating}<br>
      <strong>Issues: </strong>${featureEvent.data.issue}<br>
    `;

    var popup = L.popup()
        .setLatLng(featureEvent.latLng)
        .setContent(content)
        .openOn(map);

    // document.getElementById('info').innerHTML = content;
});

const poiSource = new carto.source.SQL('SELECT * from pointsofinterest');
const poiStyle = new carto.style.CartoCSS(`
#layer {
    [zoom > 12][zoom <= 14]{
        marker-width: 24;
    }
    [zoom > 14][zoom <= 16]{
        marker-width: 36;
    }
    [zoom > 16]{
        marker-width: 48;
    }
    marker-fill:#0099cc;
    marker-file: url(https://s3.amazonaws.com/com.cartodb.users-assets.production/maki-icons/marker-18.svg);
}
`);

const poiLayer = new carto.layer.Layer(poiSource, poiStyle, {
    featureClickColumns: ['name']
});

const poiBufferSource = new carto.source.SQL('SELECT * from pointsofinterest');
const poiBufferStyle = new carto.style.CartoCSS(`
#layer {
    marker-width: 15; 
    opacity: 0;
}
`);

const poiBufferLayer = new carto.layer.Layer(poiBufferSource, poiBufferStyle, {
    featureClickColumns: ['name']
});


poiBufferLayer.on('featureClicked', featureEvent => {
    const content = `${featureEvent.data.name}<br>`;

    var popup = L.popup()
        .setLatLng(featureEvent.latLng)
        .setContent(content)
        .openOn(map);
});

var lat;
var lon;

$('#loc').click(getLocation);
$('#map-finder').click(findOnMap);

function findOnMap(){
    alert("Click a location on the map")
    map.on('click', function(e) {
        alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
        lat=e.latlng.lat;
        lon=e.latlng.lng;
        $('#location').val(lat + "," + lon);
        map.off('click');
    });
    return;
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    lat= position.coords.latitude;
    lon= position.coords.longitude;
    $('#location').val(lat + "," + lon);
}


$('#submit').click(function(){
    var date = $('#date').val();
    var comments = $('#comments').val();
    var rating = $('#rating').val();
    var issue = $('#issues').val();

    if(lat == null && lon == null){
        lat_lon = $('#location').val()
        if (lat_lon !== null && typeof lat_lon !== undefined && lat_lon !== ""){
            lat = lat_lon.split(",")[1].trim();
            lon = lat_lon.split(",")[0].trim()
        }
    }

   if(!isNaN(rating) && rating !==null && typeof rating !== undefined && rating !== ""){
       if (lat != null && lon !== null && !isNaN(lat) && !isNaN(lon) && typeof lat !== undefined && typeof lon !== undefined && lat !== "" && lon != ""){
            if (comments !== null && typeof comments !== undefined && comments !== ""){
                if (date !== null && typeof date !== undefined && date !== ""){
                        $.getJSON(`https://amgleason2.carto.com/api/v2/sql?q=INSERT INTO reviews (the_geom, date, comments, lat, lon, rating, issue) VALUES (ST_SetSRID(ST_Point('` + lon + `', '` + lat + `'),4326), '` + date + `', '` + comments + `', '` + lat + `', '` + lon + `', '` + rating + `', '` + issue + `')&api_key=5u-RGrhxG21jti2xJQUAfA`, function(data) {
                        })
                        alert("Thanks for submitting a review!");
                }else{
                    alert("Please select a date.");
                }
            }else{
                alert("Please enter a comment.");
            }
        }else{
            alert("Please enter a location.");
        }
    }
    else{
        alert("Please rate your experience.");
    }
});

var map = L.map('map',{
    maxZoom: 18,
    zoomControl: false,
    // layers: [USGS_USTopo],
}).setView([43.42, -89.69], 14)

map.createPane("backgroundPane").style.zIndex = 100;
map.createPane("foregroundPane").style.zIndex = 200;

var USGS_USImageryTopo = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryTopo/MapServer/tile/{z}/{y}/{x}', {
	maxZoom: 20,
    pane:'backgroundPane',
	attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>'
});
// var USGS_USTopo = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}', {
// 	maxZoom: 20,
//     pane:'backgroundPane',
// 	attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>'
// });

var USGS_USTopo = L.esri.basemapLayer('Topographic',{
    pane:'backgroundPane',
}).addTo(map);

var baseMaps = {
    "USGS Topo": USGS_USTopo,
    "USGS Imagery": USGS_USImageryTopo
};

map.addLayer(USGS_USTopo);

$('#map').css('top', $('#navbar').outerHeight());
$('#map').css('left', "50px");
$('#sidebar').css('top', $('#navbar').outerHeight());

// Add Leaflet controls to map
L.control.layers(baseMaps).addTo(map);
L.control.locate().addTo(map);
var zoomHome = L.Control.zoomHome();
zoomHome.addTo(map);

populateHistoricalDropDown();
populateHikingDropDown();
populateMtnDropDown();
populateSkiDropDown();
populateLengthDropdown();
populateDifficultyDropdown();
populatePoiDropdown();

// Populate dropdown
function populateHistoricalDropDown(){
    return fetch(
        `https://amgleason2.carto.com/api/v2/sql?format=geoJSON&q=SELECT the_geom, name FROM historicplaces_devilslake ORDER BY name ASC`
        ).then((resp) => resp.json())
        .then((response) => {
            return response['features'].map(function(feature){
                option = document.createElement("option")
                option.setAttribute("value", feature.properties.name)
                option.textContent = feature.properties.name
                document.getElementById("selectHistoricalDrop").appendChild(option);
            });
        }).catch((error) => {
            console.log(error)
        })
}

function populateHikingDropDown(){
    return fetch(
        `https://amgleason2.carto.com/api/v2/sql?format=geoJSON&q=SELECT the_geom, name FROM hikingtr_dissolve ORDER BY name ASC`
        ).then((resp) => resp.json())
        .then((response) => {
            return response['features'].map(function(feature){
                option = document.createElement("option")
                option.setAttribute("value", feature.properties.name)
                option.textContent = feature.properties.name
                document.getElementById("selectHikingDrop").appendChild(option);
            });
        }).catch((error) => {
            console.log(error)
        })
}

function populateMtnDropDown(){
    return fetch(
        `https://amgleason2.carto.com/api/v2/sql?format=geoJSON&q=SELECT the_geom, name FROM mtntr_dissolve ORDER BY name ASC`
        ).then((resp) => resp.json())
        .then((response) => {
            return response['features'].map(function(feature){
                option = document.createElement("option")
                option.setAttribute("value", feature.properties.name)
                option.textContent = feature.properties.name
                document.getElementById("selectMtnDrop").appendChild(option);
            });
        }).catch((error) => {
            console.log(error)
        })
}

function populateSkiDropDown(){
    return fetch(
        `https://amgleason2.carto.com/api/v2/sql?format=geoJSON&q=SELECT the_geom, name FROM xctr_dissolve ORDER BY name ASC`
        ).then((resp) => resp.json())
        .then((response) => {
            return response['features'].map(function(feature){
                option = document.createElement("option")
                option.setAttribute("value", feature.properties.name)
                option.textContent = feature.properties.name
                document.getElementById("selectSkiDrop").appendChild(option);
            });
        }).catch((error) => {
            console.log(error)
        })
}

function populatePoiDropdown(){
    return fetch(
        `https://amgleason2.carto.com/api/v2/sql?format=geoJSON&q=SELECT the_geom, name FROM pointsofinterest ORDER BY name ASC`
        ).then((resp) => resp.json())
        .then((response) => {
            return response['features'].map(function(feature){
                option = document.createElement("option")
                option.setAttribute("value", feature.properties.name)
                option.textContent = feature.properties.name
                document.getElementById("selectPoiDrop").appendChild(option);
            });
        }).catch((error) => {
            console.log(error)
        })
}

function populateLengthDropdown(){
    var lengths = ['All', 'Short (under 2 miles)', 'Medium (2-5 miles)', 'Long (over 5 miles)'];
    let uniqueLengths = [...new Set(lengths)];
    uniqueLengths.forEach(function(length){
        option = document.createElement("option")
        option.setAttribute("value", length)
        option.textContent = length
        document.getElementById("lengthDrop").appendChild(option);
    });
    uniqueLengths.forEach(function(length){
        option = document.createElement("option")
        option.setAttribute("value", length)
        option.textContent = length
        document.getElementById("bikeLengthDrop").appendChild(option);
    });
    uniqueLengths.forEach(function(length){
        option = document.createElement("option")
        option.setAttribute("value", length)
        option.textContent = length
        document.getElementById("skiLengthDrop").appendChild(option);
    });
}

function populateDifficultyDropdown(){
    var difficulties = ['All', 'Easy', 'Moderate', 'Difficult'];
    let uniquedifficulties = [...new Set(difficulties)];
    uniquedifficulties.forEach(function(difficulty){
        option = document.createElement("option")
        option.setAttribute("value", difficulty)
        option.textContent = difficulty
        document.getElementById("difficultyDrop").appendChild(option);
    });
    uniquedifficulties.forEach(function(difficulty){
        option = document.createElement("option")
        option.setAttribute("value", difficulty)
        option.textContent = difficulty
        document.getElementById("bikeDifficultyDrop").appendChild(option);
    });
    uniquedifficulties.forEach(function(difficulty){
        option = document.createElement("option")
        option.setAttribute("value", difficulty)
        option.textContent = difficulty
        document.getElementById("skiDifficultyDrop").appendChild(option);
    });
}

// when select option from downdown menu, change bounding box of map to geometry of the selected feature
document.getElementById('selectHistoricalDrop').addEventListener("change", function (e) {
    input = e.currentTarget.selectedOptions[0].attributes[0].value;
    return  fetch(`https://amgleason2.carto.com/api/v2/sql?format=geoJSON&q=SELECT the_geom, name FROM historicplaces_devilslake where name like '${input}'`)
    .then((resp) => resp.json())
    .then((response) => {
        geojsonLayer = L.geoJson(response)
        map.fitBounds(geojsonLayer.getBounds());
    })
});

// when select option from downdown menu, change bounding box of map to geometry of the selected feature
document.getElementById('selectHikingDrop').addEventListener("change", function (e) {
    input = e.currentTarget.selectedOptions[0].attributes[0].value;
    return  fetch(`https://amgleason2.carto.com/api/v2/sql?format=geoJSON&q=SELECT the_geom, name FROM hikingtr_dissolve where name like '${input}'`)
    .then((resp) => resp.json())
    .then((response) => {
        geojsonLayer = L.geoJson(response)
        map.fitBounds(geojsonLayer.getBounds());
    })
});

// when select option from downdown menu, change bounding box of map to geometry of the selected feature
document.getElementById('selectMtnDrop').addEventListener("change", function (e) {
    input = e.currentTarget.selectedOptions[0].attributes[0].value;
    return  fetch(`https://amgleason2.carto.com/api/v2/sql?format=geoJSON&q=SELECT the_geom, name FROM mtntr_dissolve where name like '${input}'`)
    .then((resp) => resp.json())
    .then((response) => {
        geojsonLayer = L.geoJson(response)
        map.fitBounds(geojsonLayer.getBounds());
    })
});

// when select option from downdown menu, change bounding box of map to geometry of the selected feature
document.getElementById('selectSkiDrop').addEventListener("change", function (e) {
    input = e.currentTarget.selectedOptions[0].attributes[0].value;
    return  fetch(`https://amgleason2.carto.com/api/v2/sql?format=geoJSON&q=SELECT the_geom, name FROM xctr_dissolve where name like '${input}'`)
    .then((resp) => resp.json())
    .then((response) => {
        geojsonLayer = L.geoJson(response)
        map.fitBounds(geojsonLayer.getBounds());
    })
});

// when select option from downdown menu, change bounding box of map to geometry of the selected feature
document.getElementById('selectPoiDrop').addEventListener("change", function (e) {
    input = e.currentTarget.selectedOptions[0].attributes[0].value;
    return  fetch(`https://amgleason2.carto.com/api/v2/sql?format=geoJSON&q=SELECT the_geom, name FROM pointsofinterest where name like '${input}'`)
    .then((resp) => resp.json())
    .then((response) => {
        geojsonLayer = L.geoJson(response)
        map.fitBounds(geojsonLayer.getBounds());
    })
});

// when select option from downdown menu, change filter
document.getElementById('lengthDrop').addEventListener("change", function (e) {
    input = e.currentTarget.selectedOptions[0].attributes[0].value;
    var filterType = "hikingtr_dissolve";
    var layerSource = hikingSource;
    var layerBufferSource = hikingBufferSource;
    lengthFunction(input, filterType, layerSource, layerBufferSource);
    // $('.collapse').collapse('hide');
});

// when select option from downdown menu, change filter
document.getElementById('difficultyDrop').addEventListener("change", function (e) {
    input = e.currentTarget.selectedOptions[0].attributes[0].value;
    var filterType = "hikingtr_dissolve";
    var layerSource = hikingSource;
    var layerBufferSource = hikingBufferSource;
    difficultyFunction(input, filterType, layerSource, layerBufferSource);
    // $('.collapse').collapse('hide');
});

// when select option from downdown menu, change filter
document.getElementById('bikeLengthDrop').addEventListener("change", function (e) {
    input = e.currentTarget.selectedOptions[0].attributes[0].value;
    var filterType = "mtntr_dissolve";
    var layerSource = bikeSource;
    var layerBufferSource = bikeBufferSource;
    lengthFunction(input, filterType, layerSource, layerBufferSource);
    // $('.collapse').collapse('hide');
});

// when select option from downdown menu, change filter
document.getElementById('bikeDifficultyDrop').addEventListener("change", function (e) {
    input = e.currentTarget.selectedOptions[0].attributes[0].value;
    var filterType = "mtntr_dissolve";
    var layerSource = bikeSource;
    var layerBufferSource = bikeBufferSource;
    difficultyFunction(input, filterType, layerSource, layerBufferSource);
    // $('.collapse').collapse('hide');
});

// when select option from downdown menu, change filter
document.getElementById('skiLengthDrop').addEventListener("change", function (e) {
    input = e.currentTarget.selectedOptions[0].attributes[0].value;
    var filterType = "xctr_dissolve";
    var layerSource = xcSource;
    var layerBufferSource = xcBufferSource;
    lengthFunction(input, filterType, layerSource, layerBufferSource);
    // $('.collapse').collapse('hide');
});

// when select option from downdown menu, change filter
document.getElementById('skiDifficultyDrop').addEventListener("change", function (e) {
    input = e.currentTarget.selectedOptions[0].attributes[0].value;
    var filterType = "xctr_dissolve";
    var layerSource = xcSource;
    var layerBufferSource = xcBufferSource;
    difficultyFunction(input, filterType, layerSource, layerBufferSource);
    // $('.collapse').collapse('hide');
});

function difficultyFunction(input, filterType, layerSource, layerBufferSource){
    if (lengthQuery == 'All'){
        if (input == 'All'){
            layerSource.setQuery(`SELECT * FROM ${filterType}`);
            layerBufferSource.setQuery(`SELECT * FROM ${filterType}`);
        }else{
            layerSource.setQuery(`SELECT * FROM ${filterType} where difficulty like '${input}'`);
            layerBufferSource.setQuery(`SELECT * FROM ${filterType} where difficulty like '${input}'`);
        }
    }else if (lengthQuery == 'Short (under 2 miles)'){
        if (input == 'All'){
            layerSource.setQuery(`SELECT * FROM ${filterType} WHERE length < 2`);
            layerBufferSource.setQuery(`SELECT * FROM ${filterType} WHERE length < 2`);
        }else{
            layerSource.setQuery(`SELECT * FROM ${filterType} where difficulty like '${input}' and length < 2`);
            layerBufferSource.setQuery(`SELECT * FROM ${filterType} where difficulty like '${input}' and length < 2`);
        }
    }else if (lengthQuery == 'Medium (2-5 miles)'){
        if (input == 'All'){
            layerSource.setQuery(`SELECT * FROM ${filterType} WHERE length > 2 && length < 5`);
            layerBufferSource.setQuery(`SELECT * FROM ${filterType} WHERE length > 2 && length < 5`);
        }else{
            layerSource.setQuery(`SELECT * FROM ${filterType} where difficulty like '${input}' and (length > 2 and length < 5)`);
            layerBufferSource.setQuery(`SELECT * FROM ${filterType} where difficulty like '${input}' and (length > 2 and length < 5)`);
        }
    }else if (lengthQuery == 'Long (over 5 miles)'){
        if (input == 'All'){
            layerSource.setQuery(`SELECT * FROM ${filterType} WHERE length > 5`);
            layerBufferSource.setQuery(`SELECT * FROM ${filterType} WHERE length > 5`);
        }else{
            layerSource.setQuery(`SELECT * FROM ${filterType} where difficulty like '${input}' and length > 5`);
            layerBufferSource.setQuery(`SELECT * FROM ${filterType} where difficulty like '${input}' and length > 5`);
        }
    }
    difficultyQuery = input;
}

function lengthFunction(input, filterType, layerSource, layerBufferSource){
    if (difficultyQuery == 'All'){
        if (input == 'All'){
            layerSource.setQuery(`SELECT * FROM ${filterType}`);
            layerBufferSource.setQuery(`SELECT * FROM ${filterType}`);
        }else if (input == 'Short (under 2 miles)'){
            layerSource.setQuery(`SELECT * FROM ${filterType} where length < 2`);
            layerBufferSource.setQuery(`SELECT * FROM ${filterType} where length < 2`);
        }else if (input == 'Medium (2-5 miles)'){
            layerSource.setQuery(`SELECT * FROM ${filterType} where length > 2 and length < 5`);
            layerBufferSource.setQuery(`SELECT * FROM ${filterType} where length > 2 and length < 5`);
        }else if (input == 'Long (over 5 miles)'){
            layerSource.setQuery(`SELECT * FROM ${filterType} where length > 5`);
            layerBufferSource.setQuery(`SELECT * FROM ${filterType} where length > 5`);
        }
    }else if (difficultyQuery == 'Easy'){
        if (input == 'All'){
            layerSource.setQuery(`SELECT * FROM ${filterType}`);
            layerBufferSource.setQuery(`SELECT * FROM ${filterType}`);
        }else if (input == 'Short (under 2 miles)'){
            layerSource.setQuery(`SELECT * FROM ${filterType} where length < 2 and difficulty = 'Easy'`);
            layerBufferSource.setQuery(`SELECT * FROM ${filterType} where length < 2 and difficulty = 'Easy'`);
        }else if (input == 'Medium (2-5 miles)'){
            layerSource.setQuery(`SELECT * FROM ${filterType} where length > 2 and length < 5 and difficulty = 'Easy'`);
            layerBufferSource.setQuery(`SELECT * FROM ${filterType} where length > 2 and length < 5 and difficulty = 'Easy'`);
        }else if (input == 'Long (over 5 miles)'){
            layerSource.setQuery(`SELECT * FROM ${filterType} where length > 5 and difficulty = 'Easy'`);
            layerBufferSource.setQuery(`SELECT * FROM ${filterType} where length > 5 and difficulty = 'Easy'`);
        }
    }else if (difficultyQuery == 'Moderate'){
        if (input == 'All'){
            layerSource.setQuery(`SELECT * FROM ${filterType}`);
            layerBufferSource.setQuery(`SELECT * FROM ${filterType}`);
        }else if (input == 'Short (under 2 miles)'){
            layerSource.setQuery(`SELECT * FROM ${filterType} where length < 2 and difficulty = 'Moderate'`);
            layerBufferSource.setQuery(`SELECT * FROM ${filterType} where length < 2 and difficulty = 'Moderate'`);
        }else if (input == 'Medium (2-5 miles)'){
            layerSource.setQuery(`SELECT * FROM ${filterType} where length > 2 and length < 5 and difficulty = 'Moderate'`);
            layerBufferSource.setQuery(`SELECT * FROM ${filterType} where length > 2 and length < 5 and difficulty = 'Moderate'`);
        }else if (input == 'Long (over 5 miles)'){
            layerSource.setQuery(`SELECT * FROM ${filterType} where length > 5 and difficulty = 'Moderate'`);
            layerBufferSource.setQuery(`SELECT * FROM ${filterType} where length > 5 and difficulty = 'Moderate'`);
        }
    }else if (difficultyQuery == 'Difficult'){
        if (input == 'All'){
            layerSource.setQuery(`SELECT * FROM ${filterType}`);
            layerBufferSource.setQuery(`SELECT * FROM ${filterType}`);
        }else if (input == 'Short (under 2 miles)'){
            layerSource.setQuery(`SELECT * FROM ${filterType} where length < 2 and difficulty = 'Difficult'`);
            layerBufferSource.setQuery(`SELECT * FROM ${filterType} where length < 2 and difficulty = 'Difficult'`);
        }else if (input == 'Medium (2-5 miles)'){
            layerSource.setQuery(`SELECT * FROM ${filterType} where length > 2 and length < 5 and difficulty = 'Difficult'`);
            layerBufferSource.setQuery(`SELECT * FROM ${filterType} where length > 2 and length < 5 and difficulty = 'Difficult'`);
        }else if (input == 'Long (over 5 miles)'){
            layerSource.setQuery(`SELECT * FROM ${filterType} where length > 5 and difficulty = 'Difficult'`);
            layerBufferSource.setQuery(`SELECT * FROM ${filterType} where length > 5 and difficulty = 'Difficult'`);
        }
    }
    lengthQuery = input;
}

client.addLayer(boundaryLayer);
client.addLayer(hikingBufferLayer);
client.addLayer(xcBufferLayer);
client.addLayer(bikeBufferLayer);
client.addLayer(hikingLayer);
client.addLayer(xcLayer);
client.addLayer(bikeLayer);
client.addLayer(historicLayer);
client.addLayer(reviewLayer);
client.addLayer(historicBufferLayer);
client.addLayer(reviewBufferLayer);
client.addLayer(poiLayer);
client.addLayer(poiBufferLayer);
client.getLeafletLayer().addTo(map);

$('#hiking-clear').click( function() {
    hikingSource.setQuery(`SELECT * FROM hikingtr_dissolve`);
    hikingBufferSource.setQuery(`SELECT * FROM hikingtr_dissolve`);
    lengthQuery = 'All';
    difficultQuery = 'All';
    $("#filterbox > select").each(function() { 
        this.selectedIndex = 0
    });
});
$('#biking-clear').click( function() {
    bikeSource.setQuery(`SELECT * FROM mtntr_dissolve`);
    bikeBufferSource.setQuery(`SELECT * FROM mtntr_dissolve`);
    lengthQuery = 'All';
    difficultQuery = 'All';
    $("#bikefilterbox > select").each(function() { 
        this.selectedIndex = 0
    });
});
$('#skiing-clear').click( function() {
    xcSource.setQuery(`SELECT * FROM xctr_dissolve`);
    xcBufferSource.setQuery(`SELECT * FROM xctr_dissolve`);
    lengthQuery = 'All';
    difficultQuery = 'All';
    $("#skifilterbox > select").each(function() { 
        this.selectedIndex = 0
    });
});

$('.hiking_check').change(function(){
    changeLayer("hikingLayer");
});
$('.mtn_check').change(function(){
    changeLayer("bikeLayer");
});
$('.ski_check').change(function(){
    changeLayer("xcLayer");
});
$('.historic_check').change(function(){
    changeLayer("historicLayer");
});
$('.review_check').change(function(){
    changeLayer("reviewLayer");
});
$('.poi_check').change(function(){
    changeLayer("poiLayer");
});

function changeLayer(layerToChange){

if (layerToChange == "hikingLayer"){
    if ($('#hiking_check').prop('checked')){
        if (!hikingLayer.isVisible()){
            hikingLayer.show();
            hikingBufferLayer.show();
        }
    }else{
        if (hikingLayer.isVisible()){
            hikingLayer.hide();
            hikingBufferLayer.hide();
        }
    }
}
else if (layerToChange == "bikeLayer"){
    if ($('#mtn_check').prop('checked')){
        if (!bikeLayer.isVisible()){
            bikeLayer.show();
            bikeBufferLayer.show();
        }
    }else{
        if (bikeLayer.isVisible()){
            bikeLayer.hide();
            bikeBufferLayer.hide();
        }
    }
}
else if (layerToChange == "xcLayer"){
    if ($('#ski_check').prop('checked')){
        if (!xcLayer.isVisible()){
            xcLayer.show();
            xcBufferLayer.show();
        }
    }else{
        if (xcLayer.isVisible()){
            xcLayer.hide();
            xcBufferLayer.hide();
        }
    }
 }
 else if (layerToChange == "historicLayer"){
    if ($('#historic_check').prop('checked')){
        if (!historicLayer.isVisible()){
            historicLayer.show();
            historicBufferLayer.show();
        }
    }else{
        if (historicLayer.isVisible()){
            historicLayer.hide();
            historicBufferLayer.hide();
        }
    }
 }
 else if (layerToChange == "reviewLayer"){
    if ($('#review_check').prop('checked')){
        if (!reviewLayer.isVisible()){
            reviewLayer.show();
            reviewBufferLayer.show();
        }
    }else{
        if (reviewLayer.isVisible()){
            reviewLayer.hide();
            reviewBufferLayer.hide();
        }
    }
 }

 else if (layerToChange == "poiLayer"){
    if ($('#poi_check').prop('checked')){
        if (!poiLayer.isVisible()){
            poiLayer.show();
            poiBufferLayer.show();
        }
    }else{
        if (poiLayer.isVisible()){
            poiLayer.hide();
            poiBufferLayer.hide();
        }
    }
 }

}
