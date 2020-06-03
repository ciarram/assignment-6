var express = require('express');
var mysql = require('./dbcon.js');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 60790);
app.use(express.static('public'));

app.get('/', function(req,res,next){
    var selectTable = {};
    mysql.pool.query('SELECT * FROM workouts', function(err, rows, fields){
        if(err){
            next(err);
            return;
        }
        selectTable.results = JSON.stringify(rows);
        res.render('home', selectTable);
    });
});

app.get('/', function(req,res,next){
    var insetData = {};
    mysql.pool.query("INSERT INTO workouts(`name`, `reps`, `weight`, `date`, `lbs`) VALUES(?, ?, ?, ?, ?)", [req.query.name, req.query.reps, req.query.weight, req.query.date, req.query.lbs], function(err, result){
        if(err){
            next(err);
            return;
        }
        console.log(insertData.results);
        res.render('home',insertData);
    })
})

app.get('/', function(req,res,next){
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

app.get('/', function(req,res,next){
    var editRow = {};
    mysql.pool.query("UPDATE workouts SET name=?, reps=?, weight=?, date=?, lbs=?", [req.query.name, req.query.reps, rep.query.weight, req.query.date, req.query.lbs], function(err, result){
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
    mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err){ 
      var createString = "CREATE TABLE workouts("+
      "id INT PRIMARY KEY AUTO_INCREMENT,"+
      "name VARCHAR(255) NOT NULL,"+
      "reps INT,"+
      "weight INT,"+
      "date DATE,"+
      "lbs BOOLEAN)";
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