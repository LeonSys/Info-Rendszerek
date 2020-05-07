function load_home() {
    document.getElementById("").innerHTML='<object type="text/html" data="../pages/AddManufacturer.html" ></object>';
}

load_pageManufacturer = () => {
    $('#MainPage').load("../pages/AddManufacturer.html");
}

load_pageCars = () => {
    $('#MainPage').load("../pages/AddCar.html");
}

load_homePage = () => {
    $('#MainPage').load("../pages/homePage.html");
}

