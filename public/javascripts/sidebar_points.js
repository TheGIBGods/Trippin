/**
 * Created by Guro on 04.03.2017.
 */


function handleListElementClick(x, y) {

    markersOnMap.forEach( function(marker)
    {
        if((marker.getLatLng().lat == x) && (marker.getLatLng().lng = y) ){
            marker.openPopup();
            setMapView(x,y);
            
        }
    });
}
