fillManufacturerTable = () => {
    // REST call
    $.get("manufacturers", (data, status) => {
        if (status === "success" && data != null){
            fillTable("manufacturers-table",
                data,
                ["name", "country", "founded"],
                ["Name", "Country", "Founded"],
                "#manufacturers-table-wrapper");

        }
    });
};


addManufacturers = () => {
    // get data from form
    const data = $("#add-manufacturers-form").serializeArray();
    let newManufacturer = {};
    let emptyData = false;

    // parses data from form
    data.forEach( item => {
        if (nullOrEmpty(item.value)){
            emptyData = true;
        }
        newManufacturer[item.name] = item.value;
    });

    const finalDate = checkDateFormatAndConvert(newManufacturer.founded);
    if (finalDate == null){
        return;
    } else {
        newManufacturer.founded = finalDate;
    }


    // REST call
    if (!emptyData){
        $.post("addManufacturers", newManufacturer)
            .done(function() {
                fillManufacturerTable();
            })
            .fail(function() {
                alert("Manufacturer already exists");
            });
    }
};


checkDateFormatAndConvert = src => {
    const monthLength = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const date = src.split(".");
    if (date.length < 3){
        alert("Wrong date input");
        return null;
    }
    const year = date[0];
    const month = date[1];
    const day = date[2];

    if (!isNumber(year) || year < 1800 || year > new Date().getFullYear()){
        alert("Invalid year");
        return null;
    }
    if (!isNumber(month) || month < 1 || month > 12){
        alert("Invalid month");
        return null;
    }
    if (!isNumber(day) || day < 1 || day > monthLength[month-1]){
        alert("Invalid day");
        return null;
    }

    let monthName = "";
    switch (Number(month)) {
        case 1:
            monthName = "January";
            break;
        case 2:
            monthName = "February";
            break;
        case 3:
            monthName = "March";
            break;
        case 4:
            monthName = "April";
            break;
        case 5:
            monthName = "May";
            break;
        case 6:
            monthName = "June";
            break;
        case 7:
            monthName = "July";
            break;
        case 8:
            monthName = "August";
            break;
        case 9:
            monthName = "September";
            break;
        case 10:
            monthName = "October";
            break;
        case 11:
            monthName = "November";
            break;
        case 12:
            monthName = "December";
            break;
        default:
            break;
    }
    return monthName + " " + day + ", " + year;
};
