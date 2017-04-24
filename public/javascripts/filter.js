/**
 * Created by Synne on 24.04.2017.
 */

function filterMarkers(){
    checkedMarkers = new Array();
    clearMap();
    firstIteration = true;

    if(document.getElementById("activityCB").checked){
        setPointsOnMap(categories[0]);
        document.getElementById("activity").className = "categories canBeClicked showList";
        document.getElementById("activity_list").className = "hideThis";
        console.log("Adding eventlistener");
        if(!document.getElementById("activity").getAttribute("class").includes("showList")){
            document.getElementById("activity").addEventListener("click", function(){
                console.log("add");
                enableToggle(event.target)
            });
        }


    }else{
        document.getElementById("activity").className = "categories  makeShowLess";
        document.getElementById("activity_list").className = "hideThis";
        console.log("Removing event listener");
        document.getElementById("activity").removeEventListener("click", function(){
            enableToggle(event.target)
            console.log("remove");
        });
    }
    if(document.getElementById("attractionCB").checked){
        setPointsOnMap(categories[1]);
        document.getElementById("attractions").className = "categories canBeClicked showList";
        document.getElementById("attractions_list").className = "";
        if(!document.getElementById("attractions").getAttribute("class").includes("showList")){
            document.getElementById("attractions").addEventListener("click", function(){
                enableToggle(event.target)
                console.log("add");
            });
        }

    }else{
        document.getElementById("attractions").className = "categories  makeShowLess";
        document.getElementById("attractions_list").className = "hideThis";
        document.getElementById("attractions").removeEventListener("click", function(){
            enableToggle(event.target)
            console.log("remove");
        });
    }
    if(document.getElementById("hotelCB").checked){
        setPointsOnMap(categories[2]);
        document.getElementById("hotels").className = "categories canBeClicked showList";
        document.getElementById("hotels_list").className = "";
        if(!document.getElementById("hotels").getAttribute("class").includes("showList")){
            document.getElementById("hotels").addEventListener("click", function(){
                enableToggle(event.target)
                console.log("add");
            });
        }

    }else{
        document.getElementById("hotels").className = "categories  makeShowLess";
        document.getElementById("hotels_list").className = "hideThis";
        document.getElementById("hotels").removeEventListener("click", function(){
            enableToggle(event.target)
            console.log("remove");
        });
    }
    if(document.getElementById("restaurantCB").checked){
        setPointsOnMap(categories[4]);
        document.getElementById("restaurants").className = "categories canBeClicked showList";
        document.getElementById("restaurants_list").className = " ";
        if(!document.getElementById("restaurants").getAttribute("class").includes("showList")){
            document.getElementById("restaurants").addEventListener("click", function(){
                enableToggle(event.target)
                console.log("add");
            });
        }

    }else{
        document.getElementById("restaurants").className = "categories  makeShowLess";
        document.getElementById("restaurants_list").className = "hideThis";
        document.getElementById("restaurants").removeEventListener("click", function(){
            enableToggle(event.target)
            console.log("remove");
        });
    }
    if(document.getElementById("shoppingCB").checked){
        setPointsOnMap(categories[3]);
        document.getElementById("shopping").className = "categories canBeClicked showList";
        document.getElementById("shopping_list").className = "";
        if(!document.getElementById("shopping").getAttribute("class").includes("showList")){
            document.getElementById("shopping").addEventListener("click", function(){
                enableToggle(event.target)
                console.log("add");
            });
        }

    }else{
        document.getElementById("shopping").className = "categories  makeShowLess";
        document.getElementById("shopping_list").className = "hideThis";
        document.getElementById("shopping").removeEventListener("click", function(){
            enableToggle(event.target)
            console.log("remove");
        });
    }
    if(document.getElementById("transportationCB").checked){
        setPointsOnMap(categories[5]);
        document.getElementById("transportation").className = "categories canBeClicked showList";
        document.getElementById("transportation_list").className = "";
        if(!document.getElementById("transportation").getAttribute("class").includes("showList")){
            document.getElementById("transportation").addEventListener("click", function(){
                enableToggle(event.target)
                console.log("add");
            });
        }

    }else{
        document.getElementById("transportation").className = "categories  makeShowLess";
        document.getElementById("transportation_list").className = "hideThis";
        document.getElementById("transportation").removeEventListener("click", function(){
            enableToggle(event.target)
            console.log("remove");
        });
    }
    if(document.getElementById("otherCB").checked){
        setPointsOnMap(categories[6]);
        document.getElementById("other").className = "categories canBeClicked showList";
        document.getElementById("other_list").className = "";
        if(!document.getElementById("other").getAttribute("class").includes("showList")){
            document.getElementById("other").addEventListener("click", function(){
                enableToggle(event.target)
                console.log("add");
            });
        }

    }else{
        document.getElementById("other").className = "categories  makeShowLess";
        document.getElementById("other_list").className = "hideThis";
        document.getElementById("other").removeEventListener("click", function(){
            enableToggle(event.target)
            console.log("remove");
        });
    }
    if(document.getElementById("allCB").checked){
        for (var i = 0; i < categories.length; i++) {
            setPointsOnMap(categories[i]);
            document.getElementById("activity").className = "categories canBeClicked showList";
            document.getElementById("attractions").className = "categories canBeClicked showList";
            document.getElementById("hotels").className = "categories canBeClicked showList";
            document.getElementById("restaurants").className = "categories canBeClicked showList";
            document.getElementById("shopping").className = "categories canBeClicked showList";
            document.getElementById("transportation").className = "categories canBeClicked showList";
            document.getElementById("other").className = "categories canBeClicked showList";

            document.getElementById("activity_list").className = "";
            document.getElementById("attractions_list").className = "";
            document.getElementById("hotels_list").className = "";
            document.getElementById("restaurants_list").className = "";
            document.getElementById("shopping_list").className = "";
            document.getElementById("transportation_list").className = "";
            document.getElementById("other_list").className = "";

        }
    }
    else{
        console.log(checkedMarkers);
        setPointsOnMap(checkedMarkers, false);
    }



    $('#modalFilter').modal('toggle');
}

function clearMap(){ 
    //mymap.removeLayer(markersOnMap);
    for(var i = 0; i < markersOnMap.length; i++) {
        mymap.removeLayer(markersOnMap[i]);
    }
}