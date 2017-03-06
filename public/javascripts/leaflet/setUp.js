/**
 * Created by Synne on 02.03.2017.
 */
var mymap;
var london = [51.505, -0.09];
var oslo = [59.911491, 10.757933];
var miami = [25.761681, -80.191788];
var lat = 0;
var lng = 0;

function initMap() {
    mymap = new L.map('mapid').setView([miami[0], miami[1]], 13);

    /*var Esri_WorldStreetMap = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
     attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
     });*/

    L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 18,
        minZoom: 2,
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',


    }).addTo(mymap);

    /*L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
     maxZoom: 18,
     minZoom: 2,
     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
     '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
     'Imagery © <a href="http://mapbox.com">Mapbox</a>',
     id: 'mapbox.streets'
     }).addTo(mymap);*/

// var marker = L.marker([59.9, 10.7]).addTo(mymap);

    /*var circle = L.circle([51.508, -0.11], {
     color: 'red',
     fillColor: '#f03',
     fillOpacity: 0.5,
     radius: 500
     }).addTo(mymap);*/

    /*var polygon = L.polygon([
     [51.509, -0.08],
     [51.503, -0.06],
     [51.51, -0.047]
     ]).addTo(mymap);*/

// marker.bindPopup("<b>Hello world!</b><br>I am a popup.");
//circle.bindPopup("I am a circle.").openPopup();
//polygon.bindPopup("I am a polygon.");

    /* var popup = L.popup()
     .setLatLng([51.5, -0.09])
     .setContent("I am a standalone popup.")
     .openOn(mymap);*/

//var marker2 = L.marker([59.9, 10.7]).addTo(mymap);
//var popup = L.popup();

    /* function onMapClick(e) {
     //marker2 = L.marker([e.latlng.lat, e.latlng.lng]).addTo(mymap);

     marker2.setLatLng(e.latlng).update();

     popup
     .setLatLng(e.latlng)
     .setContent(e.latlng.lat + ", " + e.latlng.lng)
     .openOn(mymap);
     } */


// mymap.on('click', onMapClick);

    var GoogleSearch = L.Control.extend({
        onAdd: function () {
            var element = document.createElement("input");

            element.id = "searchBox";

            return element;
        }
    });

    (new GoogleSearch).addTo(mymap);

    var input = document.getElementById("searchBox");

    var searchBox = new google.maps.places.SearchBox(input);

    var group = L.featureGroup();

    searchBox.addListener('places_changed', function () {
        group.clearLayers();
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }


        places.forEach(function (place) {

            // Create a marker for each place.
                marker = L.marker([
                place.geometry.location.lat().toString(),
                place.geometry.location.lng().toString()
                ]);
                setlat(marker.getLatLng().lat);
                console.log(getlat());
                setlng(marker.getLatLng().lng);
                console.log(getlng());

            marker.bindPopup("Name: " + place.name + "<br>"
                + "Adresse: " + place.formatted_address);

            group.addLayer(marker);
        });

        group.addTo(mymap);
        mymap.fitBounds(group.getBounds());
        if (mymap.getZoom() > 15) {
            mymap.setZoom(15);
        }
    });

    getPointsFromDB(); //We now know that the map has been initialied, so we can add points to it, calling the method below

};

//A getMap-function in case we need it
var getMap = function () {
    console.log('In getMap() function');
    return map;
};

//Going through all points, adding markers to the map.
var getPointsFromDB = function () {

    $.ajax({
        url: '../point', //collects the users call from app
        type: "get",
        complete: function(data){

            setPointsOnMap(data.responseJSON.message);
        }
    });

}

var setPointsOnMap = function (points) {

    for(p in points) {

        var x = points[p].x_koord;
        var y = points[p].y_koord;

        //Making markers
        var Icon = L.icon({
            iconUrl: '/images/' + points[p].category + '.png',
            iconSize: [38, 40], // size of the icon
            popupAnchor: [0, -10] // point from which the popup should open relative to the iconAnchor
        });

        var marker = L.marker([x, y], {icon: Icon});
        marker.addTo(mymap); //adding marker to map
        //adding popup to marker
        marker.bindPopup(
            "<b>" + "Navn: " + "</b>" + points[p].name + "<br>" +
            "<b>" + "Kommentar: " + "</b>" + points[p].comment);
    }
};

function getlat(){
    console.log(lat);
    return this.lat;
}

function setlat(lat){
    this.lat = lat;
}

function getlng(){
    console.log(lng);
    return this.lng;
}

function setlng(lng){
    this.lng = lng;
}