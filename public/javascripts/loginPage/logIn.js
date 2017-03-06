/**
 * Created by Guro on 06.03.2017.
 */

$('.message').click(function(){
    console.log("Heihei")
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});
