/**
 * Created by Synne on 23.03.2017.
 */

function shareTrip(){
    var shareUser = $('#shareName').val();
    console.log("shareUser: " + shareUser);

    $.ajax({
        url: '/users/' + shareUser, //collects the users call from app
        type: 'get',
        complete: function (data) {
            //when all the objects are retrieved, do this
            var userDB = data.responseJSON.message;
            //console.log("checking if user exists");
            try {
                //console.log(userDB)
                //console.log(" in shareTrip: username, trips: " + userDB[0].username + ",  " + userDB[0].trips)
                shareWithUser(userDB[0].username, getTripFromURL());
                console.log("username");
                $("#tripUsers").html($("#tripUsers").html() + ", " + shareUser);
                //console.log("users from trip: "+ getTripByID())
                //addUsernameToTrip(userDB[0].username, getTripFromURL());
                getTripByID(getTripFromURL(), "add",userDB[0].username); //add means that addUserNameToTrip should be called
                $(function () {
                    $('#modalShare').modal('toggle');
                    $('#shareName').val('');
                });
            } catch(ex){
                // TODO: display that this user does not exist
                alert("This user "+ shareUser + ",does not exist")
                console.log("this user does not exist, share trip")
            }
        }
    });
}

function shareWithUser(username, tripName){
    console.log("trying to share trip, shareWithUser");
    console.log("username:" + username);
    console.log("tripID: " + tripName);
    $.ajax({
         url: '/users/' + username + '/'+ tripName, //collects the users call from app
         type: 'put',
         complete: function(data){
             var userDB = data;
             console.log("shared trip")
             try{
                 console.log("trying to share username");
                 console.log(userDB)
                 //addUsernameToTrip(shareUser.username);
             } catch(ex){
                console.log("something went wrong while sharing")
             }
         }
    })

};



function addUsernameToTrip(trip, username){

    var tripID = trip._id;


    for (var i = 0; i < trip.users.length; i++) {
        if(trip.users[i].userName == username){
            console.log("Trip already shared with this user");
            alert("Denne turen er allerede delt med " + username);
            //TODO: ikke bruke alert her, lage egen error-modal?
            return;
        }
    }

    $.ajax({
        url: '/trips/' + tripID + '/' + username, //collects the users call from app
        type: 'put',
        complete: function(data){
            var tripDB = data;
            try{
                console.log(tripDB)
            } catch(ex){
                console.log("something went wrong while sharing")
            }
        }
    })
};