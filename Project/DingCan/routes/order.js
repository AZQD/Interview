/**
 * Created by Administrator on 2016/8/23.
 */
var db = require('../db/db');
var moment = require('moment');
module.exports = function(router){
    /**
     * 处理获取默认地址请求
     */
    router.get('/order/getNewestAddress', function(req, res, next){
        var userId = req.query.userId;
        db.getDefaultAddr(userId, function(address){
            if(address == null){
                res.send({code : 1});
            }else{
                res.send({code : 0, data : address});
            }
        });
    });

    //点击微信支付，下单
    router.post('/order/createOrder', function(req, res, next){
        var order = req.body.order;//post请求得到的就是一个js对象
        console.log('下单的order：', order);
        order.state = 3; //表示已经完成  和下面的路由相对应
        db.addOrder(order, function(order){
            res.send({
                code : 0,
                data : order
            });
        });
    });

    //显示订单详情: 注意路由的写法
    router.get('/order/detail/:id', function(req, res, next){
        //路由如果这样写，获取参数如下写法：params
        var id = req.params.id;

        db.getOrderById(id, function(order){

            //状态文本
            var stateText = null;
            switch (order.state){
                case 0 :
                    stateText = '待支付';
                    break;
                case 1:
                    stateText = '已付款';
                    break;
                case 2:
                    stateText = '';
                    break;
                case 3:
                    stateText = '已完成';
                    break;
                case 4:
                    stateText = '店铺拒单';
                    break;
                case 5:
                    stateText = ' 商家已接单';
                    break;
                case 6:
                    stateText = '已退单';
                    break;
                case 7:
                    stateText = '未支付的取消订单';
                    break;
                case 8:
                    stateText = '订单异常';
                    break;
                case 9:
                    stateText = '退单中';
                    break;
                case 10:
                    stateText = '商家拒绝退单';
            }

            //如果添加一个没有的属性，只能直接添加，不要通过_doc
            order.stateText = stateText;
            //修改已有的属性值，必须通过_doc来操作
            //_doc需要对路由打断点，然后运行www,可以看到数据都在_doc里面
            //到达时间
            console.log('****/order/detail/:id****',order);

            //问老师，arrive_time这是个什么意思？和之前的arriveTime有什么关系？
            order._doc.arrive_time = moment(order.arrive_time).format('HH:mm:ss');
            console.log(order._doc.arrive_time);
            //对象化detail
            order._doc.detail = JSON.parse(order.detail);

            //使用ejs 渲染了这个页面，所以ejs文件可以利用这里的数据
            res.render('orderDetail', {code : 0, data : order});

        });
    });


    //这个ejs作为参考就好
    //显示用户订单列表
    router.get('/order/orderList', function (req, res, next) {
        var userId = req.query.userId;
        db.getOrdersByUserId(userId, function (orderArr) {

            for (var i = 0; i < orderArr.length; i++) {
                var order = orderArr[i];

                order._doc.detail = JSON.parse(order.detail);
                order._doc.arrive_time = moment(order.arrive_time).format('MM-DD HH:mm');
                order._doc.order_time = moment(order.order_time).format('MM-DD HH:mm');
            }

            //使用ejs
            res.render('orderList', {code :0, data : orderArr});
        })
    });

};