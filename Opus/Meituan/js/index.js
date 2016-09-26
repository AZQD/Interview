window.onload = function(){
	//清除广告APP
    //sessionStorage 缓存
    //下面这种情况用sessionStorage，当点击按钮之后，会暂时消失，当下次浏览器重新打开，
    //这个div会再次出现。
    var box1=document.getElementById("box1");
    var btn=document.getElementById("btn");
    var result=0;
    //判断是否访问过
    result=sessionStorage.getItem('key')===null ? 0 :sessionStorage.getItem('key');
    //console.log(sessionStorage.getItem('result'));//null

    //点击过关闭按钮
    if(result == 1){
        box1.style.display="none";
    }else{
        box1.style.display="block";
    }

    //点击时增加一条记录
    btn.onclick = function(){
        sessionStorage.setItem('key',1);
        box1.style.display="none";
        result=1;
    };

    //名店抢购 倒计时
    var timer=setInterval(getTime,1);


    function getTime(){
        var endTime=new Date("7/30/2018 24:00:00");
        var nowTime=new Date();
        var ts=endTime-nowTime;
        //alert(typeof countDown);

        var hh=Math.floor(ts/1000/60/60%24);
        var mm=Math.floor(ts/1000/60%60);
        var ss=Math.floor(ts/1000%60);

        hh=checkTime(hh);
        mm=checkTime(mm);
        ss=checkTime(ss);

        document.getElementById("hour").innerHTML=hh;
        document.getElementById("minute").innerHTML=mm;
        document.getElementById("second").innerHTML=ss;

    }

    function checkTime(i){
        if(i<10){
            i="0"+i;
        }
        return i;
    }
};