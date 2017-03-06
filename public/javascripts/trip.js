/**
 * Created by Synne on 28.02.2017.
 */

$(document).ready(
    function() {
        $.ajax({
            url: 'trip', //collects the users call from app
            type: "get",
            complete: function(data){
                //when all the objects are retrieved, do this
                //log to cmd
                //console.log(data.responseJSON.message);
                //call the createUserList function
                displayInfo(data.responseJSON.message);
                makeTripList(data.responseJSON.message);
            }
        })
    });

//function called before
function displayInfo(trips){
    //create an element to place in the userName idfield
    document.getElementById("tripComment").innerHTML = trips[0].Comment;
    //innerHTML sets the content of the element
    //hvordan hente username for alle brukere?
};

function makeTripList(trips) {
    for (i =0; i< trips.length; i++){
        var x = document.createElement("p");
        x.innerHTML = trips[i].name;
        //x.setAttribute("class", "tripClick canBeClicked")
        $(".trips-content").append(x);
    }

}