/**
 * Created by Guro on 06.03.2017.
 */


$('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});

function checkPassword(){
    var user = $('#text').val();
    console.log(user);
    var password = $('#passwordUser').val();
    console.log(password);

    $.ajax({
        url: 'users', //collects the users call from app
        type: 'get',
        complete: function (data) {
            //when all the objects are retrieved, do this
            var users = data.responseJSON.message;

            for(var i = 0; i < users.length; i++){
                if (user == users[i].username && password == users[i].password){
                    alert("Logg inn");
                    setUser(user);
                    console.log(getUser());
                    //changeView();
                }
            }
        }
    });
}