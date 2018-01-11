var https=require('https');
var xml2js=require('xml2js');
var parser=xml2js.Parser({explicitArray:false});

var goodreadsService=function(){
var getBookById =function(id,cb){
  var options={
host:'www.goodreads.com',
path:'/book/show/'+id+'?format=xml&key=Z3u4IvhgRO2QoBWa59YgEA'
};
var callback=function(response){
var str='';
response.on('data',function(chunk){
str+=chunk;
});
response.on('end',function(){
//console.log(str);
parser.parseString(str,function(err,result){
cb(null,result.GoodreadsResponse.book);
});
});
};
https.request(options,callback).end();

};
return {
  getBookById:getBookById
};
};
module.exports=goodreadsService;
