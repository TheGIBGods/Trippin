/**
 * Created by Guro on 06.04.2017.
 */



function createTimeline(pointsAll, trip) {
    //console.log("Creating timeline with points: ");
    //console.log(pointsAll);
    var points = pointsAll.filter(p => (checkDate(p.date) == 1));
    //console.log(points);

    var fromdate = trip.fromdate;
    var todate = trip.todate;

    var numDays = countDays(fromdate,todate);
    console.log("numDays; " + numDays);

    var numTables = 1;
    var counter = 7;
    if (numDays > 7){
        document.getElementById("timeTable2").className = "showTable";
        numTables = 2;
    }
    if(numDays > 14){
        document.getElementById("timeTable3").className = "showTable";
        numTables =3;
    }

    document.getElementById("timeHead").innerHTML = "Tidslinje for " + trip.name;
    var theday = fromdate;

    for (j=1; j<numTables+1; j++){
    console.log("j is: " + j);
        for( i=0; i< counter;i++){
            //console.log("creating elements for points in ")
            //console.log(points);
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
                //console.log(points[x].date)
                if(points[x].date == theday){
                    //console.log(points[x].category)
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
        console.log("counter is: " + counter);
    }





    /*var d = document.createElement("tr");
    d.setAttribute("id", "days");
    document.getElementById("tableBody").appendChild(d);

    var h = document.createElement("tr");
    d.setAttribute("id", "hotels");
    document.getElementById("days").after(h);*/



};;

function countDays(fromdate, todate) {
    var from = getDateFromString(fromdate);
    var to = getDateFromString(todate);

    var timeDiff = Math.abs(from.getTime() - to.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    //console.log("Day between: " + diffDays);
    //console.log(from.getFullYear());
    return diffDays;
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
