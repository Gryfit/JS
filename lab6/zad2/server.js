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
    if (url_parts.pathname == '/nums') {
      response.writeHead(200, {"Content-Type": "application/json; charset=utf-8"});
      var Op = "+";
      switch (parseInt(Math.random()*(4))) {
          case 0:
              Op =  "+"
              break
          case 1:
              Op = "-"
              break
          case 2:
              Op = "/"
              break
          case 3:
              Op = "*"
              break
      }
      console.log(Op);
      var obj = {
          num1: parseInt(Math.random() * (10)),
          num2: parseInt(Math.random() * (10)),
          op: Op
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
