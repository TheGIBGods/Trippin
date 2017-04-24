/**
 * Created by Guro on 28.02.2017.
 */

var points;
var categories = new Array(7);
for (var i = 0; i < 7; i++) {
    categories[i] = new Array();
}

console.log("In point.js")
$(document).ready(function(){
    //window.onload = function(){
        var url = getUrl();
        if(url.includes("mapPage")){
            getPoints("pointList");
        }/*else if(url.includes("timelinePage")){
            console.log("Getting points for timeline")
            getPoints("timeline");
        }*/

    //};
});

function getPoints(callMethod, tripObject) {
    $.ajax({
        url: '/points/trip/' + getTripFromURL(), //collects the users call from app
        type: "get",
        complete: function(data){
            console.log("retrived all points");
            if(callMethod == "pointList"){
                //call the createUserList function
                createPointList(data.responseJSON);
                //points = data.responseJSON.message;
            }else if(callMethod == "timeline"){
                console.log("creating timeline")
                createTimeline(data.responseJSON, tripObject)
            }

        }
    });
}


//function called before
function createPointList(points){
    //console.log("punkter i create point list: " + points);
    for (i =0; i< points.length; i++){
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
                categories[4].push(points[i]);
                break
            case "restaurant":
                $("#restaurants_list").append(x);
                categories[3].push(points[i]);
                break
            case "activity":
                $("#activity_list").append(x);
                categories[0].push(points[i]);
                break
            case "transportation":
                $("#transportation_list").append(x);
                categories[5].push(points[i]);
                break
            case "attraction":
                $("#attractions_list").append(x);
                categories[1].push(points[i]);
                break
            case "shopping":
                $("#shopping_list").append(x);
                categories[2].push(points[i]);
                break
            case "other":
                $("#other_list").append(x);
                categories[6].push(points[i]);
                break
        }

    }

    //document.getElementById("attraction1").innerHTML = points[0].name;
    //innerHTML sets the content of the element
    //hvordan hente username for alle brukere?
    console.log(categories);

};

/*
var getPoints = function () {
    console.log('In getPoints() function' + points);
    return points;
};
*/


function  websiteHTML(website) {

    if(website == undefined || website == "Ingen funnet"){
        return "<span id = 'pointWebsite'></span>"

    }
    else{
       return "<b > Nettside: </b>" +  "<a href = " + website + " id='pointWebsite' target='_blank'>" + website + "</a><br><br>"
    }

}

function markerWebsite(website) {
    if(website == undefined || website == "") {
        return ""
    }
    else {
            return "<b class = popup-list-left>" + "Nettside: " + "</b>" + "<a id = 'popWebsite' href =" + website + " target='_blank'>" + website+ "</a><br><br>"
    }

}
