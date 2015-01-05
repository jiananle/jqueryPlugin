window.onload = function(){
    var wrap = document.querySelector('.main'),
        moneys = document.querySelectorAll('.draggable'),
        obj = null,
        i = moneys.length - 1,
        freeMoveTrigger = false, // 自由移动触发器
        FREEMOVEY = 315, // 自由移动开始的位移
        ORIGINBOTTOM = 50,  // 原始的bottom
        originY; // 鼠标初始的位移

    var classFunc = classie();

    wrap.addEventListener('mousedown', function(event){
        if(i >= 0){
            var target = event.currentTarget;
            classFunc.addClass(target, 'grabbing');

            obj = moneys[i];
            classFunc.removeClass(obj, 'fast-animate');

            originY = event.clientY;
        }

    }, false);

    wrap.addEventListener('mousemove', function(event){

        if(obj !== null){
            event.preventDefault();
            var objBottomStr = window.getComputedStyle(obj, null).bottom,
                objBottomNum = objBottomStr.substring(0, objBottomStr.length-2),
                diffOriginY = originY - event.clientY;

            if(objBottomNum > ORIGINBOTTOM || (objBottomNum == ORIGINBOTTOM && diffOriginY > 0)){

                obj.style.bottom = parseInt(objBottomNum,10) + parseInt(diffOriginY,10) + 'px';
                freeMoveTrigger = objBottomNum > FREEMOVEY;
                originY = event.clientY;

            }else{
                freeMoveTrigger = false;
                return;
            }
        }

    }, false);

    wrap.addEventListener('mouseup', function(event){
        if(obj !== null){
            var target = event.currentTarget;
            classFunc.removeClass(target, 'grabbing');

            if(freeMoveTrigger){
                var left = obj.getAttribute('data-left'),
                    bottom =  obj.getAttribute('data-bottom');

                classFunc.addClass(obj, 'animate');
                classFunc.addClass(obj, 'transform');

                obj.style.left = left + 'px';
                obj.style.bottom = bottom + 'px';

                i--;
            }else{
                var objBottomStr = window.getComputedStyle(obj, null).bottom,
                    objBottomNum = objBottomStr.substring(0, objBottomStr.length-2);

                if(objBottomNum - ORIGINBOTTOM > 20){
                    classFunc.addClass(obj, 'fast-animate');
                }
                obj.style.bottom = ORIGINBOTTOM + 'px';

            }

            obj = null;
        }
    }, false);


    /*
    * mobile
    * */
    wrap.addEventListener('touchstart', function(event){
        if(i >= 0){
            obj = moneys[i];
            classFunc.removeClass(obj, 'fast-animate');

            originY = event.touches[0].clientY;

        }

    }, false);

    wrap.addEventListener('touchmove', function(event){
        if(obj !== null){
            event.preventDefault();

            var objBottomStr = window.getComputedStyle(obj, null).bottom,
                objBottomNum = objBottomStr.substring(0, objBottomStr.length-2),
                diffOriginY = originY - event.touches[0].clientY;

            if(objBottomNum > ORIGINBOTTOM || (objBottomNum == ORIGINBOTTOM && diffOriginY > 0)){

                obj.style.bottom = parseInt(objBottomNum,10) + parseInt(diffOriginY,10) + 'px';
                freeMoveTrigger = objBottomNum > FREEMOVEY;
                originY = event.touches[0].clientY;

            }else{
                freeMoveTrigger = false;
                return;
            }
        }

    }, false);

    wrap.addEventListener('touchend', function(event){
        if(obj !== null){

            if(freeMoveTrigger){
                var left = obj.getAttribute('data-left'),
                    bottom =  obj.getAttribute('data-bottom');

                classFunc.addClass(obj, 'animate');
                classFunc.addClass(obj, 'transform');

                obj.style.left = left + 'px';
                obj.style.bottom = bottom + 'px';

                i--;
            }else{
                var objBottomStr = window.getComputedStyle(obj, null).bottom,
                    objBottomNum = objBottomStr.substring(0, objBottomStr.length-2);

                if(objBottomNum - ORIGINBOTTOM > 20){
                    classFunc.addClass(obj, 'fast-animate');
                }
                obj.style.bottom = ORIGINBOTTOM + 'px';

            }

            obj = null;
        }
    }, false);



    /*
    * Services
    * */

    function classie(){
         // class helper functions from bonzo https://github.com/ded/bonzo

         function classReg( className ) {
             return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
         }
        
        // altho to be fair, the api sucks because it won't accept multiple classes at once
         var hasClass, addClass, removeClass;

         if ( 'classList' in document.documentElement ) {
             hasClass = function( elem, c ) {
                 return elem.classList.contains( c );
             };
             addClass = function( elem, c ) {
                 elem.classList.add( c );
             };
             removeClass = function( elem, c ) {
                 elem.classList.remove( c );
             };
         }
         else {
             hasClass = function( elem, c ) {
                 return classReg( c ).test( elem.className );
             };
             addClass = function( elem, c ) {
                 if ( !hasClass( elem, c ) ) {
                     elem.className = elem.className + ' ' + c;
                 }
             };
             removeClass = function( elem, c ) {
                 elem.className = elem.className.replace( classReg( c ), ' ' );
             };
         }

         function toggleClass( elem, c ) {
             var fn = hasClass( elem, c ) ? removeClass : addClass;
             fn( elem, c );
         }

         return {  // full names
            hasClass: hasClass,
            addClass: addClass,
            removeClass: removeClass,
            toggleClass: toggleClass
        };
    }

 };
