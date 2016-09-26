/**
 * Created by Administrator on 2016/7/26.
 */

$(function(){
    hoverContent();
    hoverNaviSubItems();
    search();
    showShareIcons();
    showAddress();
    changeAddressTabs();
    showMiniCart();
    changeProductTabs();
    moveSmallImgs();
    showMiddleImg();
    showLargeImg();

    //1. 鼠标移入显示,移出隐藏
    function hoverContent(){
        $('[name=show_hide]').hover(function(){
            $('#'+this.id + '_items').show();
        },function(){
            $('#'+this.id + '_items').hide();
        });
    }

    //2. 鼠标移动切换二级导航菜单的切换显示和隐藏
    function hoverNaviSubItems(){
        $('#category_items>div').hover(function(){
            $(this).children('div').show();
        }, function(){
            $(this).children('div').hide();
        });
    }

    //3. 输入搜索关键字, 列表显示匹配的结果
    function search(){
        $('#txtSearch')
        /*    .keyup(function(){
            if($.trim(this.value) != ''){
                $('#search_helper').show();
            }
        }).focus(function(){
            if($.trim(this.value) != ''){
                $('#search_helper').show();
            }
        })*/
            .on('keyup focus', function(){
                //if($.trim($(this).val()) != ''){
                if($.trim(this.value) != ''){
                    $('#search_helper').show();
                }
            })
            .blur(function(){
            $('#search_helper').hide();
        });
    }

    //4. 点击显示或者隐藏更多的分享图标
    function showShareIcons(){
        var $shareMore = $('#shareMore');
        var $parent = $shareMore.parent();
        var $prevAs =$shareMore.prevAll('a:lt(2)');
        var $child = $shareMore.children();

        $shareMore.click(function(){
            //是不是可以这样写
            if($child.attr('class')=='backword'){
                $parent.css('width', 155);
                $prevAs.hide();
                $child.removeClass();
            }else{
                $parent.css('width', 200);
                $prevAs.show();
                $child.addClass('backword');
            }
        });
    }

    //5. 鼠标移入移出切换地址的显示隐藏
    function showAddress(){
        var $storeSelect = $('#store_select');
        $storeSelect.hover(function(){
            $storeSelect.children('div:gt(0)').show();
        },function(){
            $storeSelect.children('div:gt(0)').hide();
        }).children(':last').click(function(){
            $storeSelect.children('div:gt(0)').hide();
        });
    }

    //6. 点击切换地址tab
    function changeAddressTabs(){
        $('#store_tabs>li').click(function(){
            if($(this).attr('class')=='hover')
            return;
            $(this).siblings().removeClass();
            this.className = 'hover';
        });
    }

    //7. 鼠标移入移出切换显示迷你购物车
    function showMiniCart(){
        var $minicart = $('#minicart');
        $minicart.hover(function(){
            $(this).addClass('mincart');
            $(this).children('div').show();
        },function(){
            $(this).removeClass('mincart');
            $(this).children('div').hide();
        });
    }

    //8. 点击切换产品选项
    function changeProductTabs(){
        var $lis = $('#product_detail>ul>li');
        $lis.click(function(){
            if(this.className != 'current'){
                var $divs = $('#product_info, #product_data, #product_package, #product_comment,#product_saleAfter');
                var $hasCurrent = $(this).siblings('.current');
                $hasCurrent.removeClass();
                $divs.eq($hasCurrent.index()).hide();
                this.className = 'current';
                $divs.eq($(this).index()).show();
            }
        });
    }

    //9. 点击向右/左, 移动当前展示商品的小图片
    function moveSmallImgs(){
        var $backwardA = $('#preview>h1>a:first');
        var $forwardA = $('#preview>h1>a:last');
        var $ul = $('#icon_list');
        var $lis = $('#icon_list>li');
        //设置ul宽度
        $ul.css('width', 62*$lis.length);

        if($lis.length>5){
            //$forwardA[0].className = 'forward';
            $forwardA.attr('class', 'forward');
        }
        var count = 0;
        $forwardA.click(function () {
            if(this.className == 'forward_disabled'){
                return;
            }
            count++;
            if(count == $lis.length-5){
                this.className = 'forward_disabled';
            }
            $ul.css('left', -62*count);
            $backwardA.attr('class', 'backward');
        });

        $backwardA.click(function () {
            if(this.className == 'backward_disabled'){
                return;
            }
            count--;
            if(count == 0){
                this.className = 'backward_disabled';
            }
            $ul.css('left', -62*count);
            $forwardA.attr('class', 'forward');
        });
    }

    //10. 当鼠标悬停在某个小图上,在上方显示对应的中图
    function showMiddleImg(){
        $('#icon_list>li>img').hover(function(){
            //$(this).attr('class', 'hoveredThumb');
            this.className = 'hoveredThumb';
            var src = this.src.replace(/.jpg$/, '-m.jpg');
            $('#mediumImg').attr('src', src);
        },function(){
            //$(this).attr('class', '');
            this.className = '';
        });
    }

    //11.当鼠标在中图上移动时, 显示对应大图的附近部分区域
    function showLargeImg(){
        var $mediumImg = $('#mediumImg');
        var $mask = $('#mask');
        var $maskTop = $('#maskTop');
        var $largeImgContainer = $('#largeImgContainer');
        var $loading = $('#loading');
        var $largeImg = $('#largeImg');
        $maskTop.mouseover(function(){

            $mask.show();
            $largeImgContainer.show();
            $loading.show();
            var largeSrc = $mediumImg.attr('src').replace(/m\.jpg$/, 'l.jpg');
            $largeImg.attr('src', largeSrc);
            $largeImg.on('load', function(){
                var largeWidth = $largeImg.width();
                var largeHeight = $largeImg.height();
                $largeImgContainer.css({
                    width: largeWidth/2,
                    height: largeHeight/2
                });
                $loading.hide();
                $largeImg.show();
                $maskTop.mousemove(function(event){
                    var eventX = event.offsetX;
                    var eventY = event.offsetY;
                    var maskWidth = $mask.width();
                    var maskHeight = $mask.height();
                    var maskTopWidth = $maskTop.width();
                    var maskTopHeight = $maskTop.height();
                    var left = eventX - maskWidth/2;
                    var top = eventY - maskHeight/2;
                    if(left<0){
                        left = 0;
                    }else if(left > maskTopWidth - maskWidth){
                        left = maskTopWidth - maskWidth;
                    }
                    if(top<0){
                        top = 0;
                    }else if(top > maskTopHeight - maskHeight){
                        top = maskTopHeight - maskHeight;
                    }
                    $mask.css({
                        left: left,
                        top: top
                    });
                    $largeImg.css({
                        left: -left*largeWidth/maskTopWidth,
                        top: -top*largeHeight/maskTopHeight
                    });

                })
            });
        }).mouseout(function(){
            $largeImg.hide();
            $mask.hide();
            $largeImgContainer.hide();
        });
    }

});