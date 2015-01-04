$(function(){
    var moneys = $('.draggable'),
        obj = null,
        i = moneys.length - 1,
        freeMoveTrigger = false, // 自由移动触发器
        FREEMOVEY = 315, // 自由移动开始的位移
        ORIGINBOTTOM = 50,  // 原始的bottom
        originY; // 鼠标初始的位移


    $('body').mousedown(function(event){
        if(i >= 0){
            $(this).removeClass('grab').addClass('grabbing');

            obj = moneys.eq(i);
            originY = event.clientY;
        }


    }).mousemove(function(event){
        if(obj !== null){
            event.preventDefault();

            var objBottomStr = obj.css('bottom'),
                objBottomNum = objBottomStr.substring(0, objBottomStr.length-2),
                diffOriginY = originY - event.clientY;

            if(objBottomNum > ORIGINBOTTOM || (objBottomNum == ORIGINBOTTOM && diffOriginY > 0)){
                obj.css('bottom', '+=' + diffOriginY);
                freeMoveTrigger = objBottomNum > FREEMOVEY;
                originY = event.clientY;

            }else{
                freeMoveTrigger = false;
                return;
            }
        }

    }).mouseup(function(event){

        $(this).removeClass('grabbing').addClass('grab');

        if(freeMoveTrigger){
            var left = obj.attr('data-left'),
                bottom = obj.attr('data-bottom');

            obj.addClass('animate transform');
            obj.css({
                'left': left + 'px',
                'bottom': bottom + 'px'
            });

            i--;
        }else{
            var objBottomStr = obj.css('bottom'),
                objBottomNum = objBottomStr.substring(0, objBottomStr.length-2);

            if(objBottomNum - ORIGINBOTTOM > 20){
                obj.animate({
                    'bottom': ORIGINBOTTOM
                },1500);
            }else{
                obj.css('bottom', ORIGINBOTTOM);
            }

        }

        obj = null;
    });

});
