var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('resume', ['resume']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/getResume', function(req, res){
	db.resume.find(function(err, docs){
		res.json(docs);
	});
});

app.post('/addItem', function(req, res){
	db.resume.insert(req.body, function(err, doc){
		res.json(doc);
	});
});

app.post('/remove', function(req, res){
	db.resume.remove({_id:mongojs.ObjectId(req.body._id)}, function(err, doc){
		res.json(doc);
	});
});

app.post('/edit', function(req, res){
	
	var object = {type:req.body.type};
	if(req.body.type == 'edu'){
		object.school = req.body.school;
		object.degree = req.body.degree;
		object.last_year = req.body.last_year;
	}
	else if(req.body.type == 'skill'){
		object.skill = req.body.skill;
	}
	else if(req.body.type == 'project'){
		object.title = req.body.title;
		object.description = req.body.description;
	}
	
	db.resume.update(
		{_id:mongojs.ObjectId(req.body._id)}, 
		object, 
		function(err, count, status){
			res.json(count);
		}
	);
	
	
});


var port = 8080;
app.listen(port);
console.log("Server running on port " + port);
