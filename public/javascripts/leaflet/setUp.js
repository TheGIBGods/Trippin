/**
 * Created by Synne on 02.03.2017.
 */
var mymap;
var london = [51.505, -0.09];
var oslo = [59.911491, 10.757933];

function initMap() {
    mymap = L.map('mapid').setView([oslo[0], oslo[1]], 13);

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
            var marker = L.marker([
                place.geometry.location.lat().toString(),
                place.geometry.location.lng().toString()
            ]);
            marker.bindPopup("Name: " + place.name + "<br>"
                + "Adresse: " + place.formatted_address);

            group.addLayer(marker);
        });

        group.addTo(mymap);
        mymap.fitBounds(group.getBounds());
        if (mymap.getZoom() > 15) {
            mymap.setZoom(15);
        }
        console.log(mymap.getZoom());

    });
};