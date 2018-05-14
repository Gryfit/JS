//Brak użycia systemu szablonów
var express = require('express'),
    logger = require('morgan');
var app = express();
var x = 1;
var y = 2;

app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));
app.get("/", function(request, response){
	response.send("");
});
app.get("/add/:num1/:num2", function(request, response){
	var n1 = parseFloat(request.params.num1); 
	var n2 = parseFloat(request.params.num2); 
	var sum = n1 + n2;
    var out = "<h1>" + n1.toString() + " +  " + n2.toString() + " = " + sum.toString() + "</h1>";
	response.send(out);
});

app.listen(3000, function () {
    console.log('Aplikacja jest dostępna na porcie 3000');
});
