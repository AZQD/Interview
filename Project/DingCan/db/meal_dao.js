/**
 * Created by Administrator on 2016/8/15.
 */
var connect = require('./connection');
var mongoose = connect.mongoose;

//测试
//connect.connect();
//function callback(error, result){
//    console.log(error, result);
//}
//Schema
var mealSchema = new mongoose.Schema({
    "group_id": Number,
    "groupName": String,
    "mealCode": String,
    "mealType": Number,
    "mealName": String,
    "price": Number,
    "originalPrice": Number,
    "picture": String,
    "instruction": String,
    "sales": Number,
    "state": String
});

//Model
//meals就是对应的数据库中的meals文件内容
var MealModel = mongoose.model('meals', mealSchema);

//获取所有的meal
function getMeals(cb){
    MealModel.find(cb);
}
exports.getMeals = getMeals;
//测试
//getMeals(callback);