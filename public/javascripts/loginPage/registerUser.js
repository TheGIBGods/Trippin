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
        saveUser(user, password);
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