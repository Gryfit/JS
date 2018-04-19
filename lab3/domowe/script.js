class Squere{
    constructor(dc, x, y, timec, timel){
        this.counter = 20
        this.lifetime = 10
        this.dc = dc
        this.x = x
        this.y = y
        this.crationtime = timec
        this.lifetime = Math.random() * timel
    }
}
var RID
var canvas = document.getElementById("Canvas");
var ctx = canvas.getContext("2d");

var ignoreMouse = true
var numSquares = 10
var counterspeed = 0.1
var Players =[];

var ball = {
    x: canvas.width/2,
    y: canvas.height/2,
    speed: 10,
    radius: 10
}
var mouseVector = {x:0, y:0};
var dx = ball.speed * mouseVector.x;
var dy = ball.speed * mouseVector.x;

var player = {name: "", points: 0}
var canvasPos = getPosition(canvas);
var MousePos = {x: ball.x, y: ball.y}
var squeres = []

// Helper function to get an element's exact position
function getPosition(el) {
  var xPos = 0;
  var yPos = 0;

  while (el) {
    if (el.tagName == "BODY") {
      // deal with browser quirks with body/window/document and page scroll
      var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
      var yScroll = el.scrollTop || document.documentElement.scrollTop;

      xPos += (el.offsetLeft - xScroll + el.clientLeft);
      yPos += (el.offsetTop - yScroll + el.clientTop);
    } else {
      // for all other non-BODY elements
      xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPos += (el.offsetTop - el.scrollTop + el.clientTop);
    }

    el = el.offsetParent;
  }
  return {
    x: xPos,
    y: yPos
  };
}

function mouseMove(evt) {
    MousePos = {x: evt.clientX - canvasPos.x, y:  evt.clientY - canvasPos.y}
}

function submit_(){
    numSquares = 10
    counterspeed = 0.1

    ball = {
        x: canvas.width/2,
        y: canvas.height/2,
        speed: 10,
        radius: 10
    }

    mouseVector = {x:0, y:0};
    dx = ball.speed * mouseVector.x;
    dy = ball.speed * mouseVector.x;
    player = {name: "", points: 0}
    squeres = []
    var form = document.forms[0];
    player.name = form.name.value;
    numSquares = parseInt(form.kwadraty.value)
    ball.speed = parseFloat(form.kolo.value)
    counterspeed = parseFloat(form.licznik.value) * 0.01
    document.getElementById("_form_").setAttribute("style","visibility: hidden;");
    document.getElementById("Canvas").onmousemove = mouseMove;
    document.getElementById("Canvas").onmouseover = () => ignoreMouse = false;
    document.getElementById("Canvas").onmousedown = () => ignoreMouse = false;
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    startLevel(1);
}
/*
left arrow 	37
up arrow 	38
right arrow 	39
down arrow 	40
*/
function keyDownHandler(e){
    if(e.keyCode == 37) {
        ignoreMouse = true
        mouseVector = {
            x: (mouseVector.x -1)<-1?-1:(mouseVector.x -1), // mouseVecot.x +
            y: mouseVector.y + 0
        }
    }
    if(e.keyCode == 38) {
        ignoreMouse = true
        mouseVector = {
            x: mouseVector.x + 0,
            y: (mouseVector.y -1)<-1?-1:(mouseVector.y -1)
        }
    }
    if(e.keyCode == 39){
        ignoreMouse = true
        mouseVector = {
            x: (mouseVector.x +1)>1?1:(mouseVector.x + 1),
            y: mouseVector.y + 0
        }
    }
    if(e.keyCode == 40){
        ignoreMouse = true
        mouseVector = {
            x: mouseVector.x +0,
            y: (mouseVector.y +1)>1?1:(mouseVector.y + 1)
        }
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 37) {
        mouseVector = {
            x: (mouseVector.x +1)>1?1:(mouseVector.x +1),
            y: mouseVector.y + 0
        }
    }
    if(e.keyCode == 38) {
        mouseVector = {
            x: mouseVector.x + 0,
            y: (mouseVector.y +1)>1?1:(mouseVector.y +1)
        }
    }
    if(e.keyCode == 39){
        mouseVector = {
            x: (mouseVector.x -1)<-1?-1:(mouseVector.x - 1),
            y: mouseVector.y + 0
        }
    }
    if(e.keyCode == 40){
        mouseVector = {
            x: mouseVector.x +0,
            y: (mouseVector.y -1)<-1?-1:(mouseVector.y - 1)
        }
    }
}
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    ctx.fillStyle = "#F4A142";
    ctx.fill();
    ctx.closePath();
    var now =new Date().getTime()
    if(ball.x + dx > canvas.width-ball.radius || ball.x + dx < ball.radius) {
        ball.x = canvas.width - ball.x
    }
    if(ball.y + dy > canvas.height-ball.radius || ball.y + dy < ball.radius) {
        ball.y = canvas.height -ball.y
    }
    var i =0;
    for(;i<numSquares;i++){
        if(ball.x + dx + (ball.radius/2) >= squeres[i].x
            && ball.x + dx + (ball.radius/2) <= squeres[i].x  + 30
            && ball.y + dy + (ball.radius/2) >= squeres[i].y
            && ball.y + dy + (ball.radius/2) <= squeres[i].y  + 30){
                    console.log(ball.x + dx + ball.radius, ball.y + dy + ball.radius)
                    player.points +=  Math.round(squeres[i].counter)
                    squeres[i] = new Squere(counterspeed, (Math.random() * (canvas.width-60))+30, (Math.random() * (canvas.height-60))+30, now, 60)
                    document.getElementById("PointsCurrent").textContent = player.points;
        }
    }
}

var end
var lvls = 3

function draw(timestamp) {
    var now =new Date().getTime()
    if(end - now <=0){
        window.cancelAnimationFrame(RID)
        lvls -=1
        if(lvls>0){
            startLevel(3 - lvls)
        }else{
            startLevel(lvls)
            return;
        }
    }
    document.getElementById("Timeleft").textContent = Math.round((end - now)/1000).toString();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var i =0
    for(;i<numSquares;i++){
        ctx.beginPath();
        ctx.rect(squeres[i].x, squeres[i].y,30,30);
        ctx.fillStyle = squeres[i].counter>0?"#59F441":"#E52A09";
        ctx.fill();
        ctx.closePath();
        ctx.font="15px Georgia";
        ctx.textAlign="center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#000000";
        ctx.fillText(Math.round(squeres[i].counter), squeres[i].x+15, squeres[i].y+15);
        squeres[i].counter -= counterspeed
        if(now - squeres[i].crationtime >  (squeres[i].lifetime * 1000) ){
            squeres[i] = new Squere(counterspeed, (Math.random() * (canvas.width-60))+30, (Math.random() * (canvas.height-60))+30, now, 60)
        }
    }
    drawBall();
    if(!ignoreMouse){
        var tmpx
        var tmpy
        if(MousePos.x - ball.x >= ball.radius/2){
            tmpx = 1
        }else{
            if(MousePos.x - ball.x >=0){
                tmpx = 0
            }else{
                tmpx = -1
            }
        }
        if(MousePos.y - ball.y >= ball.radius/2){
            tmpy = 1
        }else{
            if(MousePos.y - ball.y >=0){
                tmpy = 0
            }else{
                tmpy = -1
            }
        }
        mouseVector = {
            x: tmpx,
            y: tmpy
        }
    }
    dx = ball.speed * mouseVector.x;
    dy = ball.speed * mouseVector.y;
    ball.x += dx;
    ball.y += dy;
    ball.speed = ball.speed
    RID = window.requestAnimationFrame(draw)
}

function startLevel(lvl){
    var dk = 2;
    var dspeed = 1;
    var dcounterspeed = 1;
    switch (lvl) {
        case 1:
            end = new Date().getTime() + (60 * 1000)
            var i=0
            for(;i<numSquares;i++){
                var t =new Date().getTime()
                squeres.push(new Squere(counterspeed, (Math.random() * (canvas.width-60))+30, (Math.random() * (canvas.height-60))+30, t, 60))
            }
            RID = window.requestAnimationFrame(draw)
            break;
        case 2:
            squeres.splice(0,squeres.length)
            end = new Date().getTime() + (60 * 1000)
            var i=0
            for(;i<numSquares;i++){
                var t =new Date().getTime()
                squeres.push(new Squere(counterspeed, (Math.random() * (canvas.width-60))+30, (Math.random() * (canvas.height-60))+30, t, 60))
            }
            RID = window.requestAnimationFrame(draw)
            break;
        case 3:
            squeres.splice(0,squeres.length)
            end = new Date().getTime() + (60 * 1000)
            var i=0
            for(;i<numSquares;i++){
                var t =new Date().getTime()
                squeres.push(new Squere(counterspeed, (Math.random() * (canvas.width-60))+30, (Math.random() * (canvas.height-60))+30, t, 60))
            }
            RID = window.requestAnimationFrame(draw)
            break;
        default:
            window.cancelAnimationFrame(RID)
            window.alert("GAME OVER")
            Players.push(player);
            Players.sort((a,b) => a.points > b.points ? 1 : a.points < b.points ? -1 : 0)
            if(Players.length > 3){
                Players.splice(2, Players.length-3);
            }
            document.getElementById("Player1").textContent = Players[0].name;
            if(Players.length >1) document.getElementById("Player2").textContent = Players[1].name;
            if(Players.length >2) document.getElementById("Player3").textContent = Players[2].name;

            document.getElementById("Points1").textContent = Players[0].points;
            if(Players.length >1) document.getElementById("Points2").textContent = Players[1].points;
            if(Players.length >2) document.getElementById("Points3").textContent = Players[2].points;
            document.getElementById("_form_").removeAttribute("style");

            return;
    }
}
