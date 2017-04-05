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

        $('#tripFormEdit').each(function () {
            this.reset();
        });

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