fillTable = (tableClassName, data, dataProperties, headerNames, tableWrapperName) => {
    const origTable = $("."+tableClassName);
    if (origTable.length != null){
        origTable.remove();
    }

    // adds header
    let table = $('<table>').addClass(tableClassName);
    let header = "<tr>";
    headerNames.map( headerName => {
        header += "<th>" + headerName + "</th>";
    });
    header += "</tr>";
    table.append(header);

    // fills table body
    for (let i = 0; i < data.length; i++) {
        let row = "<tr>";
        dataProperties.map( prop => {
            row += "<td>" + data[i][prop] + "</td>";
        });
        row += "</tr>";
        table.append(row);
    }

    $(tableWrapperName).append(table);
};

nullOrEmpty = src => {
    return src == null || src === "";
};

isNumber = num => {
    return !isNaN(num);
};