/**
 * Created by Synne on 24.04.2017.
 */

function filterMarkers(){
    clearMap();

    if(document.getElementById("activityCB").checked){
        setPointsOnMap(categories[0]);
    }
    if(document.getElementById("attractionCB").checked){
        setPointsOnMap(categories[1]);
    }
    if(document.getElementById("hotelCB").checked){
        setPointsOnMap(categories[2]);
    }
    if(document.getElementById("restaurantCB").checked){
        setPointsOnMap(categories[4]);
    }
    if(document.getElementById("shoppingCB").checked){
        setPointsOnMap(categories[3]);
    }
    if(document.getElementById("transportationCB").checked){
        setPointsOnMap(categories[5]);
    }
    if(document.getElementById("otherCB").checked){
        setPointsOnMap(categories[6]);
    }
    if(document.getElementById("allCB").checked){
        for (var i = 0; i < categories.length; i++) {
            setPointsOnMap(categories[i]);
        }
    }

    $('#modalFilter').modal('toggle');
}

function clearMap(){
    console.log("trying to clear")
    //mymap.removeLayer(markersOnMap);
    for(var i = 0; i < markersOnMap.length; i++) {
        mymap.removeLayer(markersOnMap[i]);
    }
}