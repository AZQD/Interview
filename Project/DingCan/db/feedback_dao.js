/**
 * 操作feedback的dao
 * {
  "_id": {
    "$oid": "57624634edb35fb81e258e34"
  },
  "user_id": "57623dd0a20d4fc41cb26d53",
  "phone": "15611111111",
  "content": "have a good day",
  "create_time": {
    "$date": "2016-06-16T14:24:52.070+0800"
  }
}
 */
var connection = require('./connection');
var mongoose = connection.mongoose;

/*/!*测试*!/
connection.connect();
function callback(error, result){
    console.log(error, result);
}*/


//Schema
var Schema = mongoose.Schema;
var feedbackSchema = new Schema({
    "user_id" : String,
    "phone" : String,
    "content" : String,
    create_time : {
        type : Date, //类型
        default : Date.now() //默认值
    }
});
//Model
//对应数据库当中的feedbacks.json文件
var FeedbackModel = mongoose.model('feedback', feedbackSchema);

//暴露添加反馈
var addFeedback = function(feedback, cb){
    new FeedbackModel(feedback).save(cb);
};
exports.addFeedback = addFeedback;

//测试
/*
addFeedback({
    "user_id" : '57ac66f2321445c0064a3126',
    "phone" : '12345654321',
    "content" : '不错'
}, callback);*/
