/**
 * Created by Guro on 20.02.2017.
 */

//console.log('running uses.js file where ajax is');
var userName;

//run this function when the page loads
$(document).ready(function() {
    //window.onload = function () {
        console.log("calling ajax users");
        $.ajax({
            url: '/users', //collects the users call from app
            type: 'get',
            complete: function (data) {
                //when all the objects are retrieved, do this
                //console.log(data.responseJSON.message);
                //call the createUserList function
                createUserList(data.responseJSON.message);
            }
        });
    //};
});

//function called before
function createUserList(users){

    document.getElementById("userName").innerHTML = getUserFromURL();
    //console.log("Brukernavn: " + users[0].username);
};

/*
function getUserByID() {
    $.ajax({
        url: 'usersByID', //collects the users call from app
        type: 'get',
        complete: function (data) {
            addUserToTrip(data.responseJSON.message);
        }
    });
}
*/

