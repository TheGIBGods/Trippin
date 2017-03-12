/**
 * Created by Synne on 12.03.2017.
 */
$(document).ready(function userNameNav() {
    document.getElementById("#userName").innerHTML = getUser();
});

function logOut(){
    console.log("in logout");
    setUser(null);
    console.log(getUser());
}

function changeTrip() {
    console.log("in changeTrip");
    setTrip(null);
    console.log(getTrip());
}