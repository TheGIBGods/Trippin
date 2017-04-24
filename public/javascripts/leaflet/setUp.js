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
    mymap = new L.map('mapid').setView([miami[0], miami[1]], 3);

    //http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x} alternative map

    L.tileLayer('https://api.mapbox.com/styles/v1/gurogb/cj1up1foy004i2rnzoac5qmhk/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ3Vyb2diIiwiYSI6ImNpeWxjM20yZTAwM3gyd2pyMjNkcGhmbG0ifQ.py-0lvMqieNiRogr_wIn4A', {
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
    input.placeholder = 'Søk etter dine reisemål';
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
            marker.bindPopup(


                "<span class = 'popupHeader'><h5 class = 'popupName' id = pointName>" + place.name  + "</h5>"  +
                " <hr class = 'myline'> </span>" +
                "<b > Adresse: </b>" + "<span  id='pointAddress'>" + place.formatted_address + "</span>" + "<br><br>" +
                 websiteHTML(place.website) +
                '<button onclick ="openSaveWindow();"  type = "button" class = "btn saveButton"> Lagre punkt!</button>'
                );


            group.addLayer(marker);
            console.log((place.website));
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
        url: '/points/trip/' + getTripFromURL(), //collects the users call from app
        type: "get",
        complete: function(data){
            console.log("in setup leaflet");
            console.log(data);
            setPointsOnMap(data.responseJSON);
        }
    });

    //getPointsFromDB(); //We now know that the map has been initialied, so we can add points to it, calling the method below

}

//A getMap-function in case we need it
/*var getMap = function () {
    console.log('In getMap() function');
    return map;
};*/
var firstIteration = true;
var markersOnMap = new Array();
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

            "<span class = 'popupHeader'><h5 class = 'popupName' id = popName>" + points[p].name  + "</h5>"  +
            " <hr class = 'myline'> </span>" +
           getDateAndAddedByHTML(points[p].date, points[p].date2, points[p].created_by) +
            "<hr class = 'myline'><b class = popup-list-left>" + "Adresse: " + "</b><span id='popAddress'>" + points[p].address + "</span></span><br><br>   " +
            markerWebsite(points[p].website) +
            "<b class = popup-list-left>" + "Kommentar: " + "</b></span><span id='popComment' class = 'scrollbar'>" + points[p].comment + "</span><br><br>" +
            "<input  type='hidden' id='pointID' value =" + points[p]._id + ">"  +
            "<input type='hidden' id='pointCategory' value =" + points[p].category + ">" +
            "<button onclick='openEditWindow()' type = 'button' class = 'btn btn-default  editButton'>Endre</button>" +
            "<button onclick ='deleteOpenPoint()'  type = 'button' class = 'btn btn-default deleteButton'>Slett</button>"

        );

        markersOnMap.push(marker);
    }





    if (markersOnMap.length == 0){
        mymap.setView([38.82259, -2.8125], 0);
    }
    else if(firstIteration){
        var group = L.featureGroup((markersOnMap));
        mymap.fitBounds(group.getBounds());
        if (mymap.getZoom() > 15) {
            mymap.setZoom(15);
        }
        firstIteration = false;
    }

    else{
        setMapView(markersOnMap[markersOnMap.length - 1].getLatLng().lat, markersOnMap[markersOnMap.length - 1].getLatLng().lng);

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

function openSaveWindow() {
    $('#modalPoint').modal('show');
    $('#namePoint').val(document.getElementById('pointName').innerHTML);
    $('#websitePoint').val(document.getElementById('pointWebsite').innerHTML);
}

function openEditWindow() {
    $('#modalPointEdit').modal('show');
    $('#namePointEdit').val(document.getElementById('popName').innerHTML);
    $('#curtainEdit').val(document.getElementById('pointCategory').value);
    $('#datepickerEdit').val(document.getElementById('popDate').innerHTML);
    $('#commentPointEdit').val(document.getElementById('popComment').innerHTML);
    $('#addressPointEdit').val(document.getElementById('popAddress').innerHTML);
    try {
        $('#websitePointEdit').val(document.getElementById('popWebsite').innerHTML);
    }
    catch (err) {
        $('#websitePointEdit').val("");
    }
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

var currentMarker;
mymap.on('popupopen', function (e) {
    currentMarker = e.popup._source;
});


var setMapView = function (x, y) {
    //console.log('setting map view with coordinates: ' + x + ", " + y);
    //console.log(mymap);
    mymap.setView([x,y], 15);


};

function getDateAndAddedByHTML(fromdate, todate, addedBy){

    if(todate === undefined || todate === ""){
       return "<span class='dateBox'><b>" + "Dato: " + "</b><span id='popDate'>" + fromdate + "</span></span> " +
        "<span class = addedByBox><b>" + "Lagt til av: "+ "</b><span id = 'popCreatedBy'>" + addedBy + "</span></span>"

    }
    else if(todate != undefined){
      return  "<span class='dateBox2'><b>" + "Dato: " + "</b><span id='popDate'>" + fromdate + "</span>" +
        " - " + "<span id='popDate'>" + todate + "</span></span> " +
        "<span class = addedByBox2><b>" + "Lagt til av: "+ "</b><span id = 'popCreatedBy'>" + addedBy + "</span></span>"
    }

    else{
        return "HER HAR DET SKJEDD EN FEIL"
    }
}