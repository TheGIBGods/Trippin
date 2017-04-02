/**
 * Created by Guro on 28.02.2017.
 */

var points;

//console.log("In point.js")
$(document).ready(function(){
    window.onload = function(){
        $.ajax({
            url: '/points/trip/' + getTripFromURL(), //collects the users call from app
            type: "get",
            complete: function(data){
                console.log("retrived all points");
                //call the createUserList function
                createPointList(data.responseJSON);
                //points = data.responseJSON.message;
            }
        })
    };
});


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

    //document.getElementById("attraction1").innerHTML = points[0].name;
    //innerHTML sets the content of the element
    //hvordan hente username for alle brukere?
};

var getPoints = function () {
    console.log('In getPoints() function' + points);
    return points;
};


$("#datepicker").pikaday({
        defaultDate: new Date(),
        firstDay: 1,
        format: "DD/MM/YYYY"
});

$("#datepickerEdit").pikaday({
    defaultDate: new Date(),
    firstDay: 1,
    format: "DD/MM/YYYY"
});

function  websiteHTML(website) {

    if(website == undefined){
        return "<span id = 'pointWebsite'> Ingen funnet </span>"
    }
    else{
        console.log("Komt Hit");
       return "<a href = " + website + " id='pointWebsite' target='_blank'>" + website + "</a>"
    }

}

function markerWebsite(website) {
    if(website == undefined) {
        return ""
    }
    else {
        return "<b class = popup-list-left>" + "Nettside: " + "</b>" + "<a id = 'popWebsite' href =" + website + " target='_blank'>" + website+ "</a><br><br>"
    }

}
