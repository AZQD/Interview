/**
 * Created by Administrator on 2016/8/21.
 */
var moment = require('moment');
var md5 = require('blueimp-md5');
var Base64 = require('js-base64').Base64;
var request = require('request');

//生成随机值
function randomCode(n){
    var chars = ['0', '1','2','3','4','5','6','7','8','9'];
    var res = '';
    for(var i=0; i<n ; i++){
        var index = Math.ceil(Math.random()*9);
        res += chars[index];
    }
    return res;
}
exports.randomCode = randomCode;
console.log(randomCode(6));

//发送短信
function sendSms (phone, code, cb){
    //1.准备url
    var BASE_URL = 'https://app.cloopen.com:8883';
    var accountSid = '8aaf07085697eda30156a166b2770742';
    var AUTH_TOKEN = '1fa356941ead440caa62d621e464b94e';
    var time = moment().format('YYYYMMDDHHmmss');
    console.log(time);

    //MD5加密（账户Id + 账户授权令牌 + 时间戳）
    //时间戳是当前系统时间，格式"yyyyMMddHHmmss" SigParameter参数需要大写
    var SigParameter = accountSid + AUTH_TOKEN + time;
    SigParameter = md5(SigParameter).toUpperCase();
    var url = BASE_URL+'/2013-12-26/Accounts/'+accountSid+'/SMS/TemplateSMS?sig='+SigParameter;

    //2.准备发送请求的配置对象数据
    // 2.1 使用Base64编码（账户Id + 冒号 + 时间戳）
    // 2.2 冒号为英文冒号
    // 2.3 时间戳是当前系统时间，格式'yyyyMMddHHmmss', 需要与SigParameter中时间戳相同。
    var Authorization = accountSid + ":" + time;
    Authorization = Base64.encode(Authorization);
    var body = {
        to : phone,
        appId : '8aaf07085697eda30156a166b2c70747',
        templateId : '1',
        datas : [code, '1']
    };
    var bodyJson = JSON.stringify(body);
    var options = {
        url : url,
        method : 'POST',
        headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json;charset=utf-8',
            'Content-Length' : bodyJson.length+ "",
            'Authorization' : Authorization
        },
        json : true,
        body : body
    };

    //发送请求
    request(options, function(err, httpResponse, body){
        console.log(body);
        cb(body.statusCode === '000000');
    });
}
exports.sendSms = sendSms;

//测试
/*
sendSms('15936239468', randomCode(6), function(success){
    console.log(success);
});
*/
