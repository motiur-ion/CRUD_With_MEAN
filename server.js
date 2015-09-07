var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db =mongojs('crud_mean',['contactlist']);
var bodyParser = require('body-parser');



/** 
//demo text for checking server in web page 

app.get('/',function (req,res) {	
	res.send("Express server is running");   
});
**/

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());




	app.get('/contacts',function (req,res) {
		
		db.contactlist.find(function (err,doc) {
			res.json(doc);
		});
	
	});


  app.post('/contacts',function (req,res) {
  		
  		db.contactlist.insert(req.body,function (err,doc) {
			res.json(doc);
  		});
  
  });
  
  app.delete('/contacts/:id',function (req,res) {
  		var id = req.params.id;
  		db.contactlist.remove({_id:mongojs.ObjectId(id)},function (err,doc) {
  			res.json(doc);
  		});
  
  });
  
  
  app.get('/contacts/:id',function (req,res) {
   
     var id = req.params.id;
     
     db.contactlist.findOne({_id:mongojs.ObjectId(id)},function (err,doc) {
     		res.json(doc);
     });
  
  });
  
  app.put('/contacts/:id',function (req,res) {
  		var id =req.params.id;
  		db.contactlist.findAndModify({query:{_id:mongojs.ObjectId(id)},
  		update:{$set:{name:req.body.name,email:req.body.email,number:req.body.number}},
  		new:true},function (err,doc) {
			res.json(doc);  		
  		});
  
  });





app.listen(7777);
console.log("Express server is running in port 7777");