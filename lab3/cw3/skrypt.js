var xd;

window.onload = function(){
    document.getElementById("input").value = 10;
    xd = document.getElementById("input").value;
};

var intervalID = window.setInterval(function(){
    xd = document.getElementById("input").value;
    if(xd > 0){
        xd-=1;
        document.querySelectorAll("span").forEach(function(elem){
            elem.textContent = xd.toString();
        });
        document.getElementById("input").value = (xd);
    }

},1000);
