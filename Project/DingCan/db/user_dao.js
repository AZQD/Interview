/**
 * 操作users
 */
var connection = require('./connection');
var mongoose = connection.mongoose;

/*测试*/
/*注意：没做完一个dao文件就要测试一次！！！*/
/*connection.connect();
function callback(error, result){
    console.log(error, result);
}*/

/*
 数据库中的Schema，为数据库对象的集合，
 一个用户一般对应一个schema。
 */
var Schema = mongoose.Schema;
//console.log(Schema);
var userSchema = new Schema({
    phone : String
});
//Model
//对应数据库当中的users.json文件
var UserModel = mongoose.model('user', userSchema);

//暴露添加用户
var addUser = function(phone, cb){
    new UserModel({phone:phone}).save(cb);
};
exports.addUser = addUser;

//测试
//addUser('12341234123', callback);

//暴露根据手机号查找用户
var getUserByPhone = function(phone, cb){
    UserModel.findOne({phone:phone}, cb);
};
exports.getUserByPhone = getUserByPhone;

//测试
//getUserByPhone('15936239468', callback);