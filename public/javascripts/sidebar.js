/**
 * Created by Synne on 23.02.2017.
 */

$(document).ready(function(){

    document.getElementById("activity").addEventListener("click", function(){
        enableToggle(event.target)
    });

    document.getElementById("attractions").addEventListener("click", function(){
        enableToggle(event.target)
    });

    document.getElementById("hotels").addEventListener("click", function(){
        enableToggle(event.target)
    });

    document.getElementById("restaurants").addEventListener("click", function(){
        enableToggle(event.target)
    });

    document.getElementById("shopping").addEventListener("click", function(){
        enableToggle(event.target)
    });

    document.getElementById("transportation").addEventListener("click", function(){
        enableToggle(event.target)
    });

    document.getElementById("other").addEventListener("click", function(){
        enableToggle(event.target)
    });
    //startToggling();

    /*
    //Category navigation in sidabar
    $("#activity").click(function(){
        $("#activity_list").slideToggle(200);
    });

    $("#attractions").click(function(){
        $("#attractions_list").slideToggle(200);
    });

    $("#hotels").click(function(){
        $("#hotels_list").slideToggle(200);
    });

    $("#restaurants").click(function(){
        $("#restaurants_list").slideToggle(200);
    });

    $("#shopping").click(function(){
        $("#shopping_list").slideToggle(200);
    });

    $("#transportation").click(function(){
        $("#transportation_list").slideToggle(200);
    });

    $("#other").click(function(){
        $("#other_list").slideToggle(200);
    });
    //end category navigation

    */

});

function startToggling() {
    //document.getElementById("activity").addEventListener("click", enableToggle(event.target.id));

    var lists = $(".showList");

    for(i = 0; i< lists.length; i++){
        lists[i].addEventListener("click", function () {
            console.log("event.target:")
            console.log(event.target);
            enableToggle(event.target.id);
        })
    }
}

function enableToggle(el) {
    if(el.getAttribute("class").includes("showList")){
        var id = el.id;
        var s = "" + id +"_list";
        console.log("id to be toggled: " + s);
        $("#" + s).slideToggle(200);
    }

}