var express = require('express'),
    logger = require('morgan');
//JSON file
var o = require('./o.json');

var app = express();

function calc(object) {
    var k;
    switch (object.op) {
        case "+":
            return parseFloat(object.num1) + parseFloat(object.num2);
            break;
        case "-":
            return parseFloat(object.num1) - parseFloat(object.num2);
            break;
        case "*":
            return parseFloat(object.num1) * parseFloat(object.num2);
            break;
        case "/":
            if (parseFloat(object.num1)==0) return 0;
            return parseFloat(object.num1) / parseFloat(object.num2);
            break;
        default:
            return 0;
    }
}

app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));
app.get("/", function(request, response){
	response.send(JSON.stringify({request: o, response: calc(o)}));
});
app.get("/:op/:num1/:num2", function(request, response){
    var o2 = {
        op: request.param('op'),
        num1: request.param('num1'),
        num2: request.param('num2')
        }
    response.send(JSON.stringify({request: o2, response: calc(o2)}));
});

app.listen(3000, function () {
    console.log('Aplikacja jest dostępna na porcie 3000');
});
