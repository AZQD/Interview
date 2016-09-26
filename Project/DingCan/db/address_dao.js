/**
 * Created by Administrator on 2016/8/13.
 *
 * 在addresses.json中找例子
 {
   "_id": {
     "$oid": "575f7085f8a14116283dab96"
   },
   "address": "北京大学-26号楼",
   "contactor": "张三",
   "lat": "39.993851111808",
   "lng": "116.31838249961 ",
   "phone": "17711111111",
   "sex": "1",
   "state": "1",
   "userId": "575f7085f8a14116283dabc7",
   "cityId": "113",
   "doorplate": "212"
 }
 */
var connection = require('./connection');
var mongoose = connection.mongoose;

//测试
/*connection.connect();
function callback(error, result){
    console.log(error,result);
}*/

//Schema
var Schema = mongoose.Schema;
var addressSchema = new Schema({
    "address" :String,
    "contactor" :String,
    "lat" : String,
    "lng" : String,
    "phone" : String,
    "sex" : Number,
    "state" : Number,
    "userId" : String,
    "cityId" : String,
    "doorplate" : String
});

//Model
//构造函数
var AddressModel = mongoose.model('address', addressSchema);
//实例对象


//1.增加用户地址
var addAddr = function(address, cb){
    new AddressModel(address).save(cb);
};
exports.addAddr = addAddr;
//测试
/*addAddr({
    "address": "qhdx-26号楼",
    "contactor": "张三",
    "lat": "39.993851111808",
    "lng": "116.31838249961 ",
    "phone": "17711111111",
    "sex": "1",
    "state": "1",
    "userId": "575f7085f8a14116283dabc7",
    "cityId": "113",
    "doorplate": "212"
}, callback);*/

//2.查询所有用户地址(数组)
var getAddrsByUserId = function(UserId, cb){
    AddressModel.find({userId : UserId}, cb);
};
exports.getAddrsByUserId = getAddrsByUserId;
//测试
//getAddrsByUserId('575f7085f8a14116283dabc8', callback);


//3.更新地址  ///getAddrById?_id=576bc242b20ba0b02ed9c5c
var updateAddr = function (address, cb) {
    AddressModel.update({"_id" : address._id}, address, cb);
};
exports.updateAddr = updateAddr;
//测试
/*updateAddr({

    "_id": "57ae733ea2f88b7010ff9e08",
    "address": "中国银行",
    "contactor": "张三",
    "lat": "39.993851111808",
    "lng": "116.31838249961 ",
    "phone": "17711111111",
    "sex": "1",
    "state": "1",
    "userId": "575f7085f8a14116283dabc7",
    "cityId": "113",
    "doorplate": "212",
    "__v": 0

}, callback);*/


//4.删除一个地址   ///deleteAddr?_id=576bc242b20ba0b02ed9c5cc
/*var deleteAddrById = function(address, cb){
    AddressModel.remove({"_id": address._id}, cb);
};*/
var deleteAddrById = function(id, cb){
    AddressModel.remove({"_id": id}, cb);
};
exports.deleteAddrById = deleteAddrById;
//测试
//deleteAddrById('57aecda20bced47c1b07fca1', callback);

//得到用户的默认地址
var getDefaultAddr = function(userId, cb){
    AddressModel.findOne({userId : userId}, cb);
};
exports.getDefaultAddr = getDefaultAddr;
//测试
//getDefaultAddr('575f7085f8a14116283dabc8', callback);