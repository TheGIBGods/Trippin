/**
 * Created by Brage on 03-Apr-17.
 */
function openTripEditWindow() {
    $("#modalTripEdit").modal('show');

    $("#nameTripEdit").val(
        $("#tripNamePop").html()
    );

    $("#commentTripEdit").val(
        $("#realTripComment").html()
    );

    $("#tripFromDateEdit").val(
        $("#tripFromDate").html()
    );

    $("#tripToDateEdit").val(
        $("#tripToDate").html()
    );

    $("#imgUrlEdit").val(
        $("#imgUrl").val()
    );

}

function editTrip() {
    var name = $("#nameTripEdit").val();
    var comment = $("#commentTripEdit").val();
    var fromdate = $("#tripFromDateEdit").val();
    var todate = $("#tripToDateEdit").val();
    var imglink = $("#imgUrlEdit").val();


    if(name != "") {
        $(function () {
            $('#modalTripEdit').modal('toggle');
        });

        resetForm('#tripFormEdit');

        /*$('#tripFormEdit').each(function () {
            this.reset();
        });*/

//        console.log("Name: " + name + "\nKategori: " + category + "\nKommentar: " + comment + "\nDato: " + date + "\naddress: " + address);
        editTripToDatabase(name, comment, fromdate, todate, imglink);
    }
}

function editTripToDatabase(name, comment, fromdate, todate, imglink) {

    var tripid = getTripFromURL();

    $.ajax({
        url: '../trips/' + tripid, //collects the users call from app

        data: {
            name: name,
            comment: comment,
            fromdate: fromdate,
            todate: todate,
            imglink:imglink
        },

        success: function () {
            console.log("Trip changed")
        },
        type: "put"
    }).done(function (data, status) {
        console.log(data);

        displayInfo(data);

    });
}

function deleteTrip() {
    if(confirm("Er du sikker på at du ikke lenger vil ha tilgang til denne turen?\nTuren vil fortsatt være tilgjengelig for andre" +
            " brukere den er delt med.")) {
        var tripid = getTripFromURL();
        var user = getUserFromURL();
        $.ajax({
            url: '../users/delete/' + user + '/' + tripid,
            type: 'put'
        });

        $.ajax({
            url: '../trips/delete/' + tripid + '/' + user,
            type: 'put'
        });

        deleteFromDB();

        backToTrip();
    }
}

function deleteFromDB(){
    if(document.getElementById("access").innerHTML.includes(",") == false){
        console.log("deleting for real");
        for (var i = 0; i < categories.length; i++){
            for (var j = 0; j < categories[i].length; j++){
                console.log(categories[i][j]._id);
                $.ajax({
                    url: '../points/' + categories[i][j]._id, //collects the users call from app
                    type: 'delete',
                    success: function(){
                        console.log("point deleted");
                    }
                });
            }
        }

        console.log(getTripFromURL());
        $.ajax({
            url: '../trips/' + getTripFromURL(), //collects the users call from app
            type: 'delete',
            success: function(){
                console.log("trip deleted");
            }
        });

    }
}