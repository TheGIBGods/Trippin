/**
 * Created by Guro on 20.02.2017.
 */

var userInfo ={
    username: 'guro',
    password: 'testeste'
};

console.log('running uses.js file where ajax is');

$.ajax({
    url: 'users',
    type: "get",
    data: {},
    complete: function(data){
        console.log(data);
    }
});