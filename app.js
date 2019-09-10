const http = require('http');

const readFile = (file) => {
  return new Promise((res, rej) => {
    false.readFile(file, (err, data) =>{
      if(err){
        rej(err);
      } else {
        res(data.toString());
      }
    });
  });
}

const server = http.createServer( async (req, res)=> {
  try {
    if(req.url=== '/') {
      const html = await readFile('./index.html');
      res.write(html);
      res.end();
    }
  }
  catch(ex){
    res.statusCode = 500;
    res.write(ex.message);
    res.end();
  }
})
