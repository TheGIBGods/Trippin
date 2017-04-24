/**
 * Created by Synne on 24.04.2017.
 */

function filterMarkers(){
    checkedMarkers = new Array();
    clearMap();
    firstIteration = true;

    if(document.getElementById("activityCB").checked){
        console.log( "IN ACTIVITY");
        for (i = 0; categories[0].length  > i; i++){
            checkedMarkers.push(categories[0][i]);
        }
    }
    if(document.getElementById("attractionCB").checked){
        for (i = 0; categories[1].length  > i; i++){
            checkedMarkers.push(categories[1][i]);
        }    }
    if(document.getElementById("hotelCB").checked){
        for (i = 0; categories[2].length  > i; i++){
            checkedMarkers.push(categories[2][i]);
        }    }
    if(document.getElementById("restaurantCB").checked){
        for (i = 0; categories[3].length > i; i++){
            checkedMarkers.push(categories[3][i]);
        }    }
    if(document.getElementById("shoppingCB").checked){
        for (i = 0; categories[4].length > i; i++){
            checkedMarkers.push(categories[4][i]);
        }    }
    if(document.getElementById("transportationCB").checked){
        for (i = 0; categories[5].length > i; i++){
            checkedMarkers.push(categories[5][i]);
        }    }
    if(document.getElementById("otherCB").checked){
        for (i = 0; categories[6].length > i; i++){
            checkedMarkers.push(categories[6][i]);
        }    }
    if(document.getElementById("allCB").checked){
        for (var i = 0; i < categories.length; i++) {
            setPointsOnMap(categories[i], false);
        }
    }
    else{
        console.log(checkedMarkers);
        setPointsOnMap(checkedMarkers, false);
    }


    $('#modalFilter').modal('toggle');
}

function clearMap(){ 
    //mymap.removeLayer(markersOnMap);
    for(var i = 0; i < markersOnMap.length; i++) {
        mymap.removeLayer(markersOnMap[i]);
    }
}