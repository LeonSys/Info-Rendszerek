fillCarTable = () => {
    // REST call
    $.get("cars", (data, status) => {
        if (status === "success" && data != null){
            // if REST call was successful, fills table with new data
            fillTable("cars-table",
                data,
                ["name", "consumption", "color", "manufacturer", "year", "available", "horsepower"],
                ["Name", "Consumption", "Color", "Manufacturer", "Year", "Available", "Horsepower"],
                "#cars-table-wrapper");
        }
    });
};


addCar = () => {
    // get data from form
    const data = $('#add-cars-form').serializeArray();
    let newCar = {};
    let emptyData = false;
    // parses data from form
    data.forEach( item => {
        if (nullOrEmpty(item.value)){
            emptyData = true;
        }
        newCar[item.name] = item.value;
    });

    // input checking
    if (!isNumber(newCar.consumption)){
        alert("Wrong consumption input");
        return;
    }
    if (!isNumber(newCar.year) ||
        newCar.year < 1800 ||
        newCar.year > new Date().getFullYear()
    ){
        alert("Wrong year input");
        return;
    }
    if (!isNumber(newCar.available)){
        alert("Wrong availability input");
        return;
    }
    if (!isNumber(newCar.horsepower)){
        alert("Wrong horsepower input");
        return;
    }

    // add liter per 100 km to consumption
    newCar.consumption += "l/100km";

    // REST call
    if (!emptyData){
        $.post("addCar", newCar)
            .done(function() {
                fillCarTable();
                $(".add-cars-form input").val("");
            })
            .fail(function() {
                alert("Car already exists");
            });
    } else {
        alert("Missing data");
    }
};
