var mongodb=require('mongodb').MongoClient;
const ObjectID =require('mongodb').ObjectID;
var bookController=function(bookService,nav){
var middleware=function(req,res,next){
  if(!req.user){
  res.redirect('/');
  }
  next();
};
var getIndex= function(req,res){
  var url='mongodb://localhost:27017/librarayApp';
  mongodb.connect(url,function(err,db){
    const myAwesomeDB =db.db('librarayApp');
    var collection=myAwesomeDB.collection('books');
    collection.find({}).toArray( function(err,results){
      res.render('BookListView',
      {
      title:'Hello from render',
      nav:nav,
      books:results
      });

    }
  );


  });

};
var getById=function(req,res){
 //var id1 = JSON.parse(req.params.id);
 var id1=new require('mongodb').ObjectID(req.params.id)

 //var id1=new ObjectID(req.params.id);
// var id1 = BSON.ObjectID.createFromHexString(req.params.id);
//console.log(id1);
  var url='mongodb://localhost:27017/librarayApp';
  mongodb.connect(url,function(err,db){
    const myAwesomeDB =db.db('librarayApp');
    var collection=myAwesomeDB.collection('books');
    var a1=collection.findOne({_id:id1});
    //console.log(a1);

a1.then(function(results) {
  if(results.bookId){
    bookService.getBookById(results.bookId,
function(err,book){
results.book=book;
res.render('BookView',{
title:'Books',
nav:nav,
book:results
});

});
}
else{
  res.render('BookView',{
  title:'Books',
  nav:nav,
  book:results
  });
}

    //will log results.
});


  });
};
return {
  getIndex:getIndex,
  getById:getById,
  middleware:middleware

}
}
module.exports=bookController;
