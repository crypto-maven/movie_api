// require node url module
const url = require('url');
var addr = 'http://localhost:8080/default.htm?year=2017&month=february';
var q = url.parse(addr, true);

console.log(q.host);
console.log(q.pathname);
console.log(q.search);

var qdata = q.query;
console.log(qdata.month);

// node server local
const http = require('http');

http.createServer((request, response) => {
	response.writeHead(200, { 'Content-Type': 'text/plain' });
	response.end('Hello Node!\n');
}).listen(8080);

console.log('My first node test server is running on port 8080.');
