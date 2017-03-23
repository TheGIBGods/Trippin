/**
 * Created by Synne on 28.02.2017.
 */

function savePoint(){
    //saves the values from the form
    var name = $('#namePoint').val();
    var comment = $('#commentPoint').val();
    var category = $('#curtain').val();
    var date = $('#datepicker').val();
    var address = $('#pointAddress').html();
/*
    var pointX = document.createElement('points');

    pointX.setAttribute("name", name);
    pointX.setAttribute("comment", comment);
    pointX.setAttribute("category", category);
    pointX.setAttribute("x_koord", getlat());
    pointX.setAttribute("y_koord", getlng());

    */

    //resets all the fields in the form
    if(name != "" && category != null) {
        $(function () {
            $('#modalPoint').modal('toggle');
        });

        $('#pointForm').each(function () {
            this.reset();
        });

        console.log("Name: " + name + "\nKategori: " + category + "\nKommentar: " + comment + "\nDato: " + date + "\naddress: " + address);
        saveToDatabase(name, category, comment, date, address);
        //setPointsOnMap(newPoint);
    }
};

function saveToDatabase(name, category, comment, date, address){

    var x = lat;
    var y = lng;
    console.log(x + "\n" + y);

    $.post("/savePoint",
        {
            x_koord: x,
            y_koord: y,
            name: name,
            category: category,
            comment: comment,
            date: date,
            address: address,
            created_by: getUserFromURL(),
            trip_ID: getTripFromURL()

        },
        function(data,status){
                console.log("Data loaded: " + data + "\nStatus: " + status);
                console.log(data);
                //callback function
                setPointsOnMap(data);}
        );
    console.log("In saveToDatabase");

};

