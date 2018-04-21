var dx
var dy
var AnimationID

window.onload = function(){
    dx = Math.random()*100
    dy = Math.random()*100
};
function gooo(){
    var element = document.getElementById('animacja')
    style = window.getComputedStyle(element)
    var top = style.getPropertyValue('top')
    var left = style.getPropertyValue('left')

    var top_ = parseInt(top.substring(0,top.length-2));
    var left_ = parseInt(left.substring(0,left.length-2));

    element.style.top = (top_ + dy)%1080 + "px"
    element.style.left = (left_ + dx)%1920  + "px"
}
document.getElementById("run").addEventListener('click',gooo);

document.getElementById("stop").addEventListener('click',function () {
    window.clearInterval(AnimationID)
});

document.getElementById("start").addEventListener('click',function () {
    AnimationID = window.setInterval(gooo,100);
});


