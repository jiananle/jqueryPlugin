/*$(function(){
    var money =  $('.draggable'),
        timer = null;

    $('.bottom').mouseenter(function(){
        if( !timer ){
            money.addClass('money-transform');
            var obj = $('<div class="money-wrap draggable"><img src="img/rmb.png"></div>');
            obj.prependTo($('.main'));

            timer = setTimeout(function(){
                money.remove();
                money = obj;
                timer = null;
                $('.bottom').mouseenter();
            }, 2000)
        }
    });
})*/

/*
* 流程：
* 1.移到红包处，cursor:grap;
* 2.点击->cursor:grabbing->计算此时的money与鼠标的位置差->保存此时的拖拽元素
* 3.鼠标拖拽元素想上移动
* */
$(function(){
    var obj = $('.draggable'),
        package = $('.bottom'),
        markDrag = false,
        diffY = 0,
        originY = 0,
        ORIGINBOTTOM = 50;  // 原始的bottom


    package.mousedown(function(event){
        obj.removeClass('animate');
        $(this).removeClass('grab').addClass('grabbing');
        markDrag = true;
        originY = event.clientY;
        diffY = event.clientY - obj.offset().top;

    }).mouseup(function(event){
        $(this).removeClass('grabbing').addClass('grab');
        markDrag = false;
        diffY = 0;
        originY = 0;
        obj.addClass('animate');
        obj.css('bottom', ORIGINBOTTOM+'px');
    });


    $('body').mousemove(function(event){
        if(markDrag){ // 当前有拖拽内容
            var currBottomStr = obj.css('bottom'),
                currBottomNum = currBottomStr.substring(0,currBottomStr.length-2),
                diffOriginY = originY - event.clientY;

            if(currBottomNum >= ORIGINBOTTOM){
                obj.css('bottom', '+='+ diffOriginY);
                originY = event.clientY;
            }else{
                obj.css('bottom', ORIGINBOTTOM+'px');
            }
        }
    }).mouseup(function(event){
        package.removeClass('grabbing').addClass('grab');
        markDrag = false;
        diffY = 0;
        originY = 0;
        obj.addClass('animate');
        obj.css('bottom', ORIGINBOTTOM+'px');
    });
});
