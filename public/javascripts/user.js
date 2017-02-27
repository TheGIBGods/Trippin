/**
 * Created by Guro on 20.02.2017.
 */

var userInfo ={
    username: 'guro',
    password: 'testeste'
};

console.log('running uses.js file where ajax is');

//kjør denne funksjonen når vinduet loades
window.onload = function(){
    $.ajax({
        url: 'trip',
        type: "get",
        data: {},
        complete: function(data){
            console.log(data);
        }
    })
};