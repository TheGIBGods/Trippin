/**
 * Created by Guro on 28.02.2017.
 */

var points;

console.log("In point.js")
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
                points = data.responseJSON.message;

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
        x.setAttribute("class", "pointClick canBeClicked")
        //console.log("Klasser: "+x.getAttribute("class"));
        //x.setAttribute("xkoord", ""+ points[i].x_koord);
        //x.setAttribute("ykoord", ""+ points[i].x_koord);

        //console.log(points[i].name);
        //console.log(points[i].category);
        switch(points[i].category){
            case "hotel":
                $("#hotels_list").append(x);
                break
            case "restaurant":
                $("#restaurants_list").append(x);
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
}