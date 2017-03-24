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
    mymap = new L.map('mapid').setView([miami[0], miami[1]], 13);

    L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 18,
        minZoom: 2,
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',


    }).addTo(mymap);

    L.control.scale().addTo(mymap);



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
            marker.bindPopup("<b>Navn: </b>" + "<span  id='pointName'>" + place.name + "</span>" + "<br>"
                + "<b > Adresse: </b>" + "<span  id='pointAddress'>" + place.formatted_address + "</span>" + "<br>"
             + '<button onclick ="openSaveWindow();"  type = "button" class = "btn popup-btn"> Lagre punkt!</button>'
                );




            group.addLayer(marker);
        });

        group.addTo(mymap);
        group.on("click", function(event){
            var clickedMarker = event.layer;
            setLatLng(clickedMarker);
        });
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


var markersOnMap = new Array();
var setPointsOnMap = function (points) {

    var tripID = getTripFromURL();

    for(p in points) {
        if(points[p].trip_ID == tripID) {
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
                "<b>" + "Dato: " + "</b>" + points[p].date + "<br>" +
                "<b>" + "Addresse: " + "</b>" + points[p].address + "<br>" +
                "<b>" + "Kommentar: " + "</b>" + points[p].comment +
                 "<input  type='hidden' id='pointID' value =" + points[p]._id+" >"  +
                 "<button onclick ='deleteOpenPoint()'  type = 'button' class = 'btn popup-btn'> Slett punkt!</button>");


            markersOnMap.push(marker);
        }

    }
};

/*var openMarker;
mymap.on('popupopen', function(e) {
    console.log()
    var openMarker = e.popup._source;
    console.log()
});

*/

function setLatLng(marker) {
    setlat(marker.getLatLng().lat);
    setlng(marker.getLatLng().lng);
}



function getlat(){
    return this.lat;
}

function openSaveWindow(markerContent) {
    $('#modalPoint').modal('show');
    $('#namePoint').val(document.getElementById("pointName").innerHTML);
}

function setlat(lat){

    this.lat = lat;
}

function getlng(){
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

