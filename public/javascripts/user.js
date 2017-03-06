/**
 * Created by Guro on 20.02.2017.
 */

//console.log('running uses.js file where ajax is');

//run this function when the page loads
$(document).ready(function() {
    //window.onload = function () {
        $.ajax({
            url: 'users', //collects the users call from app
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
    document.getElementById("userName").innerHTML = users[0].username;
    //console.log("Brukernavn: " + users[0].username);
};