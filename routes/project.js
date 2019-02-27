var express = require('express');
var router = express.Router('');
var db = require('../db/mongodbModel')
var mongoose = require('mongoose');
var projectSchema = new mongoose.Schema({
	name: String,
	explain: String,
	author: String,
	operationTime: Date

});

var ProjectModel = db.model('projects', projectSchema)

/* project list */
router.get('/', function (req, res) {
    ProjectModel.find(function (err, doc) {
        var result = {};
        if (err) {
            result.success = false;
            result.message = '操作失败';
            result.error = err;
        } else {
            result.projects = doc;
        }
        // console.log(result);
        res.render('project/projects', result);
    })
});

/* project detail */
router.get('/save', function (req, res) {
    var project = req.query
    // console.log("req", project);
    if (project && project.id) {
        var id = mongoose.Types.ObjectId(project.id)
        ProjectModel.find({_id: id}, function (err, doc) {
            if (err) {
                project.success = false
                project.message = '查询失败';
                project.error = err;
            } else {
                project.success = true
                project = doc[0]
            }
            // console.log("project", project);
            res.render('project/save', project);
        })
    } else {
        // console.log("project", project);
        res.render('project/save', project);
    }
});

/* project save */
router.post('/save', function (req, res) {
    var id = req.body.id == ''? null : mongoose.Types.ObjectId(req.body.id)
    var optionCallback = function (err) {
        if (err) {
            console.log(err)
            res.send({success: false, message: "操作失败！", time: new Date(), error: err})
        } else {
            // console.log('save success')
            res.send({success: true, message: "操作成功！", time: new Date()})
        }
    }
    req.body.operationTime = new Date()
    if(id) {
        ProjectModel.update({_id: id}, req.body, optionCallback)
    } else {
        new ProjectModel(req.body).save(optionCallback)
    }
});

/* project delete */
router.get('/delete', function (req, res) {
    var project = req.query
    var optionCallback = function (err) {
        if (err) {
            console.log(err)
            res.send({success: false, message: "操作失败！", time: new Date(), error: err})
        } else {
            // console.log('save success')
            res.send({success: true, message: "操作成功！", time: new Date()})
        }
    }
    if(project && project.id) {
        var param = {'_id':mongoose.Types.ObjectId(project.id)}
        ProjectModel.remove(param, optionCallback);
    } else {
        console.log('id为空');
        res.send({success: true, message: "操作失败！", time: new Date()})
    }
})

module.exports = router;
