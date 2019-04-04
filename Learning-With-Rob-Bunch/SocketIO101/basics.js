const http = require('http');

const server = http.createServer((req,res)=>{
    res.end("BARK BARK");
});