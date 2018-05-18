//Aplikacja z wykorzystaniem systemu szablonów 'Pug'
var express = require('express'),
    logger = require('morgan'),
    fetch = require('fetch');
var app = express();

var minmax = [];

app.set('views', __dirname);
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));
app.get("/", function(request, response){
    var data = fetch.fetchUrl('http://api.nbp.pl/api/exchangerates/tables/A/2018-01-01/2018-02-01?format=json',(error, meta, body)=>{
            JSONobject = JSON.parse(body.toString('utf-8'));
            for (var j of JSONobject){
                for (let b of j.rates){
                        var x = {name: b.currency, min: b.mid, max: b.mid};
                        console.log(b);
                        minmax.push(x);
                    }
                }
                console.log(minmax);
                });

    //for (var i = 1, i<5,i++){
        //var zap = 'http://api.nbp.pl/api/exchangerates/tables/A/2018-01-01/2018-02-01?format=json'
        // var data = fetch.fetchUrl('http://api.nbp.pl/api/exchangerates/tables/A/2018-01-01/2018-02-01?format=json',(error, meta, body)=>{
        //         JSONobject = JSON.parse(body.toString('utf-8'));
        //         for (var j of JSONobject){
        //             for (let b of j.rates){
        //                     var x = {min: b.mid, max: j[k].mid};
        //                     minmax.push(x);
        //             /*    }else{
        //                     if (minmax[k].min > j[k]){
        //                         minmax[k] = {min: j[k], max: minmax[k].max};
        //                     }
        //                     if (minmax[k].max < j[k]){
        //                         minmax[k] = {min: minmax[k].min, max: j[k]};
        //                     } */
        //
        //             }
        //         }
                //console.log(minmax);


//        });

    //}
});

app.listen(3000, function () {
    console.log('Aplikacja jest dostępna na porcie 3000');
});
