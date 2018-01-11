var passport=require('passport'),
localstrategy=require('passport-local').Strategy;
var mongodb=require('mongodb').MongoClient;
module.exports=function(){
passport.use(new localstrategy({
usernamefield:'username',
passwordfield:'password'
},
function(username,password,done){
  var url='mongodb://localhost:27017/librarayApp';
  mongodb.connect(url,function(err,db){
  const myAwesomeDB =db.db('librarayApp');
  var collection=myAwesomeDB.collection('users');
  collection.findOne({
  username:username
  },
  function(err,results){
if(results.password===password){
  var user=results;
  done(null,user);
}else {
  done(null,false,{message:'Bad password'});
}

}


  );
});
}))
};
