const fs = require('fs');

const http = require('http');
const url = require('url');

http.createServer((request, response) => {
  /*
      ,,request''  - strumień wejściowy - zawiera dane otrzymane od przeglądarki, np. zakodowaną zawartość pól formularza HTML

      ,,response'' - strumień wyjściowy - umieszcza się w nim dane, które chcemy odesłać przeglądarce.
        Odpowiedź, wysyłana za pomocą tego strumienia, musi się składać z dwóch części: nagłówka oraz ciała.
        W nagłówku umieszcza się, m.in., informację o typie (MIME) danych  zawartych w ciele.
        W ciele umieszcza się właściwe dane, np. definicję formularza.
    */
  console.log('--------------------------------------');
  console.log(`Względny adres URL bieżącego żądania: ${request.url}\n`);
  const urlParts = url.parse(request.url, true);

  if (urlParts.pathname === '/submit') {
    const path = urlParts.query.path;
    console.log('Tworzenie nagłówka odpowiedzi');
    response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    console.log('Tworzenie ciała odpowiedzi');

    fs.exists(__dirname.concat(path), (exists) => {
      if (exists) {
        fs.stat(__dirname.concat(path), (err, stat) => {
          if (err) {
            console.log(err);
          }
          if (stat.isDirectory()) {
            response.write('It\'s a directory!\n');
          } else if (stat.isFile()) {
            response.write('It\'s a file\n');
            fs.readFile(__dirname.concat(path), 'utf8', (err2, contents) => {
              if (err2) {
                console.log(err2);
              }
              response.write(contents);
              response.end();
            });
          } else {
            response.write('I don\'t know what it is -.-');
          }
        });
      }
    });

    console.log('Wysyłanie odpowiedzi');
  } else { // Generowanie formularza
    console.log('Tworzenie nagłówka odpowiedzi');
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    console.log('Tworzenie ciała odpowiedzi');
    response.write('<form method="GET" action="/submit">');
    response.write('<label for="path">Podaj ścierzke</label>');
    response.write('<input name="path">');
    response.write('<br>');
    response.write('<input type="submit">');
    response.write('<input type="reset">');
    response.write('</form>');
    response.end();
    console.log('Wysyłanie odpowiedzi');
  }
}).listen(8083);
console.log('Uruchomiono serwer na porcie 8080');
console.log("Aby zakończyć działanie serwera, naciśnij 'CTRL+C'");
