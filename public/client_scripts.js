// handles when the submit button in the form is clicked

document.addEventListener('DOMContentLoaded', insertRow);
document.addEventListener('DOMContentLoaded', reAddTable);
var changeId;

function insertRow(){
    document.getElementById("addToTable").addEventListener('click', function(event){
        var req = new XMLHttpRequest();
        var newRow = {name:document.getElementById("newName").value, reps:document.getElementById("newRep").value, weight:document.getElementById("newWeight").value, date:document.getElementById("newDate").value, unit:document.getElementById("newUnit").value}

        req.open('POST', 'http://localhost:60790/', true);
        req.setRequestHeader('Content-Type', 'application/json');

        console.log("In Static JSON " + JSON.stringify(newRow));
        req.send(JSON.stringify(newRow));

        event.preventDefault();
    });
}

// handles when a delete button is pushed
function deleteRow(tableId, currentRow){

    var removeTable = document.getElementById("exerciseTable");
    var countRow = removeTable.rows.length;
    var req = new XMLHttpRequest();
    var removeRow = {id:document.getElementById("deleteId").innerHTML}
    console.log("Remove Row " + removeRow);

    // loops through the table to find the id to delete
    for (var i = 0; i < countRow; i++){
        
        var row = removeTable.rows[i];

        if (row==currentRow.parentNode.parentNode){
            if (countRow <= 0){
                break;
            }
            removeTable.deleteRow(i);
            countRow--;
            i--;
            req.open('DELETE', 'http://localhost:60790/', true);
            req.setRequestHeader('Content-Type', 'application/json');
            console.log("In the static delete function!")
            req.send(JSON.stringify(removeRow));

            event.preventDefault();
        };
    };
}

// displays the form for the edit button
function showEditForm(tableId, currentRow){
    var values = editRow(currentRow);
    var editTable = document.getElementById("updateTableForm").style.display = "block";
    document.getElementById("updateName").value = values[1];
    document.getElementById("updateRep").value = values[2];
    document.getElementById("updateWeight").value = values[3];
    document.getElementById("updateDate").value = values[4];
    if(values[5] === 1){
        document.getElementById("updateUnit1").checked = true;
        document.getElementById("updateUnit2").checked = false;
    } else{
        document.getElementById("updateUnit1").checked = false;
        document.getElementById("updateUnit2").checked = true;
    } 

}

function editRow(updateCell){
    var updateRow = document.getElementById("exerciseTable");
    var rowCount = updateRow.rows.length;
    var readRow = {id:document.getElementById("deleteId").innerHTML}
    JSON.stringify(readRow);
    var editList = [];
    console.log("In edit row" + readRow);

    for (var e = 0; e < rowCount; e++){

        var newInfo = updateRow.rows[e];

        if (newInfo==updateCell.parentNode.parentNode){
            if(rowCount <=0){
                break;
            }
            console.log("Rows matched");
            changeId = updateRow.rows[e].cells[0].innerHTML;
            for(var x = 0; x < updateRow.rows[e].cells.length - 2; x++){
                console.log("In the second for loop " + updateRow.rows[e].cells[x].innerHTML);
                editList.push(updateRow.rows[e].cells[x].innerHTML);
                
            };
        };
    };
    console.log(editList);
    return editList;
}

function reAddTable(){
    
    var req = new XMLHttpRequest();
    var resetRow = {name:document.getElementById("updateName").value, reps:document.getElementById("updateRep").value, weight:document.getElementById("updateWeight").value, date:document.getElementById("updateDate").value, unit:document.getElementById("updateUnit1").value, id:changeId}

    req.open('PUT', 'http://localhost:60790/', true);
    req.setRequestHeader('Content-Type', 'application/json');

    console.log("In the reAddRow" + JSON.stringify(resetRow));
    req.send(JSON.stringify(resetRow));
    document.getElementById("updateTableForm").style.display = "none";
    event.preventDefault();
}