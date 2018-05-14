const fs = require('fs');

function returndir(input){
  if (fs.existsSync(__dirname.concat(input))) {
    const stat = fs.statSync(__dirname.concat(input), (err, st) => {
      if (err) {
        console.log(err);
      }
      return st;
    });
    if (stat.isDirectory()) {
    } else if (stat.isFile()) {
      const contents = fs.readFileSync(__dirname.concat(input)).toString();
      return contents;
    } else {
    }
  }
  return null;
}
export default returndir
