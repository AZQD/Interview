/**
 * 用户分路由
 */
var db = require('../db/db');
var sms_utils = require('../util/sm_utils');

module.exports = function(router){
    /*
    * 1、登录接口
     地址：
     /login
     请求体:
     phone=13716962779&code=123123
     返回:
     {
     "code": 0,
     "data": {
     "__v": 0,
     "phone": "13716962779",
     "_id": "576bbe0aa1d183c42c06c08e"
     }
     }*/
    router.post('/login', function(req, res, next){
        //获取请求参数
        var phone = req.body.phone;
        var code = req.body.code;
        console.log('post /login', phone, code);


        //检查code是否正确
        var saveCode = users[phone];
        if(saveCode !== code){
            res.send({
                code : 1,
                data : '亲，验证码错误！'
            });
            return;
        }
        //验证码正常的，删除对应的属性(验证码)
        delete users[phone];




        //处理数据
        db.getUserByPhone(phone, function(user){
            if(user == null){//如果没有，则保存并返回
                db.addUser(phone, function(user){
                    res.send({//返回响应数据
                        code : 0,
                        data : user
                    });
                });
            }else{//如果有，返回
                res.send({//返回响应数据
                    code : 0,
                    data : user
                });
            }
        });
    });

    router.get('/feedback', function(req, res, next){
        //返回的是JSON对象
        var feedbackJson = req.query.data;
        var feedback = JSON.parse(feedbackJson);
        console.log('get /feedback', feedback);

        db.addFeedback(feedback, function(feedback){
            //返回响应数据
            res.send({
                code : 0,
                data : feedback
            });
        });
    });

    //存储所有生成了code的用户信息(phone/code)
    var users = {};
    router.get('/sendcode', function(req, res, next){
        var phone = req.query.phone;
        //生成一个6位数的随机值(验证码)
        var code = sms_utils.randomCode(6);
        //发送短信
        sms_utils.sendSms(phone, code, function(success){
            //success表示成功
            if(success){
                //保存
                users[phone] = code;
            }
        });

        //返回相应
        res.send({
            code : 0
        });
    });
};