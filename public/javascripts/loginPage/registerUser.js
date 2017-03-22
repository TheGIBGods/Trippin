/**
 * Created by Guro on 06.03.2017.
 */

function validateUser(){
    //validate that the username does not already exist
    var user = $('#registerUser').val();
    console.log(user);
    var password = $('#password').val();
    var passwordCheck = $('#passwordCheck').val();
    console.log(password);
    console.log(passwordCheck);
    if(password == passwordCheck){
        console.log("password ok");
        newUserName(user, password);
    }
};

function saveUser(user, password){
    console.log(user + "\n" + password);

    $.post('/saveUser',
        {
            username: user,
            password: password
        })
        .done( function(data,status){
            console.log("Data loaded: " + data + "\nStatus: " + status);
        });
    console.log("In saveToDatabase");
};

function newUserName(userName, password){
    var newUser;

    $.ajax({
        url: '/users/' + userName, //collects the users call from app
        type: 'get',
        complete: function (data) {
            //when all the objects are retrieved, do this
            try{
                //TODO: display, there is already a user with this username
                var existingUser = data.responseJSON.message[0].userName
            } catch(ex){
                saveUser(userName, password);
                getMyPageURL(userName);
            }
        }
    });
}

/*function checkName(users, userName){
    console.log(users);
    for(var i = 0; i < users.length; i++){
        if (userName == users[i].username){
            alert("Det finnes allerede en bruker med dette brukernavnet");
            return false;
        }
    }
    return true;
};*/