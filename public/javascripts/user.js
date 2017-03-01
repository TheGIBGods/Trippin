/**
 * Created by Guro on 20.02.2017.
 */

var userInfo ={
    username: 'guro',
    password: 'testeste'
};

console.log('running uses.js file where ajax is');

//run this function when the page loads
window.onload = function(){
    $.ajax({
        url: 'users', //collects the users call from app
        type: "get",
        complete: function(data){
            //when all the objects are retrieved, do this
            //log to cmd
            //console.log(data.responseJSON.message);
            //call the createUserList function
            createUserList(data.responseJSON.message);
        }
    })
};

//function called before
function createUserList(users){
    //create an element to place in the userName idfield
    document.getElementById("userName").innerHTML = users[0].username;
    //innerHTML sets the content of the element
    //hvordan hente username for alle brukere?
};