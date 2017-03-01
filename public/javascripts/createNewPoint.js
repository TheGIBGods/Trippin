/**
 * Created by Synne on 28.02.2017.
 */

function savePoint(){
    //saves the values from the form
    var name = $('#namePoint').val();
    var comment = $('#commentPoint').val();
    var cat = $('#curtain').val();

    //resets all the fields in the form
    $( '#pointForm' ).each(function(){
        this.reset();
    });
    console.log("Nave: " + name +"\nKommentar: " + comment + "\nKategori: " + cat);
};