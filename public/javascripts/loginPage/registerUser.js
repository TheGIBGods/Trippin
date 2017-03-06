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
    if(password == passwordCheck && checkUserName(user)){
        saveUser(user, password);
    }
};

function saveUser(user, password){
    console.log(user + "\n" + password);

    $.post("saveUser",
        {
            username: user,
            password: password
        })
        .done( function(data,status){
            console.log("Data loaded: " + data + "\nStatus: " + status);
        });
    console.log("In saveToDatabase");
};

function checkUserName(user){
    var exists = false;
    $.ajax({
        url: 'users', //collects the users call from app
        type: 'get',
        complete: function (data) {
            users = createUserList(data.responseJSON.message);
        }
    });

    for(i = 0; i > users.length; i++){
       if (users[i] == user){
           exists = true;
           return exists;
       };
    };

    return exists;

};