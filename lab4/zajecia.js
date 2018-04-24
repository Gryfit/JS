const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
function print(str, lvl) {
  for (let i = 0; i < lvl; i += 1) {
    rl.write(' ');
  }
  rl.write(`${str}\n`);
}
function ls(path, lvl) {
  const npath = __dirname.concat(path);
  if (fs.existsSync(npath)) {
    const stat = fs.statSync(npath, (err, st) => st);
    if (stat.isDirectory()) {
      print(`DIR: ${npath}`, lvl);
      const files = fs.readdirSync(npath, 'utf8');
      files.map((x) => { print(x, lvl); ls(path.concat('/').concat(x), lvl + 1); return x; });
    } else if (stat.isFile()) {
      print(`FILE: ${npath}`, lvl);
      rl.write(fs.readFileSync(npath).toString());
    }
  }
  rl.close();
}
rl.question('PATH: ', (input) => {
  ls(input, 0);
});
