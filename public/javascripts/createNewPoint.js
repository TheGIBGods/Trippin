/**
 * Created by Synne on 28.02.2017.
 */

function savePoint(){
    //saves the values from the form
    var name = $('#namePoint').val();
    var comment = $('#commentPoint').val();
    var category = $('#curtain').val();
    var date = $('#datepicker').val();
    var date2 = $('#datepicker2').val();
    var address = $('#pointAddress').html();
    var website = $('#websitePoint').val();

    var pat = /^https?:\/\//i;

    if(website === "Ingen funnet" || website.length === 0){
        website = null;
    }
    else  if (!pat.test(website))
    {
        website = "//" + website;
        console.log(website);
        //do stuff
    }

    //resets all the fields in the form
    if(name != "" && category != null) {
        $(function () {
            $('#modalPoint').modal('toggle');
        });

        resetForm('#pointForm');

//        console.log("Name: " + name + "\nKategori: " + category + "\nKommentar: " + comment + "\nDato: " + date + "\naddress: " + address);
        saveToDatabase(name, category, comment, date, date2, address, website);
        //setPointsOnMap(newPoint);
    }
};

function editPoint(){
    //saves the values from the form
    var name = $('#namePointEdit').val();
    var comment = $('#commentPointEdit').val();
    var category = $('#curtainEdit').val();
    var date = $('#datepickerEdit').val();
    var date2 = $('#datepickerEdit2').val();
    var address = $('#addressPointEdit').val();
    var website = $('#websitePointEdit').val();
    console.log(website);

    var pat = /^https?:\/\//i;

    if(website === "Ingen funnet" || website.length === 0){
        website = null;
    }
    else if (!pat.test(website))
    {
        website = "//" + website;
        console.log(website);
        //do stuff
    }

    if (date2 == ""){
        date2 = undefined;
    }

    //resets all the fields in the form
    if(name != "" && category != null) {
        $(function () {
            $('#modalPointEdit').modal('toggle');
        });

        resetForm('#pointForm');

//        console.log("Name: " + name + "\nKategori: " + category + "\nKommentar: " + comment + "\nDato: " + date + "\naddress: " + address);
        editToDatabase(name, category, comment, date, date2, address, website);
        //setPointsOnMap(newPoint);
    }
}

function editToDatabase(name, category, comment, date, date2, address, website) {
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
            date2: date2,
            address: address,
            website: website
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
        currentMarker.remove();
        $('#' + pointid).remove();

        setPointsOnMap(pointArray, true);
        createPointList(pointArray);
        markersOnMap[markersOnMap.length - 1].openPopup();

    });
}
function saveToDatabase(name, category, comment, date, date2,  address, website){

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
            date2: date2,
            address: address,
            website: website,
            created_by: getUserFromURL(),
            trip_ID: getTripFromURL()


            }).done(function(data,status){
            console.log("Data loaded: " + data + "\nStatus: " + status);
            console.log(data);
            //callback function
            var pointArray = new Array();
            pointArray.push(data);
            setPointsOnMap(pointArray, true);
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

function resetForm(form){
    $(form).each(function () {
        this.reset();
    });
}


