//Brak użycia systemu szablonów
var express = require('express'),
    logger = require('morgan'),
    MongoClient = require('mongodb').MongoClient,
    bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));
var uri = "mongodb://Admin:Alamakota@localhost:27017/db1";

//POST update
//PUT create
//DELETE delete

app.get("/", function(request, response){
    console.log("Welcome to my app :P");
	response.send("Welcome to my app :P");
});
app.get("/teachers/:subject", function(request, response){
    var subj = request.params.subject;
    MongoClient.connect(uri, function(err, db) {
        const db1 = db.db('db1');
        console.log("CONNECTED!!");
        var txt = ""
        db1.collection('teachers').find({subject: subj}).toArray(function(err, results) {
            console.log(results);
            txt = results[0].name;
        });
        db1.collection('students').find({}).toArray(function(err2, results2) {
            console.log(results2);
            var list = [];
            for (e of results2) {
                list.push({name: e.name, grades: e.subjects.filter((el)=>{return el.subject_name == subj})[0].grades})
            }
            var r = {
                name: txt,
                students: list
            };
            console.log(r);
            response.send(r); 
        });
    db.close();
    });
});
app.get("/students/:name", function(request, response){
    var Sname = request.params.name;
    MongoClient.connect(uri, function(err, db) {
        const db1 = db.db('db1');
        console.log("CONNECTED!!");
        db1.collection('students').find({name: Sname}).toArray(function(err, results) {
            console.log(results);
            response.send(results);
        });
    });
});

app.delete("/teachers/:subject", function(request, response){ //działa
    console.log(request.body);
    var Sname = request.params.subject;
    MongoClient.connect(uri, function(err, db) {
        const db1 = db.db('db1');
        console.log("CONNECTED!!");
        db1.collection('students').find({name: request.body.name, "subjects.subject_name": Sname}).toArray(function(err, results) {
            console.log(results[0].subjects[0].grades);
            var list = results[0].subjects[0].grades;
            var old = request.body.oldgrade;
            list.splice(list.indexOf(old),1);

            db1.collection('students').findOneAndUpdate({name: request.body.name, "subjects.subject_name": Sname}, {
              $set: {"subjects.$.grades": list}
            }, {
              sort: {_id: -1}
            }, (err, result2) => {
              if (err) console.log(err)
              response.send(result2)
            })
        });

    });
});
app.post("/teachers/:subject", function(request, response){ //działa
    console.log(request.body);
    var Sname = request.params.subject;
    MongoClient.connect(uri, function(err, db) {
        const db1 = db.db('db1');
        console.log("CONNECTED!!");
        db1.collection('students').find({name: request.body.name, "subjects.subject_name": Sname}).toArray(function(err, results) {
            console.log(results[0].subjects[0].grades);
            var list = results[0].subjects[0].grades;
            var old = request.body.oldgrade;
            console.log(old);
            list[list.indexOf((old))] = request.body.newgrade;
            console.log(list);
            db1.collection('students').findOneAndUpdate({name: request.body.name, "subjects.subject_name": Sname}, {
              $set: {"subjects.$.grades": list}
            }, {
              sort: {_id: -1}
            }, (err, result2) => {
              if (err) console.log(err)
              response.send(result2)
            })
        });

    });
});
app.put("/teachers/:subject", function(request, response){ //działa
    console.log(request.body);
    var Sname = request.params.subject;
    MongoClient.connect(uri, function(err, db) {
        const db1 = db.db('db1');
        console.log("CONNECTED!!");
        db1.collection('students').findOneAndUpdate({name: request.body.name, "subjects.subject_name": Sname}, {
          $push: {"subjects.$.grades": request.body.newgrade}
        }, {
          sort: {_id: -1}
        }, (err, result) => {
          if (err) console.log(err)
          response.send(result)
        })
    });
});
app.listen(3001, function () {
    console.log('Aplikacja jest dostępna na porcie 3001');
});