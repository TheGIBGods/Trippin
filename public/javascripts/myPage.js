/**
 * Created by Guro on 13.03.2017.
 */

//Tror denne filen blir overflødig, kan fjernes muligens
$(document).ready(
    function() {
        $.ajax({
            url: '/trip', //collects the users call from app
            type: "get",
            complete: function(data){

                makeTripList(data.responseJSON.message);
                makeTripTable(data.responseJSON.message);
            }
        })
    });

function handleTripElementClick(tripid){
    console.log('Handling click on Trip');
    console.log("before: "+tripGlobal);
    tripGlobal = tripid;
    console.log("after: "+tripGlobal);
    window.location = "/views/mapPage.html";
    //TODO:change view to mapPage
    displayInfo(trip);
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
