// handles when the submit button in the form is clicked

document.addEventListener('DOMContentLoaded', insertRow);

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
    var removeRow = {id:document.getElementById("deleteId").value}

    // loops through the table to find the id to delete
    for (var i = 0; i < countRow; i++){
        
        var row = removeTable.rows[i];

        if (row==currentRow.parentNode.parentNode){
            if (countRow <= 1){
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