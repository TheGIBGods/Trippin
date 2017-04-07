/**
 * Created by Brage on 03-Apr-17.
 */
function setDatePickers(fromdate, todate) {

    if(fromdate != null && todate != null) {


        var from = moment(fromdate, "DD/MM/YYYY");
        var to = moment(todate, "DD/MM/YYYY");

        console.log(from);

        $("#datepicker").pikaday({
            defaultDate: moment(fromdate, "DD/MM/YYYY").toDate(),
            firstDay: 1,
            format: "DD/MM/YYYY"
        });
        $("#datepickerEdit").pikaday({
            defaultDate:moment(fromdate, "DD/MM/YYYY").toDate(),
            firstDay: 1,
            format: "DD/MM/YYYY"
        });

        $("#tripFromDateEdit").pikaday({
            defaultDate: moment(fromdate, "DD/MM/YYYY").toDate(),
            firstDay: 1,
            format: "DD/MM/YYYY"
        });

        $("#tripToDateEdit").pikaday({
            defaultDate: moment(todate, "DD/MM/YYYY").toDate(),
            firstDay: 1,
            format: "DD/MM/YYYY"
        });


    }


    else {

        $("#datepickerEdit").pikaday({
            defaultDate: new Date(),
            firstDay: 1,
            format: "DD/MM/YYYY"
        });

        $("#tripFromDateEdit").pikaday({
            defaultDate: new Date(),
            firstDay: 1,
            format: "DD/MM/YYYY"
        });

        $("#tripToDateEdit").pikaday({
            defaultDate: new Date(),
            firstDay: 1,
            format: "DD/MM/YYYY"
        });


        $("#datepicker").pikaday({
            setdefaultDate: new Date(),
            firstDay: 1,
            format: "DD/MM/YYYY"
        });
    }


}
$("#fromDate").pikaday({
    defaultDate: new Date(),
    firstDay: 1,
    format: "DD/MM/YYYY"
});

$("#toDate").pikaday({
    defaultDate: new Date(),
    firstDay: 1,
    format: "DD/MM/YYYY"
});


