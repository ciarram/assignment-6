// handles when the submit button in the form is clicked

document.addEventListener('DOMContentLoaded', insertRow);

function insertRow(){
    document.getElementById("addToTable").addEventListener('click', function(event){
        var req = new XMLHttpRequest();
        var newRow = {name:document.getElementById("newName").value, reps:document.getElementById("newRep").value, weights:document.getElementById("newWeight").value, date:document.getElementById("newDate").value, unit:document.getElementById("newUnit").value}

        req.open('POST', 'http://httpbin.org/post', true);
        req.setRequestHeader('Content-Type', 'application/json');

        console.log(JSON.stringify(newRow));
        req.send(JSON.stringify(newRow));

        event.preventDefault();
    });
}