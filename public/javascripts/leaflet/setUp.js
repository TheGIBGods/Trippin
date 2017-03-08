/**
 * Created by Synne on 02.03.2017.
 */
var mymap;
var london = [51.505, -0.09];
var oslo = [59.911491, 10.757933];
var miami = [25.761681, -80.191788];
var lat = 0;
var lng = 0;

initLeaflet();
initGoogleSearch();
function initLeaflet(){
    console.log('init leaflet');
    mymap = new L.map('mapid').setView([miami[0], miami[1]], 13);

    L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 18,
        minZoom: 2,
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',


    }).addTo(mymap);
    console.log(mymap);

}

function initGoogleSearch() {

    var GoogleSearch = L.Control.extend({
        onAdd: function () {
            var element = document.createElement("input");
            element.id = "searchBox";
            return element;
        }
    });

    (new GoogleSearch).addTo(mymap);

    var input = document.getElementById("searchBox");
    input.placeholder = 'Hvor skal du?';
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

            marker.bindPopup("<b>Navn: </b>" + place.name + "<br>"
                + "<b>Adresse: </b>" + place.formatted_adress + "<br>"
             + '<button onclick ="openSaveWindow(); setlat(place.geometry.location.lat());setlng(place.geometry.location.lat());"  type = "button" class = "btn popup-btn"> Lagre punkt!</button>'
                );




            group.addLayer(marker);
        });

        group.addTo(mymap);
        mymap.fitBounds(group.getBounds());
        if (mymap.getZoom() > 15) {
            mymap.setZoom(15);
        }
    });

    $.ajax({
        url: '../point', //collects the users call from app
        type: "get",
        complete: function(data){

            setPointsOnMap(data.responseJSON.message);
        }
    });

    //getPointsFromDB(); //We now know that the map has been initialied, so we can add points to it, calling the method below

};

//A getMap-function in case we need it
/*var getMap = function () {
    console.log('In getMap() function');
    return map;
};*/

//Going through all points, adding markers to the map.
var getPointsFromDB = function () {



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
            "<b>" + "Kommentar: " + "</b>" + points[p].comment + "<br>" +
            "<b>" + "Koordinater: " + "</b>" + points[p].x_koord + ", " + points[p].y_koord);
    }
};


function getlat(){
    console.log(lat);
    return this.lat;
}

function openSaveWindow() {
    $('#modalPoint').modal('show');
}

function setlat(lat){

    this.lat = lat;
    console.log("Eg, datamaskina, har endra lat");
}

function getlng(){
    console.log(lng);
    return this.lng;
}

function setlng(lng){
    this.lng = lng;
}

var setMapView = function (x, y) {
    //console.log('setting map view with coordinates: ' + x + ", " + y);
    //console.log(mymap);
    mymap.setView([x,y], 15);
};