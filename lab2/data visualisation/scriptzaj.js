//ile jest wyrazów dluosci n
//ile jest wyrazów;

var counterLenN=0;
var WordsMap= new Map();

function dothething() {
  lenN()
  words()
  console.log(WordsMap)
  document.getElementById("output").innerHTML = counterLenN + " "+ WordsMap
  draw()
}

function lenN(){
  var form = document.forms[0];
  var str = form.pole.value;
  var key = parseInt(form.n.value);
  counterLenN = str.split("\n").reduce((acc, x) => acc.concat(x.split(" ")), []).reduce((acc, x) => acc += (x.length==key)? 1:0,0)
}
function words(){
  var form = document.forms[0];
  var str = form.pole.value;
  var key = form.wyraz.value;
  var value = str.split("\n").reduce((acc, x) => acc.concat(x.split(" ")), []).reduce((acc, x) => acc += (x==key)? 1:0,0)
  WordsMap.set(key, value)
}
function draw() {
  var canvas = document.getElementById('wykres');
  var ctx = canvas.getContext('2d');
  var size = WordsMap.size
  var maxval = 0
  var width = canvas.width;
  var height = canvas.height;
  var colors = ['red', 'green', 'blue', 'orange','grey','pink'];
  for (var [key, value] of WordsMap) {
    if (maxval < value){
        maxval = value
      }
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var c =1
  var margin = height * 0.05
  for (var [key, value] of WordsMap) {
    ctx.fillStyle = colors[c%colors.length];
    ctx.fillRect(width - (width/(size)*c - 10),
     (height-margin) - ((value/maxval) * (height-margin)),
     (width)/size -20,
     (value/maxval) * (height -margin))
    ctx.textAlign = "center";
    ctx.font= margin + "px Arial";
    ctx.fillText(key,(width - (width/(size)*c - 10) + width - (width/(size)*c - 10) + (width)/size -20)/2 , height -10);
    c+=1
  }
}
