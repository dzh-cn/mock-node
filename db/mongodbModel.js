var mongoose = require('mongoose');
local_mongodb = mongoose.createConnection('mongodb://test:123456@localhost/test');//；连接数据库
// 链接错误
local_mongodb.on('error', function(error) {
	console.log(error);
});
module.exports = local_mongodb
