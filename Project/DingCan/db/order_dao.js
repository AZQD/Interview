/**
 * 操作orders的dao
 {
  "_id": {
    "$oid": "575f7085f8a14116283daba4"
  },
  "contactor": "张晓飞",
  "address": "平西府",
  "phone": "1310000000",
  "rstName": null,
  "remark": "不错不错",
  "doorplate": "硅谷大楼",
  "total_money": 65,
  "peisongfei": 0,
  "state": 3,
  "arrive_time": "2016-7-1 10:28",
  "detail": "{data:{\"rstId\":1,\"money\":65,\"meals\":[{\"mealId\":0,\"num\":1,\"price\":\"23\"},{\"mealId\":1,\"num\":2,\"price\":\"21\"}]}}",
  "user_id": "575f7085f8a14116283dabc4",
  "coupon_id": "575f7085f8a14116283dab23"
}
 */
var connection = require('./connection');
var mongoose = connection.mongoose;

/*测试*/
/*注意：没做完一个dao文件就要测试一次！！！*/
/*connection.connect();
 function callback(error, result){
 console.log(error, result);
 }*/

var orderSchema = new mongoose.Schema({
    "contactor": String,
    "address": String,
    "phone": String,
    "rstName": String,
    "remark": String,
    "doorplate": String,
    "total_money": Number,
    "peisongfei": Number,
    "state": Number,
    "arrive_time": Date,
    "detail": String,
    "user_id": String,
    "coupon_id": String
});

var OrderModel = mongoose.model('order', orderSchema);

/**
 * //添加订单
 * @param order
 * @param fn
 */
function addOrder(order, fn){
    new OrderModel(order).save(fn);
}
exports.addOrder = addOrder;
//测试
/*addOrder({
    "contactor": "lcj",
    "address": "平西府",
    "phone": "1310000000",
    "rstName": null,
    "remark": "不错不错",
    "doorplate": "硅谷大楼",
    "total_money": 65,
    "peisongfei": 0,
    "state": 3,
    "arrive_time": "2016-7-1 10:28",
    "detail": "{data:{\"rstId\":1,\"money\":65,\"meals\":[{\"mealId\":0,\"num\":1,\"price\":\"23\"},{\"mealId\":1,\"num\":2,\"price\":\"21\"}]}}",
    "user_id": "575f7085f8a14116283dabc4",
    "coupon_id": "575f7085f8a14116283dab23"
}, callback);*/

/**
 * 查询订单详情
 * @param id
 * @param fn
 */
function getOrderById(id, fn){
    OrderModel.findOne({_id : id}, fn);
}
exports.getOrderById = getOrderById;
//测试
//getOrderById('57bc3630fd121b64189f4680', callback);


/**
 * 查询用户的所有订单列表
 * @param userId
 * @param fn
 */
function getOrdersByUserId(userId, fn){
    OrderModel.find({user_id : userId}, fn);
}
exports.getOrdersByUserId = getOrdersByUserId;
//测试
//getOrdersByUserId('575f7085f8a14116283dabc4', callback);