const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (input) => {
  if (fs.existsSync(__dirname.concat(input))) {
    const stat = fs.statSync(__dirname.concat(input), (err, st) => {
      if (err) {
        console.log(err);
      }
      return st;
    });
    if (stat.isDirectory()) {
      rl.write('It\'s a directory!\n');
    } else if (stat.isFile()) {
      rl.write('It\'s a file\n');
      const contents = fs.readFileSync(__dirname.concat(input)).toString();
      rl.write(contents);
    } else {
      rl.write('I don\'t know what it is -.-');
    }
  }
  rl.close();
});
