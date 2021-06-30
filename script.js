let userArray = []; //for Storing table data in localStorage

function onformSubmit() { //After clicking Submit Button
    let formData = readformData();
    if (true) {
        storeData(formData);
    }
    resetForm();
}

function readformData() { //Get data from input-box
    let formData = {};
    formData["fname"] = document.getElementById('fname').value;
    formData["lname"] = document.getElementById('lname').value;
    formData["degree"] = document.getElementById('degree').value;
    formData["sdegree"] = document.getElementById('sdegree').value;
    formData["dob"] = document.getElementById('dob').value;
    formData["emailid"] = document.getElementById('emailid').value;
    formData["pnumber"] = document.getElementById('pnumber').value;
    return formData;
}

function resetForm() { // Empty input-box
    document.getElementById('fname').value = "";
    document.getElementById('lname').value = "";
    document.getElementById('degree').value = "";
    document.getElementById('sdegree').value = "";
    document.getElementById('dob').value = "";
    document.getElementById('emailid').value = "";
    document.getElementById('pnumber').value = "";
    selectedRow = null;
}


function storeData(formData) {  // for save and get data in localstorage
    let userList = {
        "firstname": formData.fname,
        "lastname": formData.lname,
        "degree": formData.degree,
        "sdegree": formData.sdegree,
        "dob": formData.dob,
        "email": formData.emailid,
        "pnumber": formData.pnumber
    };
    if (localStorage.getItem('userArray') == null) {
        localStorage.setItem('userArray', '[]');
    }
    let users = JSON.parse(localStorage.getItem('userArray'))
    users.push(userList);

    localStorage.setItem('userArray', JSON.stringify(users));
    if (localStorage.getItem('userArray') != null) {
        console.log(JSON.parse(localStorage.getItem('userArray')));
    }
}

var alluserList = JSON.parse(localStorage.getItem("userArray")); //calling data from localStorage
console.log(alluserList);


var state = { // Fetching data from localStorage
    'querySet': alluserList,
    'page': 1,
    'rows': 5,
    'window': 5,
}

buildTable();

/*
1 - Loop Through Array & Access each value
2 - Create Table Rows & append to table
*/


function pagination(querySet, page, rows) { //For pagination

    var trimStart = (page - 1) * rows
    var trimEnd = trimStart + rows

    var trimmedData = querySet.slice(trimStart, trimEnd)

    var pages = Math.round(querySet.length / rows);

    return {
        'querySet': trimmedData,
        'pages': pages,
    }
}

function pageButtons(pages) { // Pagination button function
    var wrapper = document.getElementById('pagination-wrapper')

    wrapper.innerHTML = ``
    console.log('Pages:', pages)

    var maxLeft = (state.page - Math.floor(state.window / 2))
    var maxRight = (state.page + Math.floor(state.window / 2))

    if (maxLeft < 1) {
        maxLeft = 1
        maxRight = state.window
    }

    if (maxRight > pages) {
        maxLeft = pages - (state.window - 1)

        if (maxLeft < 1) {
            maxLeft = 1
        }
        maxRight = pages
    }

    for (var page = maxLeft; page <= maxRight; page++) {
        wrapper.innerHTML += `<button value=${page} class="page btn btn-sm btn-info">${page}</button>`
    }

    if (state.page != 1) {
        wrapper.innerHTML = `<button value=${1} class="page btn btn-sm btn-info">&#171; First</button>` + wrapper.innerHTML
    }

    if (state.page != pages) {
        wrapper.innerHTML += `<button value=${pages} class="page btn btn-sm btn-info">Last &#187;</button>`
    }

    $('.page').on('click', function () {
        $('#table-body').empty()

        state.page = Number($(this).val())

        buildTable()
    })

}


function buildTable() { // Function for building Table
    var table = $('#table-body')

    var data = pagination(state.querySet, state.page, state.rows)
    var myList = data.querySet

    for (var i = 1 in myList) { // Print row in table
        //Keep in mind we are using "Template Litterals to create rows"
        var row = `<tr>
              <td>${myList[i].firstname}</td>
              <td>${myList[i].lastname}</td>
              <td>${myList[i].degree}</td>
              <td>${myList[i].sdegree}</td>
              <td>${myList[i].dob}</td>
              <td>${myList[i].email}</td>
              <td>${myList[i].pnumber}</td>
              `
        table.append(row)
    }

    pageButtons(data.pages)
}

function sortTable() { // For Sorting table
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("our-table");
    switching = true;
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /*Loop through all table rows (except the
        first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
            one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[0];
            y = rows[i + 1].getElementsByTagName("TD")[0];
            //check if the two rows should switch place:
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                //if so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
            and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}