/**
 * Created by Guro on 06.04.2017.
 */

function createTimeline(pointsAll, trip) {
    var points = pointsAll.filter(p => (checkDate(p.date) == 1));

    var fromdate = trip.fromdate;
    var todate = trip.todate;

    var numDays = countDays(fromdate,todate) +1;

    var numTables = Math.ceil(numDays/7);


    //Creating the tables for the trip
    for (i=1; i < numTables ; i++) {
        var number = i + 1;
        var table = document.createElement("table");
        table.setAttribute("id", "timeTable" + number);
        var tbody = document.createElement("tbody");
        tbody.setAttribute("id", "tableBody" + number);
        table.append(tbody);

        var days = document.createElement("tr");
        days.setAttribute("id", "days" + number);
        days.setAttribute("class", "topRow");
        tbody.append(days);
        var dayInfo = document.createElement("td");
        dayInfo.innerHTML = "Dag"
        dayInfo.setAttribute("class", "rowInfo");
        days.append(dayInfo);

        var hotels = document.createElement("tr");
        hotels.setAttribute("id", "hotels" + number);
        hotels.setAttribute("class", "hotels");
        tbody.append(hotels);
        var hotelInfo = document.createElement("td");
        hotelInfo.innerHTML = "Hotell"
        hotelInfo.setAttribute("class", "rowInfo");
        hotels.append(hotelInfo);

        var restaurants = document.createElement("tr");
        restaurants.setAttribute("id", "restaurants" + number);
        restaurants.setAttribute("class", "restaurants");
        tbody.append(restaurants);
        var resturatnsInfo = document.createElement("td");
        resturatnsInfo.innerHTML = "Spise"
        resturatnsInfo.setAttribute("class", "rowInfo");
        restaurants.append(resturatnsInfo);

        var todo = document.createElement("tr");
        todo.setAttribute("id", "todo" + number);
        todo.setAttribute("class", "todo");
        tbody.append(todo);
        var todoInfo = document.createElement("td");
        todoInfo.innerHTML = "Gjøre"
        todoInfo.setAttribute("class", "rowInfo");
        todo.append(todoInfo);

        $("#timeTable" + i).after(table);

    }

    var counter = 7;

    //Creating header for the timeline, with link to mapPage.
    document.getElementById("timeHead").innerHTML = ""//"Tidslinje for " + trip.name;
    var a = document.createElement("a");
    a.innerHTML = "Tidslinje for " + trip.name;
    a.className = "canBeClicked";
    a.addEventListener("click", function () {
        window.location = "/views/mapPage.html?" + getUserFromURL() + "?" + trip._id;
    });
    $("#timeHead").append(a);

    //Adding the points
    var theday = fromdate.replace(/ /g,'')
    var last;
    if(numDays < 7){
        last = numDays;
    }else{
        last = 7;
    }

    for (j=1; j<numTables+1; j++){ //For each table (each "row" of 7) add points
        for( i=0; i< last;i++){ //For the given table, the for-loop goes through all 7 days
            var d = document.createElement("td");
            d.setAttribute("id", "day-" + j+"-" + i);
            d.innerHTML = theday;

            var h = document.createElement("td");
            h.setAttribute("id", "hot-" + j+"-" + i);
            h.setAttribute("class", "gotPoints")

            var r = document.createElement("td");
            r.setAttribute("id", "res-" + j+"-" + i);
            r.setAttribute("class", "gotPoints")

            var t = document.createElement("td");
            t.setAttribute("id", "todo-" + j+"-" + i);
            r.setAttribute("class", "gotPoints")

            $("#days"+j).append(d);
            $("#hotels"+j).append(h);
            $("#restaurants"+j).append(r);
            $("#todo"+j).append(t);


            for(x in points){
                //console.log(points[x]);
                console.log(theday);
                if (includesDay(points[x].date,points[x].date2, theday)){//(points[x].date == theday){
                    switch(points[x].category){
                        case "hotel":
                            var hot = document.createElement("div");
                            hot.className = "hoteldiv";
                            hot.innerHTML = points[x].name;
                            $("#hot-" + j+"-" + i).append(hot);
                            break;
                        case "restaurant":
                            var res = document.createElement("div");
                            res.className = "restaurantdiv";
                            res.innerHTML = points[x].name;
                            $("#res-" + j+"-" + i).append(res);
                            break;
                        case "activity":
                        case "transportation":
                        case "attraction":
                        case "shopping":
                        case "other":
                            var tod = document.createElement("div");
                            tod.className = "tododiv";
                            tod.innerHTML = points[x].name;
                            $("#todo-" + j+"-" + i).append(tod);
                            break
                    }
                }
            }



            theday = incrementDay(theday);
        }

        counter = numDays -7*j;
        if(counter<7){
            last = counter;
        }
    }

}



function includesDay(from, to, day) {
    try{
        if (!checkDate(to)){
            if(from == day){
                console.log("is included")
                return true;
            }else {
                console.log("false1, from: " + from + ", day: " + day+".");
                return false;
            }
        }
    } catch(err){
        if(from == day){
            console.log("is included");
            return true;
        }else {
            console.log("false2");
            return false;
        }
    }



    var a = countDays(from, to);
    var b = from;
    for(u =0; u < a+1; u++){
        if(b == day){
            console.log("is included")
            return true;
        }
        b = incrementDay(b);
    }
    console.log("false3");
    return false;
}


function countDays(fromdate, todate) {
    //var from = getDateFromString(fromdate);
    //var to = getDateFromString(todate);
    var date = fromdate;
    var count = 0;
    while(date != todate){
        count++;
        date = incrementDay(date);
    }
    return(count);
}

function getDateFromString(s) {
    var a = s.toString().split("/");
    return new Date(a[2], a[1], a[0]);

}

function checkDate(date) {
    return date.length == 10;
}

function incrementDay(date) {
    var a = date.toString().split("/");
    var day = Number(a[0]);
    var month = Number(a[1]);
    var year = Number(a[2]);

    if(daysInMonth(month,year) == day){
        if(month == 12){
            year = year +1;
            month = 1;
            day = 1;
        }else{
            day = 1;
            month = month +1;
        }
    }else{
        day = day +1;
    }

    if(day < 10){
        if(month <10){
            return "0"+day+"/0"+month+"/"+year;
        }else {
            return "0"+day+"/"+month+"/"+ year;
        }
    }else{
        if(month< 10){
            return ""+day+"/0"+month+"/"+ year;
        }else{
            return ""+day+"/"+month+"/"+ year;
        }

    }
}

function daysInMonth(month, year) {
    switch (month){
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            return 31;
        case 4:
        case 6:
        case 9:
        case 11:
            return 30;
        case 2:
            if(isLeapYear(year)){
                return 29;
            }else{
                return 28;
            }
    }
}

function isLeapYear(year) {
    if(year%4 == 0){
        if(year%100 == 0 && year%400==0){
            return true;
        }else if(year%100 == 0){
            return false;
        }else{
            return true
        }
    }else{
        return false;
    }
}


