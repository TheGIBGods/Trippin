/**
 * Created by Synne on 23.03.2017.
 */

function shareTrip(){
    var shareUser = $('#shareName').val();

    $.ajax({
        url: '/users/' + shareUser, //collects the users call from app
        type: 'get',
        complete: function (data) {
            //when all the objects are retrieved, do this
            var userDB = data.responseJSON.message;
            console.log("checking if user exists");
            try {
                console.log(userDB)
                console.log(userDB[0].username + " " + userDB[0].trips)
                shareWithUser(userDB[0]);
                console.log("username");
                addUsernameToTrip(userDB[0].username);
            } catch(ex){
                // TODO: display that this user does not exist
                alert("This user does not exist")
                console.log("this user does not exist, share trip")
            }
        }
    });
}

function shareWithUser(shareUser){
    console.log("trying to share trip, shareWithUser");
    $.ajax({
         url: '/users/' + shareUser.username + '/'+ getTripFromURL(), //collects the users call from app
         type: 'put',
         /*complete: function(data){
             var userDB = data;
             console.log("shared trip")
             try{
                 console.log("trying to share username");
                 //addUsernameToTrip(shareUser.username);
             } catch(ex){
                console.log("something went wrong while sharing")
             }
         }*/
    });
};

function addUsernameToTrip(username){
    console.log("adding username to trip");
    $.ajax({
        url: '/trips/' + getTripFromURL() + '/' + username, //collects the users call from app
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