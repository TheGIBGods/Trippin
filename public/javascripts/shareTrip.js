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
                /*$.ajax({
                    url: '/users/' + user[0].username + getTripFromURL(), //collects the users call from app
                    type: 'put',
                    complete: function(data){
                        var userDB = data.responseJSON.message;
                        try{
                            console.log(userDB);
                        } catch(ex){
                            console.log("something went wrong while sharing")
                        }
                    }
                })*/
            } catch(ex){
                // TODO: display that this user does not exist
                alert("This user does not exist")
                console.log("this user does not exist, share trip")
            }
        }
    });
}