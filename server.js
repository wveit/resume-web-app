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
	db.resume.remove({_id:mongojs.ObjectId(req.body.id)}, function(err, doc){
		res.json(doc);
	});
});


var port = 8080;
app.listen(port);
console.log("Server running on port " + port);
