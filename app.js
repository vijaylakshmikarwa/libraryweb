var express=require('express');
var bodyParser=require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session=require('express-session');
var app=express();
 var path = require('path');
var port=process.env.PORT || 5000;
var nav=[{
Link:'/Books',
Text:'Book'
},{
Link:'/Authors',
Text:'Author'
}];
 app.use(express.static(__dirname + '/public'));
app.use('/static', express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({secret:'library',resave: true,
    saveUninitialized: true}));
require('./src/config/passport')(app);

app.set('views','./src/views');
app.set('view engine','ejs');

var BookRouter=require('./src/routes/bookRoutes')(nav);
var AdminRouter=require('./src/routes/adminRoutes')(nav);
var AuthRouter=require('./src/routes/authRoutes')(nav);

app.listen(port,function(err){
  console.log(' app running on server '+port);
});

app.use('/Books',BookRouter);
app.use('/Admin',AdminRouter);
app.use('/Auth',AuthRouter);
app.get('/',function(req,res){
res.render('index',{
title:'Hello from render',
nav:[{
Link:'/Books',
Text:'Books'
},{
Link:'/Authors',
Text:'Authors'
}]
});
});
