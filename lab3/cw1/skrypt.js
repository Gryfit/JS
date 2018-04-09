
var timeFunInterval
var timeFunTimeout
var timeFunRequest

var startI
var startR
var startT

var IID
var TID
var RID

//czasy sa mniej wiecej równe
document.getElementById("StartBTN").addEventListener('click',function () {
    startI = new Date().getTime()
    IID = window.setInterval(funInterval,1000)

    startT = new Date().getTime()
    TID = window.setTimeout(funTimeout,1000)
    startR = new Date().getTime()
    RID = window.requestAnimationFrame(funRequest)
});

document.getElementById("StopBTN").addEventListener('click',function () {
   clearInterval(IID)
   window.clearTimeout(TID)
   window.cancelAnimationFrame(RID)
});

function funInterval(){
    var end = new Date().getTime()
    timeFunInterval = end-startI
    console.log("funInterval: "+timeFunInterval)
    startI = new Date().getTime()
}

function funTimeout(){
    var end = new Date().getTime()
    timeFunTimeout = end-startT
    console.log("funTimeout: "+timeFunTimeout)
    startT = new Date().getTime()
    TID = window.setTimeout(funTimeout, 1000)
}

// od 15 do 17 ms
function funRequest(timestamp){
    var end = new Date().getTime()
    timeFunRequest = end-startR
    console.log("funRequest "+timeFunRequest)
    startR = new Date().getTime()
    RID = window.requestAnimationFrame(funRequest)
}
