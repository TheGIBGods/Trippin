/**
 * Created by Synne on 13.03.2017.
 */

function getUrl(){
    console.log("in get url");
    return window.location.href;
}

function getTripFromURL(){
    var tripId = getUrl().split("?")[2];
    return tripId;
}


function getUserFromURL() {
    var user = getUrl().split("?")[1];
    return user;
}

function getMyPageURL(user){
    window.location = "/views/myPage.html?" + user;
}

function logOut(){
    console.log("in logout");
    window.location = "/"
}

function backToTrip(){
    getMyPageURL(getUserFromURL(getUrl()));
}