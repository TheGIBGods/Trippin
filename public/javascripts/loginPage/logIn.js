/**
 * Created by Guro on 06.03.2017.
 */
var userTrips = Array();

$('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});

function checkPassword(){
    console.log("checking password");
    var user = $('#text').val();
    console.log(user);
    var password = $('#passwordUser').val();
    console.log(password);

    $.ajax({
        url: '/users/' + user, //collects the users call from app
        type: 'get',
        complete: function (data) {
            //when all the objects are retrieved, do this
            var userDB = data.responseJSON.message;
            console.log("checking password");
            try {
                console.log(userDB)
                console.log(userDB[0].username + " " + userDB[0].password)

                if (user == userDB[0].username && password == userDB[0].password) {
                    console.log("correct")
                    getMyPageURL(user);
                }
                else{
                    //TODO: do this in a better way
                    alert("Wrong password")
                }
            } catch(ex){
                // TODO: display that this user does not exist
                alert("Wrong username")
                console.log("this user does not exist, login")
            }
        }
    });
}