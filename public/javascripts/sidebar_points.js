/**
 * Created by Guro on 04.03.2017.
 */

$(document).ready(function(){

    $(".pointClick").click(function () {
        console.log('Clicked on point in sidebar')
        var x = parseInt($(event.target).getAttribute("xkoord"));
        var y = parseInt($(event.target).getAttribute("ykoord"));
        setMapView(x,y);
    })
});