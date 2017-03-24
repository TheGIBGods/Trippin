/**
 * Created by Guro on 28.02.2017.
 */

var points;

//console.log("In point.js")
$(document).ready(function(){
    window.onload = function(){
        $.ajax({
            url: '../point', //collects the users call from app
            type: "get",
            complete: function(data){
                //when all the objects are retrieved, do this
                //log to cmd
                //console.log(data.responseJSON.message);
                //call the createUserList function
                createPointList(data.responseJSON.message);
                //points = data.responseJSON.message;
            }
        })
    };
});


//function called before
function createPointList(points){
    //console.log("punkter i create point list: " + points);
    var tripID = getTripFromURL();
    setMapView(points[0].x_koord, points[0].y_koord);
    for (i =0; i< points.length; i++){
        if(points[i].trip_ID == tripID) {
            var x = document.createElement("li");
            x.innerHTML = points[i].name;
            x.setAttribute("class", "pointClick canBeClicked");
            x.setAttribute("id", points[i]._id);
            x.setAttribute("xkoord", "" + points[i].x_koord);
            x.setAttribute("ykoord", "" + points[i].y_koord);
            x.addEventListener('click', function () {
                handleListElementClick(event.target.getAttribute("xkoord"), event.target.getAttribute("ykoord"));
            });
            //console.log("Klasser: "+x.getAttribute("class"));


            //console.log(points[i].name);
            //console.log(points[i].category);
            switch (points[i].category) {
                case "hotel":
                    $("#hotels_list").append(x);
                    break
                case "restaurant":
                    $("#restaurants_list").append(x);
                    break
                case "activity":
                    $("#activity_list").append(x);
                    break
                case "transportation":
                    $("#transportation_list").append(x);
                    break
                case "attraction":
                    $("#attractions_list").append(x);
                    break
                case "shopping":
                    $("#shopping_list").append(x);
                    break
                case "other":
                    $("#other_list").append(x);
                    break
            }
        }

    }

    //document.getElementById("attraction1").innerHTML = points[0].name;
    //innerHTML sets the content of the element
    //hvordan hente username for alle brukere?
};

var getPoints = function () {
    console.log('In getPoints() function' + points);
    return points;
};

function addSinglePointToMap(name, category, comment, date, address, x_koord, y_koord) {

    var Icon = L.icon({
        iconUrl: '/images/' + category + '.png',
        iconSize: [38, 40], // size of the icon
        popupAnchor: [0, -10] // point from which the popup should open relative to the iconAnchor
    });

    var marker = L.marker([x_koord, y_koord], {icon: Icon});
    marker.addTo(mymap); //adding marker to map
    //adding popup to marker
    marker.bindPopup(
        "<b>" + "Navn: " + "</b>" + name + "<br>" +
        "<b>" + "Dato: " + "</b>" + date + "<br>" +
        "<b>" + "Adresse: " + "</b>" + address + "<br>" +
        "<b>" + "Kommentar: " + "</b>" + comment +
        "<input  type='hidden' id='pointID' value = null >"
       );

    currentMarker.closePopup();
    marker.openPopup();
    markersOnMap.push(marker);

    var x = document.createElement("li");
    x.innerHTML = name;
    x.setAttribute("class", "pointClick canBeClicked");
 //   x.setAttribute("id", points[i]._id);
    x.setAttribute("xkoord", "" + x_koord);
    x.setAttribute("ykoord", "" + y_koord);
    x.addEventListener('click', function () {
        handleListElementClick(event.target.getAttribute("xkoord"), event.target.getAttribute("ykoord"));
    });

    switch (category) {
        case "hotel":
            $("#hotels_list").append(x);
            break
        case "restaurant":
            $("#restaurants_list").append(x);
            break
        case "activity":
            $("#activity_list").append(x);
            break
        case "transportation":
            $("#transportation_list").append(x);
            break
        case "attraction":
            $("#attractions_list").append(x);
            break
        case "shopping":
            $("#shopping_list").append(x);
            break
        case "other":
            $("#other_list").append(x);
            break
    }
}



$("#datepicker").pikaday({
        defaultDate: new Date(),
        firstDay: 1,
        format: "DD/MM/YYYY"
});