"use strict";
var expect = chai.expect;
main();

function main(){
  var total=0;
  var f;
  do{
    var string = prompt("Enter the string: ", "C'mon");
    f = F(string);
    if(f == null){
      break;
    }
    total+=f;
    console.log(total);
  }while(f!=null)
}
function F(string){
    if (string != null) {
      console.log(cyfry(string));
      console.log(litery(string));
        return totalSum(string);
    }
    return null;
}

function cyfry(str){
  var xd = 0;
  for(var i=0;i<str.length;i++ ){
      if(!isNaN(parseInt(str.charAt(i),10))){
        xd +=parseInt(str.charAt(i),10);
      }
  }
  return xd;
}

function litery(str){
  var xd =0;
  for(var i=0;i<str.length;i++){
    if(isNaN(parseInt(str.charAt(i),10))){
      xd++;
    }
  }
  return xd;
}

function totalSum(str){
  var xd =0;
  var i=0;
  while(i<str.length && !isNaN(parseInt(str.charAt(i),10))){
    i++;
  }
  xd += parseInt(str.substring(0,i),10);
  return xd;
}



describe('Funkcja main()', function() {
 it('Zwraca 10 dla 1234', function() {
   expect(cyfry("1234")).to.equal(10);
 });
 it('Zwraca 5 dla aaaaa', function() {
   expect(litery("aaaaa")).to.equal(5);
 });
 it('Zwraca litery 5 cyfry 6 dla aaaaa123', function() {
   expect(litery("aaaaa123")).to.equal(5);
   expect(cyfry("aaaaa123")).to.equal(6);
 });
 it('Zwraca litery 5 cyfry 6 dla 123aaaaa', function() {
   expect(litery("123aaaaa")).to.equal(5);
   expect(cyfry("123aaaaa")).to.equal(6);
   expect(totalSum("123aaaaa")).to.equal(123);
 });
 it('Zwraca null dla pustego napisu', function() {
   expect(F(null)).to.equal(null);
 });
});
