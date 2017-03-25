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
            url: '/users/' + getUserFromURL(), //collects the users call from app
            type: 'get',
            complete: function (data) {
                //call the createUserList function
                createUserList(data.responseJSON.message[0]);
            }
        });
    //};
});

//function called before
function createUserList(user){
    //setting username in navbar
    document.getElementById("userName").innerHTML = getUserFromURL();
    //console.log("Brukernavn: " + user.username);
};