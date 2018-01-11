var express =require('express');
var BookRouter=express.Router();
var mongodb=require('mongodb').MongoClient;
const ObjectID =require('mongodb').ObjectID;

//var BSON = require('mongodb').BSONPure;
var Router=function(nav){
  var bookservice=require('../services/goodreadsService')();
  var bookController =require('../controllers/bookController')(bookservice,nav);
  BookRouter.use(bookController.middleware);

BookRouter.route('/').get(bookController.getIndex);
BookRouter.route('/:id').get(bookController.getById);
return BookRouter;
}
module.exports=Router;
