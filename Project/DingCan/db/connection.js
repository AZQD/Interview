/**
 * 数据库操作的帮助文件，也就是暴露的下面三个对象
 * mongoose
 * connect
 * disconnect
 */
var mongoose = require('mongoose');

/*console.log(typeof mongoose.connection);*/

//暴露mongoose对象
exports.mongoose = mongoose;

//暴露连接的方法
var connect = function(){
    mongoose.connect('mongodb://127.0.0.1/atguigu_o2o');
    //得到连接对象
    var conn = mongoose.connection;
    //绑定兼听(出错)
    conn.on('error', console.error.bind(console, 'connection error'));
    //绑定兼听(打开成功)
    conn.on('open', function(){
        console.log('conn opend');
    });
    //绑定兼听(关闭成功)
    conn.on('close', function(){
        console.log('conn close');
    });
};
//注意这种暴露方式，暴露的是对象
exports.connect = connect;

//测试是否正常连接
//connect();


//暴露关闭连接的方法
var disconnect = function(){
    mongoose.disconnect();
    //console.log('disconnect');
};
exports.disconnect = disconnect;

//测试是否正常关闭连接
//disconnect();