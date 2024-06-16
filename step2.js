const fs = require('fs');
const process = require('process');
const axios = require('axios');



function cat(path) {
    fs.readFile(path, 'utf8', (err, data)=> {
        if(err){
            console.log("ERROR:", err);
            process.kill(1)
         }
         console.log("DATA..", data);

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
  let path = process.argv[2];

if (path.slice(0, 4) === 'http') {
  catPage(path);
} else {
  cat(path);
}