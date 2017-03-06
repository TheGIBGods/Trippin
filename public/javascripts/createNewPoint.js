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
        saveToDatabase(name, category, comment);
    }
};

function saveToDatabase(name, category, comment){

    var x = getlat();
    var y = getlng();
    console.log(x + "\n" + y);

    /*$.post("savePoint",
        {
            x_koord: x,
            y_koord: y,
            name: name,
            category: category,
            comment: comment
        })
        .done( function(data,status){
            console.log("Data loaded: " + data + "\nStatus: " + status);
        });*/
    console.log("In saveToDatabase");
};