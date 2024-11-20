var url =require('url');
var adr='http://localhost:8080/pesu.htm?year=2020&month=September';
var q =url.parse(adr,true);
console.log(q.host); //returns 'localhost:8080
console.log(q.pathname); //returns '/pesu.htm'
console.log(q.search);//returns '?year=2020&month=September'

var qdata=q.query;//returns an object:{year:2020,month :'september'}
console.log(qdata.month);//returns 'september'
