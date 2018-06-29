var express = require('express');
var router = express.Router('');
var db = require('../db/mongodbModel')
var mongoose = require('mongoose');
var projectSchema = new mongoose.Schema({
	id: String,
	name: String,
	explain: String

}); //  定义了一个新的模型，但是此模式还未和users集合有关联

var projectModel = db.model('projects', projectSchema)

/* project list */
router.get('/', function (req, res) {
	res.render('project/projects', {title: 'project list'});
});

/* project list */
router.get('/save', function (req, res) {
	res.render('project/edit', {title: 'list'});
});

/* project save */
router.post('/save', function (req, res) {
	var u = new projectModel({name: 'dong', password: 18})
	u.save(function (err) {
		if (err)
			res.render('index', {title: err});
		else
			res.render('index', {title: 'success'});
	})
});

router.get("/detail", function (req, res) {
	var detail = projectModel.find({id:123})
	res.render("index", detail)
});

module.exports = router;