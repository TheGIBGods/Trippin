/**
 * Created by Guro on 28.02.2017.
 */

console.log("In point.js")
$(document).ready(function(){
    $("#attractions").click(function(){
        $.ajax({
            url: 'point', //collects the users call from app
            type: "get",
            complete: function(data){
                //when all the objects are retrieved, do this
                //log to cmd
                console.log(data.responseJSON.message);
                //call the createUserList function
                createPointList(data.responseJSON.message);
            }
        })
    });
});



//function called before
function createPointList(points){
    document.getElementById("attraction1").innerHTML = points[0].name;
    //innerHTML sets the content of the element
    //hvordan hente username for alle brukere?
};