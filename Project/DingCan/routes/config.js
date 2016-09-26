/**
 * Created by Administrator on 2016/8/12.
 */
/**
 * 总路由
 */
var express = require('express');
var router = express.Router();

//引入分路由
var user = require('./user');
var address = require('./address');
var index = require('./index');
var order = require('./order');
//注册路由
user(router);
address(router);
index(router);
order(router);

module.exports = router;