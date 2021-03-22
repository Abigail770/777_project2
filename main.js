$('.btn.btn-primary').click( function(e) {
    $('.collapse').collapse('hide');
    $("select").each(function() { this.selectedIndex = 0 });
});

const client = new carto.Client({
    apiKey: '5u-RGrhxG21jti2xJQUAfA',
    username: 'amgleason2'
  });

var lengthQuery = 'All';
var difficultyQuery = 'All';

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

// hikingLayer.on('featureClicked', featureEvent => {
//     var content = `<h6>Hiking Trail</h6>
//     <strong>Name: </strong>${featureEvent.data.name}<br>
//     <strong>Length: </strong>${featureEvent.data.length}<br>
//     <strong>Difficulty: </strong>${featureEvent.data.difficulty}`;

//     var popup = L.popup()
//         .setLatLng(featureEvent.latLng)
//         .setContent(content)
//         .openOn(map);
// });

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

// xcLayer.on('featureClicked', featureEvent => {
//     var content = `<h6>Ski Trail</h6>
//     ${featureEvent.data.name}`;

//     var popup = L.popup()
//         .setLatLng(featureEvent.latLng)
//         .setContent(content)
//         .openOn(map);
// });

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

// bikeLayer.on('featureClicked', featureEvent => {
//     var content = `<h6>Bike Trail</h6>
//     ${featureEvent.data.name}`;

//     var popup = L.popup()
//         .setLatLng(featureEvent.latLng)
//         .setContent(content)
//         .openOn(map);
// });

const hikingBufferSource = new carto.source.SQL('SELECT * from hikingtr_dissolve');
const hikingBufferStyle = new carto.style.CartoCSS(`
#layer {
    line-width: 10;
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
    line-width: 10;
    line-opacity: 0;
}
`);
const xcBufferLayer = new carto.layer.Layer(xcBufferSource, xcBufferStyle, {
    featureClickColumns: ['name']
});

xcBufferLayer.on('featureClicked', featureEvent => {
    var content = `<h6>Ski Trail</h6>
    ${featureEvent.data.name}`;

    var popup = L.popup()
        .setLatLng(featureEvent.latLng)
        .setContent(content)
        .openOn(map);
});

const bikeBufferSource = new carto.source.SQL('SELECT * from mtntr_dissolve');
const bikeBufferStyle = new carto.style.CartoCSS(`
#layer {
    line-width: 10;
    line-opacity: 0;
}
`);
const bikeBufferLayer = new carto.layer.Layer(bikeBufferSource, bikeBufferStyle, {
    featureClickColumns: ['name']
});

bikeBufferLayer.on('featureClicked', featureEvent => {
    var content = `<h6>Bike Trail</h6>
    ${featureEvent.data.name}`;

    var popup = L.popup()
        .setLatLng(featureEvent.latLng)
        .setContent(content)
        .openOn(map);
});

const historicSource = new carto.source.SQL('SELECT * from historicplaces_devilslake');
const historicStyle = new carto.style.CartoCSS(`
#layer {
    marker-width: 11;
    marker-fill: #00FF00;
    marker-line-color: black; 
}
`);
const historicLayer = new carto.layer.Layer(historicSource, historicStyle, {
    featureClickColumns: ['name', "description", "the_geom"]
});


// historicLayer.on('featureClicked', featureEvent => {
//     if (featureEvent.data.description){
//         var content = `
//         <h6>${featureEvent.data.name}</h6>
//         ${featureEvent.data.description}`;
//     }else{
//         var content = `<h6>${featureEvent.data.name}</h6>`;
//     }

//     var popup = L.popup()
//         .setLatLng(featureEvent.latLng)
//         .setContent(content)
//         .openOn(map);
// });

const reviewSource = new carto.source.SQL('SELECT * from reviews');
const reviewStyle = new carto.style.CartoCSS(`
#layer {
    marker-width: 11;
    marker-fill: #9932CC;
    marker-line-color: black; 
}
`);
const reviewLayer = new carto.layer.Layer(reviewSource, reviewStyle, {
    featureClickColumns: ['date', "comments", "rating", "issue"]
});


// reviewLayer.on('featureClicked', featureEvent => {
//     const content = `
//       <strong> Date: </strong> ${featureEvent.data.date}<br>
//       <strong>Comments: </strong>${featureEvent.data.comments}<br>
//       <strong>Rating: </strong>${featureEvent.data.rating}<br>
//       <strong>Issues: </strong>${featureEvent.data.issue}<br>
//     `;

//     var popup = L.popup()
//         .setLatLng(featureEvent.latLng)
//         .setContent(content)
//         .openOn(map);

//     // document.getElementById('info').innerHTML = content;
// });

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

var lat;
var lon;

$('#loc').click(getLocation);
$('#map-finder').click(findOnMap);

function findOnMap(){
    map.on('click', function(e) {
        alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
        lat=e.latlng.lat;
        lon=e.latlng.lng;
    });
    map.off('click', function(e) {
        alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
        lat=e.latlng.lat;
        lon=e.latlng.lng;
    })
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

    console.log(date)
    console.log(comments)
    console.log(rating)
    console.log(issue)
    console.log(lat)
    console.log(lon)
    if(lat == null && lon == null){
        lat_lon = $('#location').val()
        console.log(lat_lon)
        if (lat_lon !== null && typeof lat_lon !== undefined && lat_lon !== ""){
            lat = lat_lon.split(",")[1].trim();
            lon = lat_lon.split(",")[0].trim()
        }
    }

   if(!isNaN(rating) && rating !==null && typeof rating !== undefined && rating !== ""){
       if (lat != null && lon !== null && !isNaN(lat) && !isNaN(lon) && typeof lat !== undefined && typeof lon !== undefined && lat !== "" && lon != ""){
            if (comments !== null && typeof comments !== undefined && comments !== ""){
                if (date !== null && typeof date !== undefined && date !== ""){
                        $.getJSON(`https://amgleason2.carto.com/api/v2/sql?q=INSERT INTO reviews (the_geom, date, comments, lat, lon, rating, issue) VALUES (ST_SetSRID(ST_Point('` + lat + `', '` + lon + `'),4326), '` + date + `', '` + comments + `', '` + lat + `', '` + lon + `', '` + rating + `', '` + issue + `')&api_key=5u-RGrhxG21jti2xJQUAfA`, function(data) {
                        $.each(data.rows, function(key, val) {
                            // do something!
                        });
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

function populateLengthDropdown(){
    var lengths = ['All', 'Short (under 2 miles)', 'Medium (2-5 miles)', 'Long (over 5 miles)'];
    let uniqueLengths = [...new Set(lengths)];
    uniqueLengths.forEach(function(length){
        option = document.createElement("option")
        option.setAttribute("value", length)
        option.textContent = length
        document.getElementById("lengthDrop").appendChild(option);
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

// when select option from downdown menu, change filter
document.getElementById('lengthDrop').addEventListener("change", function (e) {
    input = e.currentTarget.selectedOptions[0].attributes[0].value;
    if (difficultyQuery == 'All'){
        if (input == 'All'){
            hikingSource.setQuery(`SELECT * FROM hikingtr_dissolve`);
            hikingBufferSource.setQuery(`SELECT * FROM hikingtr_dissolve`);
        }else if (input == 'Short (under 2 miles)'){
            hikingSource.setQuery(`SELECT * FROM hikingtr_dissolve where length < 2`);
            hikingBufferSource.setQuery(`SELECT * FROM hikingtr_dissolve where length < 2`);
        }else if (input == 'Medium (2-5 miles)'){
            hikingSource.setQuery(`SELECT * FROM hikingtr_dissolve where length > 2 and length < 5`);
            hikingBufferSource.setQuery(`SELECT * FROM hikingtr_dissolve where length > 2 and length < 5`);
        }else if (input == 'Long (over 5 miles)'){
            hikingSource.setQuery(`SELECT * FROM hikingtr_dissolve where length > 5`);
            hikingBufferSource.setQuery(`SELECT * FROM hikingtr_dissolve where length > 5`);
        }
    }else if (difficultyQuery == 'Easy'){
        if (input == 'All'){
            hikingSource.setQuery(`SELECT * FROM hikingtr_dissolve`);
            hikingBufferSource.setQuery(`SELECT * FROM hikingtr_dissolve`);
        }else if (input == 'Short (under 2 miles)'){
            hikingSource.setQuery(`SELECT * FROM hikingtr_dissolve where length < 2 and difficulty = 'Easy'`);
            hikingBufferSource.setQuery(`SELECT * FROM hikingtr_dissolve where length < 2 and difficulty = 'Easy'`);
        }else if (input == 'Medium (2-5 miles)'){
            hikingSource.setQuery(`SELECT * FROM hikingtr_dissolve where length > 2 and length < 5 and difficulty = 'Easy'`);
            hikingBufferSource.setQuery(`SELECT * FROM hikingtr_dissolve where length > 2 and length < 5 and difficulty = 'Easy'`);
        }else if (input == 'Long (over 5 miles)'){
            hikingSource.setQuery(`SELECT * FROM hikingtr_dissolve where length > 5 and difficulty = 'Easy'`);
            hikingBufferSource.setQuery(`SELECT * FROM hikingtr_dissolve where length > 5 and difficulty = 'Easy'`);
        }
    }else if (difficultyQuery == 'Moderate'){
        if (input == 'All'){
            hikingSource.setQuery(`SELECT * FROM hikingtr_dissolve`);
            hikingBufferSource.setQuery(`SELECT * FROM hikingtr_dissolve`);
        }else if (input == 'Short (under 2 miles)'){
            hikingSource.setQuery(`SELECT * FROM hikingtr_dissolve where length < 2 and difficulty = 'Moderate'`);
            hikingBufferSource.setQuery(`SELECT * FROM hikingtr_dissolve where length < 2 and difficulty = 'Moderate'`);
        }else if (input == 'Medium (2-5 miles)'){
            hikingSource.setQuery(`SELECT * FROM hikingtr_dissolve where length > 2 and length < 5 and difficulty = 'Moderate'`);
            hikingBufferSource.setQuery(`SELECT * FROM hikingtr_dissolve where length > 2 and length < 5 and difficulty = 'Moderate'`);
        }else if (input == 'Long (over 5 miles)'){
            hikingSource.setQuery(`SELECT * FROM hikingtr_dissolve where length > 5 and difficulty = 'Moderate'`);
            hikingBufferSource.setQuery(`SELECT * FROM hikingtr_dissolve where length > 5 and difficulty = 'Moderate'`);
        }
    }else if (difficultyQuery == 'Difficult'){
        if (input == 'All'){
            hikingSource.setQuery(`SELECT * FROM hikingtr_dissolve`);
            hikingBufferSource.setQuery(`SELECT * FROM hikingtr_dissolve`);
        }else if (input == 'Short (under 2 miles)'){
            hikingSource.setQuery(`SELECT * FROM hikingtr_dissolve where length < 2 and difficulty = 'Difficult'`);
            hikingBufferSource.setQuery(`SELECT * FROM hikingtr_dissolve where length < 2 and difficulty = 'Difficult'`);
        }else if (input == 'Medium (2-5 miles)'){
            hikingSource.setQuery(`SELECT * FROM hikingtr_dissolve where length > 2 and length < 5 and difficulty = 'Difficult'`);
            hikingBufferSource.setQuery(`SELECT * FROM hikingtr_dissolve where length > 2 and length < 5 and difficulty = 'Difficult'`);
        }else if (input == 'Long (over 5 miles)'){
            hikingSource.setQuery(`SELECT * FROM hikingtr_dissolve where length > 5 and difficulty = 'Difficult'`);
            hikingBufferSource.setQuery(`SELECT * FROM hikingtr_dissolve where length > 5 and difficulty = 'Difficult'`);
        }
    }
    lengthQuery = input;
});

// when select option from downdown menu, change filter
document.getElementById('difficultyDrop').addEventListener("change", function (e) {
    input = e.currentTarget.selectedOptions[0].attributes[0].value;
    if (lengthQuery == 'All'){
        if (input == 'All'){
            hikingSource.setQuery(`SELECT * FROM hikingtr_dissolve`);
            hikingBufferSource.setQuery(`SELECT * FROM hikingtr_dissolve`);
        }else{
            hikingSource.setQuery(`SELECT * FROM hikingtr_dissolve where difficulty like '${input}'`);
            hikingBufferSource.setQuery(`SELECT * FROM hikingtr_dissolve where difficulty like '${input}'`);
        }
    }else if (lengthQuery == 'Short (under 2 miles)'){
        if (input == 'All'){
            hikingSource.setQuery(`SELECT * FROM hikingtr_dissolve WHERE length < 2`);
            hikingBufferSource.setQuery(`SELECT * FROM hikingtr_dissolve WHERE length < 2`);
        }else{
            hikingSource.setQuery(`SELECT * FROM hikingtr_dissolve where difficulty like '${input}' and length < 2`);
            hikingBufferSource.setQuery(`SELECT * FROM hikingtr_dissolve where difficulty like '${input}' and length < 2`);
        }
    }else if (lengthQuery == 'Medium (2-5 miles)'){
        if (input == 'All'){
            hikingSource.setQuery(`SELECT * FROM hikingtr_dissolve WHERE length > 2 && length < 5`);
            hikingBufferSource.setQuery(`SELECT * FROM hikingtr_dissolve WHERE length > 2 && length < 5`);
        }else{
            hikingSource.setQuery(`SELECT * FROM hikingtr_dissolve where difficulty like '${input}' and (length > 2 and length < 5)`);
            hikingBufferSource.setQuery(`SELECT * FROM hikingtr_dissolve where difficulty like '${input}' and (length > 2 and length < 5)`);
        }
    }else if (lengthQuery == 'Long (over 5 miles)'){
        if (input == 'All'){
            hikingSource.setQuery(`SELECT * FROM hikingtr_dissolve WHERE length > 5`);
            hikingBufferSource.setQuery(`SELECT * FROM hikingtr_dissolve WHERE length > 5`);
        }else{
            hikingSource.setQuery(`SELECT * FROM hikingtr_dissolve where difficulty like '${input}' and length > 5`);
            hikingBufferSource.setQuery(`SELECT * FROM hikingtr_dissolve where difficulty like '${input}' and length > 5`);
        }
    }
    difficultyQuery = input;
});

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
client.getLeafletLayer().addTo(map);

$('#clear').click( function() {
    hikingSource.setQuery(`SELECT * FROM hikingtr_dissolve`);
    hikingBufferSource.setQuery(`SELECT * FROM hikingtr_dissolve`);
    lengthQuery = 'All';
    difficultQuery = 'All';
    $("#filterbox > select").each(function() { 
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

}
