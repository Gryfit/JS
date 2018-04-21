const modul = require('./modul');
const readline = require('readline');

console.log('\x1B[31mWitaj Świecie\x1B[0m\n');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.on('line', (input) => {
  input.split(' ').reduce((prev, curr) => console.log(modul.suma(parseInt(prev),parseInt(curr))));
});
