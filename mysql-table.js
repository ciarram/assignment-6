var express = require('express');
var mysql = require('./dbcon.js');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 60790);
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));

//setting this up as a global variable
var newList = [];

app.get('/', function(req,res,next){
    var selectTable = {};
    console.log("In App.Get!");
    mysql.pool.query('SELECT * FROM workouts', function(err, rows, fields){
        if(err){
            next(err);
            return;
        }
        //selectTable.results = JSON.stringify(rows);
        //console.log(JSON.stringify(rows))
        rows.forEach(function(item){
            var x = item;
            newList.push(x);
            console.log("for Each Loop " + x);
        });
        selectTable.results = newList;
        res.render('home', selectTable);
    });
});
 
app.post('/', function(req,res,next){
    var insertData = {};
    var {name, reps, weight, date, unit} = req.body;
    console.log("In the App.Post " + name);
    console.log("In the App.Post " + reps);
    mysql.pool.query("INSERT INTO workouts(`name`, `reps`, `weight`, `date`, `unit`) VALUES(?, ?, ?, ?, ?)", [name, reps, weight, date, unit], function(err, result){
        if(err){
            next(err);
            return;
        }
        console.log("Data results " + result);
        insertData.results = "Inserted id " + result.insertedId;
        res.render('home',  insertData);
    })
})

app.delete('/', function(req,res,next){
    var deleteRow = {};
    mysql.pool.query("DELETE FROM workouts WHERE id=?", function(err, rows, fields){
        if(err){
            next(err);
            return;
        }
        deleteRow.results = "Deleted id " + result.deleteId
        res.render('home', deleteRow)
    })
})

app.put('/', function(req,res,next){
    var editRow = {};
    mysql.pool.query("UPDATE workouts SET name=?, reps=?, weight=?, date=?, unit=?", [req.query.name, req.query.reps, rep.query.weight, req.query.date, req.query.unit], function(err, result){
        if(err){
            next(err);
            return;
        }
        editRow.results = "Updated " + result.changedRows + " rows.";
        res.render('home', editRow);
    });
})

// added the code from the assignment page for testing
app.get('/reset-table',function(req,res,next){
    var context = {};
    console.log("In the reset function!");
    mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err){ 
      var createString = "CREATE TABLE workouts("+
      "id INT PRIMARY KEY AUTO_INCREMENT,"+
      "name VARCHAR(255) NOT NULL,"+
      "reps INT,"+
      "weight INT,"+
      "date DATE,"+
      "unit BOOLEAN)";
      mysql.pool.query(createString, function(err){
          context.results = "Table reset";
          res.render('home',context);
      })
    });
});

app.use(function(req,res){
    res.status(404);
    res.render('404');
});
  
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
});
  
app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});