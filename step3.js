const fs = require('fs');
const process = require('process');
const axios = require('axios');


function manageOutput(text, out) {
    if (out) {
      fs.writeFile(out, text, 'utf8', function(err) {
        if (err) {
          console.log("ERROR", err);
          process.exit(1);
        }
      });
    } else {
      console.log(text);
    }
  }


function cat(path) {
    fs.readFile(path, 'utf8', (err, data)=> {
        if(err){
            console.log("ERROR:", err);
            process.kill(1)
         }else {
            manageOutput(data, out);
          }
         
    });  
}


async function catPage(url) {
    try {
      let resp = await axios.get(url);
      console.log(resp.data);
    } catch (err) {
      console.log("Error", err);
      process.exit(1);
    }
  }
  let path;
  let out;

if (process.argv[2] === '--out') {
  out = process.argv[3];
  path = process.argv[4];
} else {
  path = process.argv[2];
}



if (path.slice(0, 4) === 'http') {
  catPage(path);
} else {
  cat(path);
}