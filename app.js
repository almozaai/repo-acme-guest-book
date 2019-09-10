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

const readFileJSON = async(file) => {
  const jsonString = await readFile(file);
  return JSON.parse(jsonString);
}

const server = http.createServer( async (req, res)=> {
  try {
    if(req.url === '/') {
      const html = await readFile('./index.html');
      res.write(html);
      res.end();
    } else if (req.url === '/api/guests') {
      const guests = await readFileJSON('./guests.json');
      res.write(guests);
      res.end();
    }
  }
  catch(ex){
    res.statusCode = 500;
    res.write(ex.message);
    res.end();
  }
})
