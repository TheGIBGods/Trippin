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

//        console.log("Name: " + name + "\nKategori: " + category + "\nKommentar: " + comment + "\nDato: " + date + "\naddress: " + address);
        saveToDatabase(name, category, comment, date, address);
        //setPointsOnMap(newPoint);
    }
};

function editPoint(){
    //saves the values from the form
    var name = $('#namePointEdit').val();
    var comment = $('#commentPointEdit').val();
    var category = $('#curtainEdit').val();
    var date = $('#datepickerEdit').val();
    var address = $('#addressPointEdit').val();


    //resets all the fields in the form
    if(name != "" && category != null) {
        $(function () {
            $('#modalPointEdit').modal('toggle');
        });

        $('#pointForm').each(function () {
            this.reset();
        });

//        console.log("Name: " + name + "\nKategori: " + category + "\nKommentar: " + comment + "\nDato: " + date + "\naddress: " + address);
        editToDatabase(name, category, comment, date, address);
        //setPointsOnMap(newPoint);
    }
}

function editToDatabase(name, category, comment, date, address) {
    var pointid = document.getElementById('pointID').value;
    var x = lat;
    var y = lng;
    $.ajax({
        url: '../points/' + pointid, //collects the users call from app

        data: {
            x_koord: x,
            y_koord: y,
            name: name,
            category: category,
            comment: comment,
            date: date,
            address: address
        },

        success: function () {
            console.log("Point changed")
        },
        type: "put"
    }).done(function (data, status) {
        console.log("Data loaded: " + data + "\nStatus: " + status);
        console.log(data);
        //callback function
        var pointArray = new Array();
        pointArray.push(data);
        currentMarker.remove()
        $('#' + pointid).remove();

        setPointsOnMap(pointArray);
        createPointList(pointArray);
        markersOnMap[markersOnMap.length - 1].openPopup();

    });
}
function saveToDatabase(name, category, comment, date, address){

    var x = lat;
    var y = lng;
    $.post("/points",
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


            }).done(function(data,status){
            console.log("Data loaded: " + data + "\nStatus: " + status);
            console.log(data);
            //callback function
            var pointArray = new Array();
            pointArray.push(data);
            setPointsOnMap(pointArray);
            createPointList(pointArray);
            markersOnMap[markersOnMap.length -1 ].openPopup();


           });

}




function deleteOpenPoint() {
    var pointid = document.getElementById('pointID').value;
    $.ajax({
        url: '../points/' + pointid, //collects the users call from app
        type: "delete",
        success: function(){

            document.getElementById(pointid).remove();
            mymap.removeLayer(currentMarker);
        }

    })
}



