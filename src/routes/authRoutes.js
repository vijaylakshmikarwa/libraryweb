var express = require('express');
var authRouter=express.Router();
var mongodb=require('mongodb').MongoClient;
var passport=require('passport');
var router=function(){
authRouter.route('/signup').post(function(req,res){
console.log(req.body);
var url='mongodb://localhost:27017/librarayApp';
mongodb.connect(url,function(err,db){
const myAwesomeDB =db.db('librarayApp');
var collection=myAwesomeDB.collection('users');
var user={
username:req.body.username,
password:req.body.password
};
collection.insert(user,function(err,results){
req.login(results.ops[0],function(){
res.redirect('/auth/profile');
});
});
});
});
authRouter.route('/signin').post(passport.authenticate('local',{
failureRedirect:'/'
}),function(req,res){
res.redirect('/auth/profile');
}
);



authRouter.route('/profile').all(function(req,res,next){
if(!req.user){
res.redirect('/');
}
next();
}).get(function(req,res){
res.json(req.user);
});

return authRouter;
};
module.exports=router;
