var express = require('express');
var adminRouter=express.Router();
var mongodb=require('mongodb').MongoClient;
var books=[
{
title:'War and Peace',
genre:'Historical Fiction',
author:'Lev Nikolayevich Tolstoy',
bookId:656,
read:false
},
{
title:'A Fistful of Charms',
genre:'	Urban fantasy',
author:'Kim Harrison',
bookId:30260,
read:false
},

{
title:'A Taste For Passion',
genre:'Romance',
author:'Patrice Michelle',
read:false
},
{
title:'Afterlife',
genre:'	Young Adult',
author:'Claudia Gray',
read:false
},
{
title:'A Touch of Dead',
genre:'True Blood',
author:'Charlaine Harris',
read:false
}
];
var router=function(nav){
adminRouter.route('/addBooks').get(function(req,res){

  var url='mongodb://localhost:27017/librarayApp';
  mongodb.connect(url,function(err,db){
  const myAwesomeDB =db.db('librarayApp');
  var collection=myAwesomeDB.collection('books');
  collection.insertMany(books,function(err,results){
  res.send(results);
  db.close();
  }
  );
});
});
return adminRouter;
};
module.exports=router;
