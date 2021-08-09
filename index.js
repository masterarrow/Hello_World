const http = require('http');

const port = 3000;

// Magic word :)
const word = 'World';

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(`Hello ${word}`);
});

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});

