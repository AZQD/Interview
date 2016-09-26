/**
 * Created by Administrator on 2016/8/15.
 */
var connect = require('./connection');
var mongoose = connect.mongoose;

//测试
/*connect.connect();
function callback(error, result){
    console.log(error, result);
    console.log(result.length);
}*/

//Schema  限制
var bannerSchema = new mongoose.Schema({
    img_src : String,
    link : String,
    sort : Boolean
});

//Model
//index_banner不用加s
var BannerModel = mongoose.model('index_banner', bannerSchema);

/**
 *
 * @param cb
 */
function getBanners(cb){
    BannerModel.find(cb);
}
exports.getBanners = getBanners;
//测试，可以获取数据库中的指定内容
//getBanners(callback);