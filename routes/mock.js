var express = require('express');
var router = express.Router();
var request = require('request');
var Mock = require('mockjs')

router.get('/', function (req, res) {
	var url = req.url
	var param = url.substr(url.indexOf('?'))
	request({url:'http://127.0.0.1:8082/mock' + param}, function (err, lRes, body) {
		if (err) {
			console.log(err)
		}
		if (body) {
			body = JSON.parse(body)
			// console.log(body)
			// console.log(defaultMock)
			var data = Mock.mock(body);
			res.send(data)
		}
	})
	// res.send(req.params);
});

var defaultMock = {
	// 属性 list 的值是一个数组，其中含有 1 到 10 个元素
	'list|1-10': [{
		'id|+1': 1,// 属性 id 是一个自增数，起始值为 1，每次增 1
		'cname': '@cname',// 中文名称
		'string': '@string',
		'integer': '@integer',
		'number|1-100.2': 2,
		'age|18-28': 0, // 18至28以内随机整数, 0只是用来确定类型
		'birthday': '@date("yyyy-MM-dd")', // 日期
		'date': '@date', // 日期
		'time': '@time', // 时间
		'dateTime': '@date @time',
		'email': '@email',
		'address': '@county(true)', // 地址
		'city': '@city(true)', // 中国城市(true:包含省)
		'isMale|1': true, // 布尔值
		'isFat|1-2': true, // true的概率是1/3
		'fromObj|2': {a:1,b:2,c:3,d:4}, // 从obj对象中随机获取2个属性
		'fromOb|1-3': {a:1,b:2,c:3,d:4}, // 从obj对象中随机获取1至3个属性
		'classroom|1': ['精品语文班','精品作业A班','英语班','语文班'],// 随机选取 1 个元素
		'favorite|+1': ['精品语文班','精品作业A班','英语班','语文班'],// 按顺序获取 1 个元素
		'classrooms|1-3': ['精品语文班','精品作业A班','英语班','语文班'],// 重复1-3次返回结果
		'regexp3': /\d{5,10}/
	}]
}


module.exports = router;
