window.onload = function(){
	//������APP
    //sessionStorage ����
    //�������������sessionStorage���������ť֮�󣬻���ʱ��ʧ�����´���������´򿪣�
    //���div���ٴγ��֡�
    var box1=document.getElementById("box1");
    var btn=document.getElementById("btn");
    var result=0;
    //�ж��Ƿ���ʹ�
    result=sessionStorage.getItem('key')===null ? 0 :sessionStorage.getItem('key');
    //console.log(sessionStorage.getItem('result'));//null

    //������رհ�ť
    if(result == 1){
        box1.style.display="none";
    }else{
        box1.style.display="block";
    }

    //���ʱ����һ����¼
    btn.onclick = function(){
        sessionStorage.setItem('key',1);
        box1.style.display="none";
        result=1;
    };

    //�������� ����ʱ
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