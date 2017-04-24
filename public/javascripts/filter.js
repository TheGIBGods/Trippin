/**
 * Created by Synne on 24.04.2017.
 */

function filterMarkers(){
    clearMap();

    setPointsOnMap(categories[0]);
    //setPointsOnMap(categories[5]);
    $('#modalFilter').modal('toggle');
}

function clearMap(){
    console.log("trying to clear")
    //mymap.removeLayer(markersOnMap);
    for(var i = 0; i < markersOnMap.length; i++) {
        mymap.removeLayer(markersOnMap[i]);
    }
}