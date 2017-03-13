/**
 * Created by Synne on 28.02.2017.
 */

$(document).ready(
    function() {
        $.ajax({
            url: '/trip', //collects the users call from app
            type: "get",
            complete: function(data){
                //when all the objects are retrieved, do this
                //log to cmd
                //console.log(data.responseJSON.message);
                //call the createUserList function
                var url = window.location.href;
                if(url.includes("myPage")) {
                    console.log("loaded myPage");
                    makeTripTable(data.responseJSON.message);
                    console.log("global user:" + userGlobal)
                }else if(url.includes("mapPage")){
                    console.log("loaded mapPage");
                    console.log("after: "+tripGlobal);
                    getTripByID('58aadb3ef36d28790bcde9c5');


                }
                makeTripList(data.responseJSON.message);

            }
        })
    });



//function called before
function displayInfo(trip){
    /*trip = { //hardkoding frem til vi får satt global variabel trip
        name: 'Mallorca',
        comment: 'for jeg er kongen av mallorca ole ole ole'
    }*/
    //create an element to place in the userName idfield
    document.getElementById("tripComment").innerHTML = trip.comment;
    document.getElementById("tripName").innerHTML = trip.name;
    document.getElementById("tripDate").innerHTML = trip.name;
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
            addTripToUser(userID, tripID); //TODO: dette blir ikke kalt, fikse til annen måte å poste på
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

function handleTripElementClick(tripid){
    console.log('Handling click on Trip');
    console.log("before: "+tripGlobal);
    tripGlobal = tripid;
    var t = tripGlobal;
    console.log("før bytte:" + t);
    window.location = "/views/mapPage.html";

}

function getTripByID(tripId) {
    //TODO: fix request to database to find trip by tripID
    /*console.log('in getTripByID')
    $.get('/tripOnId',{id: tripId}, function(data){
        console.log('Displaying info')
        displayInfo(data.responseJSON.message);
    })

    $.ajax({
        url: '/tripOnId', //collects the users call from app
        type: "get",
        complete: function(data){
            console.log('Displaying info')
            displayInfo(data.responseJSON.message);
        }
    })*/

}

function handleNewTripElementClick(){
    console.log('Handling click on NewTrip');
    //TODO:popup that lets you make a new trip
}

function makeTripTable(trips) {
    var count = 0;
    var row = 0;

    for (i =0; i< trips.length +1; i++){

        if(count == 4){
            count = 0;
            row++;
            //console.log("row er: "+ row)
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
            //console.log(count)
        }

        //console.log("i er: " + i)
        if(i == trips.length){
            var img = document.createElement("img");
            img.setAttribute("src", "/images/nytur.png");
            img.setAttribute("id", "createNewTrip");
            img.addEventListener('click', function(){
                handleNewTripElementClick();
            });

            var str = "#tableElement" + i;

            $(str).append(img);
        }else{
            var x = document.getElementById("tableElement" + i);
            x.innerHTML = trips[i].name ;
            //x.setAttribute("id", "tableElement"+ count+1)

            var img = document.createElement("img");
            img.setAttribute("src", trips[i].imglink);
            img.setAttribute("class", "tripImg");
            img.setAttribute("tripID", trips[i]._id)
            img.addEventListener('click', function(){
                handleTripElementClick(event.target.getAttribute("tripID"));
            });

            var str = "#tableElement" + i;

            $(str).append(img);

            var p = document.createElement("p");
            p.innerHTML = "hei"//trips[i].comment;
            $(str).append(p);
        }




    }
};



