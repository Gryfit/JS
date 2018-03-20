function dothething() {
  var form = document.forms[0];
  console.log(typeof(form.pole_tekstowe.value)); //allways Returns string
}

 //console.log(typeof(window.prompt("Tekst1","Tekst2")));
 // prompt(text, defaultText)
 //text 	String 	Required. The text to display in the dialog box
 //defaultText 	String 	Optional. The default input text
 //Returns string or Object if cancel
