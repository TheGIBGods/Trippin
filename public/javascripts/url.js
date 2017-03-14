/**
 * Created by Synne on 13.03.2017.
 */

function getUrl(){
    console.log("in get url");
    return window.location.href;
}

function getTripFromURL(url){
    var tripId = url.split("?")[2];
    return tripId;
}

function getUserFromURL(url) {
    var user = url.split("?")[1];
    return user;

}