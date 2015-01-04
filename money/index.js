$(function(){
    var moneys = $('.draggable'),
        obj = null,
        i = moneys.length - 1,
        freeMoveTrigger = false, // 自由移动触发器
        FREEMOVEY = 315, // 自由移动开始的位移
        ORIGINBOTTOM = 50,  // 原始的bottom
        originY; // 鼠标初始的位移


    $('body').on('mousedown',function(event){
        if(i >= 0){
            $(this).addClass('grabbing');

            obj = moneys.eq(i);
            originY = event.clientY;
        }


    }).on('mousemove', function(event){
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

    }).on('mouseup', function(){
        if(obj !== null){
            $(this).removeClass('grabbing');

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
        }
    });

    /*
    * mobile
    * */

    $('body').on('touchstart', function(event){
        if(i >= 0){
            var e = event.originalEvent;
            $(this).addClass('grabbing');

            obj = moneys.eq(i);
            originY = e.touches[0].clientY;


        }
    }).on('touchmove', function(event){
        if(obj !== null){
            event.preventDefault();

            var clientY = event.originalEvent.touches[0].clientY,
                objBottomStr = obj.css('bottom'),
                objBottomNum = objBottomStr.substring(0, objBottomStr.length-2),
                diffOriginY = originY - clientY;

            if(objBottomNum > ORIGINBOTTOM || (objBottomNum == ORIGINBOTTOM && diffOriginY > 0)){
                obj.css('bottom', '+=' + diffOriginY);
                freeMoveTrigger = objBottomNum > FREEMOVEY;
                originY = clientY;

            }else{
                freeMoveTrigger = false;
                return;
            }
        }

    }).on('touchend', function(){
        if(obj !== null){
            $(this).removeClass('grabbing');

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
        }
    });

});
