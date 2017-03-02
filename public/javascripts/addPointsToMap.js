/**
 * Created by Guro on 02.03.2017.
 */


var addPointsCategory = function (points, map) {
    for(p in points){
        var Icon = L.icon({
            iconUrl: '/images/'+p.category+'.png',
            iconSize:     [38, 40], // size of the icon
            popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        });

        L.marker([h.x_koord, h.y_koord], {icon: Icon}).addTo(map);
    }
}
