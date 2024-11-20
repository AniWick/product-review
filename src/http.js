var http=require("http")   //import module http
http.createServer(function(req,res)
{
    res.writeHead(200,{'Content-Type':'text/html'})
    //res.write('Hello PESU!')
    res.write(req.url);
    res.end()
}).listen(5000)
console.log("server is running at port 5000")