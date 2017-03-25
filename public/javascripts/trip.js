/**
 * Created by Synne on 28.02.2017.
 */

$(document).ready(
    $.ajax({
        url: '/users/' + getUserFromURL(), //collects the users call from app
        type: 'get',
        complete: function (data) {
            //when all the objects are retrieved, do this
            var userDB = data.responseJSON.message[0];
            console.log(userDB);
            try {
                console.log("in try");
                console.log(userDB.trips);
                for (var i = 0; i < userDB.trips.length; i++){
                    userTrips.push(userDB.trips[i].tripName);
                }

                console.log(userTrips);
                /*userTrips = userDB.trips[0].tripName;
                console.log(userDB.trips.length);
                console.log(userTrips);*/
                getTrips()

            } catch(ex){
                // TODO: display something
                console.log("something went wrong")
            }
        }
    })
);

$("#myTripsBut").click(function(){
    var userName = getUserFromURL();
    console.log("User :" + userName)
    getMyPageURL(userName);
});

function getTrips() {
    console.log("getting trips")
    $.ajax({
        url: '/trips', //collects the users call from app,
        type: "get",
        complete: function(data){
            console.log("retrived trips");
            //call the createUserList function
            //console.log(data);
            var url = window.location.href;
            if(url.includes("myPage")) {
                console.log("loaded myPage");
                //console.log(data);
                makeTripTable(data.responseJSON.message);
            }else if(url.includes("mapPage")){
                console.log("loaded mapPage");
                var tripID = getTripFromURL(url);
                console.log("TripID from splitted from url: "+tripID)
                getTripByID(tripID, data.responseJSON.message);
            }
            makeTripList(data.responseJSON.message);

        }
    })
};

//function called before
function displayInfo(trip){
    //create an element to place in the userName idfield
    console.log("Displaying info: ");
    var addedUsers = Array();
    console.log(trip);
    for(var i = 0 ; i < trip.users.length; i++){
        addedUsers.push(" " + trip.users[i].userName);
    }
    document.getElementById("tripComment").innerHTML = "<b>"+ "Kommentar: " +"</b>"+ trip.comment;
    document.getElementById("tripName").innerHTML = trip.name;
    document.getElementById("tripNamePop").innerHTML = trip.name;
    if (trip.date != null){
        document.getElementById("tripDate").innerHTML = "<b>"+ "Dato: "+ "</b>" + trip.date;
    }
    document.getElementById("tripUsers").innerHTML = "<b>" + "Brukere som har tilgang: "+ "</b>" + addedUsers;

    //innerHTML sets the content of the element
    //hvordan hente username for alle brukere?
};

function makeTripList(trips) {
    console.log("Making tripsList")
    for (var i =0; i< trips.length; i++){
        if(userTrips.includes(trips[i]._id)) {
            //console.log("maketriplist, tripid: " +trips[i]._id)
            var x = document.createElement("p");
            x.innerHTML = trips[i].name;
            x.setAttribute("class", "tripClick canBeClicked")
            x.setAttribute("tripID", trips[i]._id)
            x.addEventListener('click', function () {
                handleTripElementClick((event.target.getAttribute("tripID")));
            })
            $(".trips-content").append(x);
        }
    }
};




//createTrip("58aafadcd1a1f22baaa7c51b", "Lofoten", null, "Tur til lofoten vel, blubbblubb");

function createTrip(){
    var name = $('#nameTrip').val();
    var comment = $('#imgUrl').val();
    var imglink = $('#commentTrip').val();

    if(name != "") {
        $(function () {
            $('#modalTrip').modal('toggle');
        });

        console.log("trying to save trip");
        $.post("/trips/",
            {
                name: name,
                comment: comment,
                imglink: imglink,
            }).done(function(res){
                console.log("in on done");
                var tripID = res.message._id;
                shareWithUser(getUserFromURL(), tripID);
                addUsernameToTrip(getUserFromURL(), tripID);
                console.log(tripID);
                tripUrl(tripID);

        });
    };
}

/*function addTripToUser(userID, tripID) {
    //console.log('in addTripToUser in trip.js');
    //userID = "58aafadcd1a1f22baaa7c51b";
    //tripID ="58aadb3ef36d28790bcde9c5";
    //TODO: use put to update object in db
    $.post("addTripToUser",
        {
            userID: userID,
            tripID: tripID
        })
        .done( function(data,status){
            console.log("Data loaded: " + data + "\nStatus: " + status);
        });
    console.log("In saveToDatabase");
}*/

function handleTripElementClick(tripid){
    console.log('Handling click on Trip');
    var userName = getUserFromURL();
    tripUrl(tripid);
    //window.location = "/views/mapPage.html?" + userName +"?" + tripid;

}

function getTripByID(tripId, trips) {
    //TODO: fix request to database to find trip by tripID
    console.log('in getTripByID, tripID is:' + tripId)

    for(i = 0; i <trips.length; i++){
        if(trips[i]._id == tripId){
            displayInfo(trips[i]);

            return;
        }
    }


    $.ajax({
        url: "/trips/" + tripId,
        type: "get", //send it through get method
        data: {
            id: tripId
        },
        complete: function(data) {
            console.log('Displaying info: ' + data.responseJSON.message.name)
            displayInfo(data.responseJSON.message);
        },
        error: function(xhr) {
            //Do Something to handle error
        }
    });

}

function handleNewTripElementClick(){
    console.log('Handling click on NewTrip');
    $('#modalTrip').modal('toggle');
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
            if(userTrips.includes(trips[i]._id)) {
                var x = document.getElementById("tableElement" + i);
                x.innerHTML = trips[i].name;
                //x.setAttribute("id", "tableElement"+ count+1)

                var img = document.createElement("img");
                img.setAttribute("src", trips[i].imglink);
                img.setAttribute("class", "tripImg");
                img.setAttribute("tripID", trips[i]._id)
                img.addEventListener('click', function () {
                    handleTripElementClick(event.target.getAttribute("tripID"));
                });

                var str = "#tableElement" + i;

                $(str).append(img);

                var p = document.createElement("p");
                p.innerHTML = "hei"//trips[i].comment;
                $(str).append(p);
            }
        }

    }
};



