const http = require('http');
const getData = require('./buffer.js');

const port = 3000;
const count = 3;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  
  const [a, b, c] = await getData(count);
  
  res.end(`${a}\n${b}\n${c}`);
});

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
