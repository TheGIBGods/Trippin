/**
 * Created by Synne on 28.02.2017.
 */

function savePoint(){
    //saves the values from the form
    var name = $('#namePoint').val();
    var comment = $('#commentPoint').val();
    var category = $('#curtain').val();

    //resets all the fields in the form
    if(name != "" && category != null) {
        $(function () {
            $('#modalPoint').modal('toggle');
        });

        $('#pointForm').each(function () {
            this.reset();
        });

        console.log("Name: " + name + "\nKategori: " + category + "\nKommentar: " + comment);
    }
};