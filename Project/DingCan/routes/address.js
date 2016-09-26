/**
 * Created by Administrator on 2016/8/13.
 */

var db = require('../db/db');


module.exports = function(router){
    //添加地址
    router.get('/insertAddr', function(req, res, next){
        //获取的请求参数是JSON对象
        var addressJson = req.query.address;
        var address = JSON.parse(addressJson);
        //处理请求参数
        db.addAddr(address, function(address){
            //返回相应数据
            res.send({
                code : 0,
                data : address
            });
        });
    });

    router.get('/getAddrsByUserId', function(req, res, next){
        var userId = req.query.userId;
        //处理请求数据
        //addrArr是服务器中的地址数组
        db.getAddrsByUserId(userId, function(addrArr){
            //返回相应结果
            res.send({
                code : 0,
                data : addrArr
            });
        });
    });

    router.get('/updateAddr', function(req, res, next){
        var address = JSON.parse(req.query.address);
        db.updateAddr(address, function(msg){
            res.send({
                code : 0,
                data : msg
            });
        });
    });

    router.get('/deleteAddr', function(req, res, next){
        var id = req.query._id;
        db.deleteAddrById(id, function(msg){
            res.send({
                code : 0,
                data : msg
            });
        });
    });
};