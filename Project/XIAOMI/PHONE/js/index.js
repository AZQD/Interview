/**
 * Created by Administrator on 2016/9/6.
 */
$('#slide .img li a').soChange({      //轮播大图片
    thumbObj:'#slide .point li',//轮播小图片
//导航图标，选择器直接指向图标对象
    //botPrev:'#carousel .last',//上一个
    //botNext:'#carousel .next',//下一个
    thumbNowClass:'now',//自定义当前小图片的边框等样式
    //autoChange:false, //自动切换为 false，默认为true
    //thumbOverEvent:false,// 关闭鼠标经过thumbObj切换事件，只有点击thumbObj时才切换对象
    //slideTime:0,//平滑过渡间歇为0，意味着直接切换
    changeTime:2000//自定义切换时间
});