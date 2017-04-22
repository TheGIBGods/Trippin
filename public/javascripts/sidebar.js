/**
 * Created by Synne on 23.02.2017.
 */

$(document).ready(function(){

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


});