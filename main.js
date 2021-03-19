$('.btn.btn-primary').click( function(e) {
    $('.collapse').collapse('hide');
});

const client = new carto.Client({
    apiKey: '5u-RGrhxG21jti2xJQUAfA',
    username: 'amgleason2'
  });

const hikingSource = new carto.source.Dataset('hikingtr_dissolve');
const hikingStyle = new carto.style.CartoCSS(`
#layer {
    line-width: 3;
    line-color: #000;
    line-dasharray: 4;
}
`);
const hikingLayer = new carto.layer.Layer(hikingSource, hikingStyle, {
    featureClickColumns: ['name']
});

hikingLayer.on('featureClicked', featureEvent => {
    var content = `<h6>Hiking Trail</h6>
    ${featureEvent.data.name}`;

    var popup = L.popup()
        .setLatLng(featureEvent.latLng)
        .setContent(content)
        .openOn(map);
});

const xcSource = new carto.source.Dataset('xctr_dissolve');
const xcStyle = new carto.style.CartoCSS(`
#layer {
    line-width: 3;
    line-color: #000080;
}
`);
const xcLayer = new carto.layer.Layer(xcSource, xcStyle, {
    featureClickColumns: ['name']
});

xcLayer.on('featureClicked', featureEvent => {
    var content = `<h6>Ski Trail</h6>
    ${featureEvent.data.name}`;

    var popup = L.popup()
        .setLatLng(featureEvent.latLng)
        .setContent(content)
        .openOn(map);
});

const bikeSource = new carto.source.Dataset('mtntr_dissolve');
const bikeStyle = new carto.style.CartoCSS(`
#layer {
    line-width: 3;
    line-color: #be6400;
}
`);
const bikeLayer = new carto.layer.Layer(bikeSource, bikeStyle, {
    featureClickColumns: ['name']
});

bikeLayer.on('featureClicked', featureEvent => {
    var content = `<h6>Bike Trail</h6>
    ${featureEvent.data.name}`;

    var popup = L.popup()
        .setLatLng(featureEvent.latLng)
        .setContent(content)
        .openOn(map);
});

const historicSource = new carto.source.Dataset('historicplaces_devilslake');
const historicStyle = new carto.style.CartoCSS(`
#layer {
    marker-width: 11;
    marker-fill: #1785FB;
    marker-line-color: #FFFFFF; 
}
`);
const historicLayer = new carto.layer.Layer(historicSource, historicStyle, {
    featureClickColumns: ['name', "description", "the_geom"]
});


historicLayer.on('featureClicked', featureEvent => {
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

const reviewSource = new carto.source.Dataset('reviews');
const reviewStyle = new carto.style.CartoCSS(`
#layer {
    marker-width: 11;
    marker-fill: #00FF00;
    marker-line-color: black; 
}
`);
const reviewLayer = new carto.layer.Layer(reviewSource, reviewStyle, {
    featureClickColumns: ['date', "comments"]
});


reviewLayer.on('featureClicked', featureEvent => {
    const content = `
      <h4>${featureEvent.data.date}</h4>
      ${featureEvent.data.comments}
    `;

    var popup = L.popup()
        .setLatLng(featureEvent.latLng)
        .setContent(content)
        .openOn(map);

    // document.getElementById('info').innerHTML = content;
});

var id = 0;
// lon=-89.69;
// lat=43.42;

var lat;
var lon;

$('#loc').click(getLocation);
// $('#map-finder').click(findOnMap);

// function findOnMap(){
//     map.on('click', function(e) {
//         alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
//         lat=e.latlng.lat;
//         lon=e.latlng.lng;
//     });
//     map.off('click', function(e) {
//         alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
//         lat=e.latlng.lat;
//         lon=e.latlng.lng;
//     })
//     return;
// }

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
    // var lon=-89.69;
    // var lat=43.42;
    var date = $('#date').val();
    var comments = $('#comments').val();
    var rating = $('#rating').val();
    var issue = $('#issues').val();

    if(lat == null && lon == null){
        lat_lon = $('#location').val()

        lat = lat_lon.split(",")[1].trim();
        lon = lat_lon.split(",")[0].trim()
    }
    
    id++;

   if(!isNaN(rating) && rating !=null){
       if (comments != null){
           if (date != null){
                $.getJSON(`https://amgleason2.carto.com/api/v2/sql?q=INSERT INTO reviews (the_geom, id, date, comments, lat, lon, rating, issue) VALUES (ST_SetSRID(ST_Point('` + lat + `', '` + lon + `'),4326), '` + id + `', '` + date + `', '` + comments + `', '` + lat + `', '` + lon + `', '` + rating + `', '` + issue + `')&api_key=5u-RGrhxG21jti2xJQUAfA`, function(data) {
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
    }
    else{
        alert("Please enter a number for rating. Please try again.");
    }
});

var map = L.map('map',{
    maxZoom: 18,
    zoomControl: false,
}).setView([43.42, -89.69], 14)

$('#map').css('top', $('#navbar').outerHeight());
$('#map').css('left', "50px");
$('#sidebar').css('top', $('#navbar').outerHeight());

// Add basemap and Leaflet controls to map
var basemap = L.esri.basemapLayer('Topographic').addTo(map);
L.control.locate().addTo(map);
var zoomHome = L.Control.zoomHome();
zoomHome.addTo(map);
populateHistoricalDropDown();
populateHikingDropDown();
populateMtnDropDown();
populateSkiDropDown();

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

// when select option from downdown menu, change bounding box of map to geometry of the selected country
document.getElementById('selectHistoricalDrop').addEventListener("change", function (e) {
    input = e.currentTarget.selectedOptions[0].attributes[0].value;
    return  fetch(`https://amgleason2.carto.com/api/v2/sql?format=geoJSON&q=SELECT the_geom, name FROM historicplaces_devilslake where name like '${input}'`)
    .then((resp) => resp.json())
    .then((response) => {
        geojsonLayer = L.geoJson(response)
        map.fitBounds(geojsonLayer.getBounds());
    })
});

// when select option from downdown menu, change bounding box of map to geometry of the selected country
document.getElementById('selectHikingDrop').addEventListener("change", function (e) {
    input = e.currentTarget.selectedOptions[0].attributes[0].value;
    return  fetch(`https://amgleason2.carto.com/api/v2/sql?format=geoJSON&q=SELECT the_geom, name FROM hikingtr_dissolve where name like '${input}'`)
    .then((resp) => resp.json())
    .then((response) => {
        geojsonLayer = L.geoJson(response)
        map.fitBounds(geojsonLayer.getBounds());
    })
});

// when select option from downdown menu, change bounding box of map to geometry of the selected country
document.getElementById('selectMtnDrop').addEventListener("change", function (e) {
    input = e.currentTarget.selectedOptions[0].attributes[0].value;
    return  fetch(`https://amgleason2.carto.com/api/v2/sql?format=geoJSON&q=SELECT the_geom, name FROM mtntr_dissolve where name like '${input}'`)
    .then((resp) => resp.json())
    .then((response) => {
        geojsonLayer = L.geoJson(response)
        map.fitBounds(geojsonLayer.getBounds());
    })
});

// when select option from downdown menu, change bounding box of map to geometry of the selected country
document.getElementById('selectSkiDrop').addEventListener("change", function (e) {
    input = e.currentTarget.selectedOptions[0].attributes[0].value;
    return  fetch(`https://amgleason2.carto.com/api/v2/sql?format=geoJSON&q=SELECT the_geom, name FROM xctr_dissolve where name like '${input}'`)
    .then((resp) => resp.json())
    .then((response) => {
        geojsonLayer = L.geoJson(response)
        map.fitBounds(geojsonLayer.getBounds());
    })
});

client.addLayer(hikingLayer);
client.addLayer(xcLayer);
client.addLayer(bikeLayer);
client.addLayer(historicLayer);
client.addLayer(reviewLayer);
client.getLeafletLayer().addTo(map);

// var overlayMaps = {
//     "Hiking Trails": hikingLayer,
//     "Mountain Bike Trails": bikeLayer,
//     "Ski Trails": xcLayer
// };

// L.control.layers(overlayMaps).addTo(map);

$('.hiking_check').change(function(){
    changeLayer("hikingLayer");
});
$('.mtn_check').change(function(){
    changeLayer("bikeLayer");
});
$('.ski_check').change(function(){
    changeLayer("xcLayer");
});

function changeLayer(layerToChange){
// var hiking_is_checked = true;
// var mtn_is_checked = true;
// var ski_is_checked = true;

if (layerToChange == "hikingLayer"){
    if ($('#hiking_check').prop('checked')){
        if (!hikingLayer.isVisible()){
            hikingLayer.show();
        }
    }else{
        if (hikingLayer.isVisible()){
            hikingLayer.hide();
        }
    }
}
else if (layerToChange == "bikeLayer"){
    if ($('#mtn_check').prop('checked')){
        if (!bikeLayer.isVisible()){
            bikeLayer.show();
        }
    }else{
        if (bikeLayer.isVisible()){
            bikeLayer.hide();
        }
    }
}
else if (layerToChange == "xcLayer"){
    if ($('#ski_check').prop('checked')){
        if (!xcLayer.isVisible()){
            xcLayer.show();
        }
    }else{
        if (xcLayer.isVisible()){
            xcLayer.hide();
        }
    }
}

}
