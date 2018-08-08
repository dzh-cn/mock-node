var express = require('express');
var router = express.Router('');
var db = require('../db/mongodbModel')
var mongoose = require('mongoose');
var Element = {
	name: String,
	type: String,
    mock: String,
    explain: String
}

var facadeSchema = new mongoose.Schema({
	projectId: String,
	uri: String,
	method: String,
	name: String,
	explain: String,
	author: String,
	operationTime: Date,
	reqElements: [Element],
	resElements: [Element]
});

var facadeModel = db.model('facades', facadeSchema)

/* facade list */
router.get('/', function (req, res) {
    facadeModel.find(function (err, doc) {
        var result = {};
        if (err) {
            result.success = false;
            result.message = '操作失败';
            result.error = err;
        } else {
            result.facades = doc;
        }
        // console.log(result);
        res.render('facade/facades', result);
    })
});

/* facade detail */
router.get('/save', function (req, res) {
    var facade = req.query
    // console.log("req", facade);
    if (facade && facade.id) {
        var id = mongoose.Types.ObjectId(facade.id)
        facadeModel.find({_id: id}, function (err, doc) {
            if (err) {
                facade.success = false
                facade.message = '查询失败';
                facade.error = err;
            } else {
                facade.success = true
                facade = doc[0]
            }
            // console.log("facade", facade);
            res.render('facade/save', facade);
        })
    } else {
        // console.log("facade", facade);
        res.render('facade/save', facade);
    }
});

/* facade save */
router.post('/save', function (req, res) {
    var id = req.body.id == ''? null : mongoose.Types.ObjectId(req.body.id)
    var optionCallback = function (err) {
        if (err) {
            console.log(err)
            res.render('facade/save', {success: false, message: "操作失败！", time: new Date(), error: err});
        } else {
            // console.log('save success')
            res.redirect("/facade")
        }
    }
    req.body.operationTime = new Date()
    if(id)
        facadeModel.update({_id: id}, req.body, optionCallback)
    else
        var model = new facadeModel(req.body);
        model.save(req.body, optionCallback)
});

module.exports = router;