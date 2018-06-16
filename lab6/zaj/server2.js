var http = require ("http");
var url = require ("url");
var fs = require ("fs");
var plik = 'formularz.html';

var get_op = ()=>{

}

http.createServer (function (request, response) {
    console.log("--------------------------------------");
    console.log("Względny adres URL bieżącego żądania: " + request.url + "\n");

    var url_parts = url.parse(request.url, true);
    if (url_parts.pathname == '/point') {
      response.writeHead(200, {"Content-Type": "application/json; charset=utf-8"});
      c = 'rgb('+parseInt(Math.random() * (255))+', '+parseInt(Math.random() * (255))+', '+parseInt(Math.random() * (255))+')'
      var obj = {
          x: parseInt(Math.random() * (500)),
          y: parseInt(Math.random() * (500)),
          color: c
      }
      response.write(JSON.stringify(obj));
      response.end();
      console.log("Serwer wysłał do przeglądarki jsona");
    }
    else {
        fs.stat('index.html', function (err,stats) {
          if (err == null) {
              fs.readFile ("index.html", function (err, data) {
                response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
                response.write(data);
                response.end();
              });
          }
          else {
              response.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
              response.write('Plik nie istnieje');
              response.end();
          }
        });
    }
}).listen(8080);

console.log("Uruchomiono serwer na porcie 8080");
console.log("Aby zakończyć działanie serwera, naciśnij 'CTRL+C'");
