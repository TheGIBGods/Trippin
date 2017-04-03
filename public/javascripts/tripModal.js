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
}

function editTrip() {
    var name = $("#nameTripEdit").val();
    var comment = $("#commentTripEdit").val();

    if(name != "") {
        $(function () {
            $('#modalTripEdit').modal('toggle');
        });

        $('#tripFormEdit').each(function () {
            this.reset();
        });

//        console.log("Name: " + name + "\nKategori: " + category + "\nKommentar: " + comment + "\nDato: " + date + "\naddress: " + address);
        editTripToDatabase(name, comment);
    }
}

function editTripToDatabase(name, comment) {

    var tripid = getTripFromURL();

    $.ajax({
        url: '../trips/' + tripid, //collects the users call from app

        data: {
            name: name,
            comment: comment
        },

        success: function () {
            console.log("Trip changed")
        },
        type: "put"
    }).done(function (data, status) {
        console.log("Data loaded: " + data + "\nStatus: " + status);
        console.log(data);
        console.log(data.name);
        console.log(data.comment);

        document.getElementById("tripNamePop").innerHTML = data.name;
        document.getElementById("realTripComment").innerHTML = data.comment;
    });
}