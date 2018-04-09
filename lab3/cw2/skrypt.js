document.getElementById("SETBTN").addEventListener('click',function () {
    if(!document.getElementById("Div").hasAttribute("class")){
        document.getElementById("Div").setAttribute("class","view");
    }
});

document.getElementById("UNSETBTN").addEventListener('click',function () {
    if(document.getElementById("Div").hasAttribute("class")){
        document.getElementById("Div").removeAttribute("class");
    }
});
