/**
 * Created by Synne on 28.02.2017.
 */

$(document).ready(
    function() {
        $.ajax({
            url: 'trip', //collects the users call from app
            type: "get",
            complete: function(data){
                //when all the objects are retrieved, do this
                //log to cmd
                //console.log(data.responseJSON.message);
                //call the createUserList function
                displayInfo(data.responseJSON.message);
                makeTripList(data.responseJSON.message);
                //makeTripTable(data.responseJSON.message);
            }
        })
    });

//function called before
function displayInfo(trip){
    trip = { //hardkoding frem til vi får satt global variabel trip
        name: 'Mallorca',
        comment: 'for jeg er kongen av mallorca ole ole ole'
    }
    //create an element to place in the userName idfield
    document.getElementById("tripComment").innerHTML = trip.comment;
    document.getElementById("tripName").innerHTML = trip.name;
    //innerHTML sets the content of the element
    //hvordan hente username for alle brukere?
};

function makeTripList(trips) {
    for (i =0; i< trips.length; i++){
        var x = document.createElement("p");
        x.innerHTML = trips[i].name;
        //x.setAttribute("class", "tripClick canBeClicked")
        $(".trips-content").append(x);
    }
};

var trips = [
    trip1 = {
        name: "Miami", imglink: "/images/info.png"
    },
    trip2 = {
        name: "Orlando", imglink: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Globe_centered_in_the_Atlantic_Ocean_(green_and_grey_globe_scheme).svg/2000px-Globe_centered_in_the_Atlantic_Ocean_(green_and_grey_globe_scheme).svg.png"
    },
    trip3 = {
        name: "Oslo", imglink: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Globe_centered_in_the_Atlantic_Ocean_(green_and_grey_globe_scheme).svg/2000px-Globe_centered_in_the_Atlantic_Ocean_(green_and_grey_globe_scheme).svg.png"
    },
    trip4 = {
        name: "Miami", imglink: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Globe_centered_in_the_Atlantic_Ocean_(green_and_grey_globe_scheme).svg/2000px-Globe_centered_in_the_Atlantic_Ocean_(green_and_grey_globe_scheme).svg.png"
    },
    trip5 = {
        name: "Orlando", imglink: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Globe_centered_in_the_Atlantic_Ocean_(green_and_grey_globe_scheme).svg/2000px-Globe_centered_in_the_Atlantic_Ocean_(green_and_grey_globe_scheme).svg.png"
    },
    trip6 = {
        name: "Oslo", imglink: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Globe_centered_in_the_Atlantic_Ocean_(green_and_grey_globe_scheme).svg/2000px-Globe_centered_in_the_Atlantic_Ocean_(green_and_grey_globe_scheme).svg.png"
    },
    trip7 = {
        name: "Oslo", imglink: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Globe_centered_in_the_Atlantic_Ocean_(green_and_grey_globe_scheme).svg/2000px-Globe_centered_in_the_Atlantic_Ocean_(green_and_grey_globe_scheme).svg.png"
    }
    ,
    trip8 = {
        name: "Oslo", imglink: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Globe_centered_in_the_Atlantic_Ocean_(green_and_grey_globe_scheme).svg/2000px-Globe_centered_in_the_Atlantic_Ocean_(green_and_grey_globe_scheme).svg.png"
    }

];

function makeTripTable(trips) {
    var count = 0;
    var row = 0;

    for (i =0; i< trips.length; i++){
        console.log("i er: " + i)
        var x = document.getElementById("tableElement" + i);
        x.innerHTML = trips[i].name ;
        //x.setAttribute("id", "tableElement"+ count+1)

        var img = document.createElement("img");
        img.setAttribute("src", trips[i].imglink);
        img.setAttribute("class", "tripImg");

        var str = "#tableElement" + i;

        $(str).append(img);

        var p = document.createElement("p");
        p.innerHTML = "hei"//trips[i].comment;
        $(str).append(p);

        if(count == 4){
            count = 0;
            row++;
            console.log("row er: "+ row)
            //var el1 = document.createElement("tr")
            //el1.setAttribute("id", "tableRow"+row)

            $('#myTable tr:last').after("<tr id = tableRow"+ row+ "> </tr> ");
            for (j=0; j< 5; j++){
                var el = document.createElement("td")
                var num = i+j+1;
                el.setAttribute("id", "tableElement" + num)
                $("#tableRow"+row).append(el)
            }

        }else{
            count ++;
            console.log(count)
        }
    }
};
//createTrip("58aafadcd1a1f22baaa7c51b", "Lofoten", null, "Tur til lofoten vel, blubbblubb");

function createTrip(userID, name, date, comment, imglink){
    $.post("createTrip",
        {
            name: name,
            date: date,
            comment: comment,
            imglink: imglink
        })
        .done( function(data,status){
            console.log("Data loaded: " + data + "\nStatus: " + status)
            var tripID = data.responseJSON.message.tripID;
            addTripToUser(userID, tripID); //dette blir ikke kalt
        });


}

function addTripToUser(userID, tripID) {
    //console.log('in addTripToUser in trip.js');
    //userID = "58aafadcd1a1f22baaa7c51b";
    //tripID ="58aadb3ef36d28790bcde9c5";
    $.post("addTripToUser",
        {
            userID: userID,
            tripID: tripID
        })
        .done( function(data,status){
            console.log("Data loaded: " + data + "\nStatus: " + status);
        });
    console.log("In saveToDatabase");
}



