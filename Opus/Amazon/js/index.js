window.onload = function(){
    var carousel=document.querySelector(".carousel");
    var imgs=document.querySelectorAll(".carousel-imgs img");
    carouselImgs(carousel,imgs);
    var lis=document.querySelectorAll(".boomSort ul li");
    var lis2=document.querySelectorAll(".personal li");

    for(var i=0;i<lis.length;i++){
        lis[i].addEventListener("mouseenter",function(){
            this.style.backgroundColor="#E9E9E9";
        },false);
        lis[i].addEventListener("mouseleave",function(){
            this.style.backgroundColor="#F3F3F3";
        },false);
    }
    for(var i=0;i<lis2.length;i++){
        lis2[i].addEventListener("mouseenter",function(){
            this.style.backgroundColor="#E9E9E9";
        },false);
        lis2[i].addEventListener("mouseleave",function(){
            this.style.backgroundColor="#fff";
        },false);
    }

    //carousel 轮播
//obj1是浮动之后的ul，obj2是imgs ,最好都不要换，如果名称换了，下面
//resizeImgWidth(imgs)中的参数也要跟着换。
    function carouselImgs(obj1,obj2){
        //适用于320px-640px移动端，也可以自定义调整。
        var minWidth=320;
        var maxWidth=640;
        var pageXStart=0;
        var pageXEnd=0;
        var imgCurrentWidth=0;
        var index=0;
        //每次刷新页面，需要重置Img的宽度
        resizeImgWidth(imgs);
        window.onresize=function(){
            //每次浏览器调整视窗的时候，需要重置Img的宽度
            resizeImgWidth(imgs);
        };

        obj1.addEventListener("touchstart",function(event){
            var touches=event.targetTouches;
            if(touches.length==1){
                pageXStart=touches[0].pageX;
                pageXEnd=0;
            }
        },false);

        obj1.addEventListener("touchmove",function(event){
            var touches=event.targetTouches;
            if(touches.length==1){
                pageXEnd=touches[0].pageX;
            }
        },false);
        obj1.addEventListener("touchend",function(){
            if(pageXEnd==0){
                return;
            }
            if((pageXEnd-pageXStart)<0){
                /////////////////////
                obj1.style.transition="1s linear";
                //console.log("手指左划");
                index++;
                if(index>=obj2.length){
                    index=0;
                }
                obj1.style.marginLeft=(0-imgCurrentWidth*index)+"px";
                //////////////////////
                if((obj2.length-1)==index){
                    setTimeout(function(){
                        replay();
                    },1001);
                }

            }

            if((pageXEnd-pageXStart)>0){
                //console.log("手指右划");
                if(index==0){
                    index=obj2.length;
                }
                index--;
                obj1.style.marginLeft=(0-imgCurrentWidth*index)+"px";
            }

        },false);


        /////////////////
        function replay(){
            index = 0;
            obj1.style.transition = "none";
            obj1.style.marginLeft = 0+"px";
        }

        function resizeImgWidth(obj){

            for(var i=0;i<obj.length;i++){
                //1如果屏幕足够大，图片宽度 640
                var  currentWidth=window.innerWidth;//就是当前HTML文档宽度
                if(currentWidth>640){
                    obj[i].style.width=640+"px";
                    imgCurrentWidth=maxWidth;
                    //alert(imgCurrentWidth);
                }
                //2、如果屏幕宽度再320 --- 640之间，应该自适应，就是可视宽度。
                if(currentWidth>=320 && currentWidth<=640){
                    obj[i].style.width=currentWidth+"px";
                    imgCurrentWidth=currentWidth;
                    //alert(imgCurrentWidth);
                }
                //3、如果屏幕宽度小于320，宽度就是320
                if(currentWidth<320){
                    obj[i].style.width=minWidth+"px";
                    imgCurrentWidth=minWidth;
                    // alert(imgCurrentWidth);
                }
            }
        }


    }
};