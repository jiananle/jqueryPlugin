(function($){
    $.fn.orbit = function(options){

        var defaults = {
            animation: 'fade', //fade, horizontal-slide, vertical-slide
            animationSpeed: 800, //how fast animations are
            directionalNav: true, //manual advancing directional navs
            captions: true, //do you want captions?
            captionAnimationSpeed: 800, //if so how quickly should they animate in
            isAuto:true, //true or false to auto advance
            autoTime: 4000, // auto advance time
            bullets: false //true or false to activate the bullet navigation
        };

        var options = $.extend(defaults, options);

        return this.each(function(){

            //important global properties
            var activeImage = 0,
                numberImages = 0,
                orbit = $(this).addClass('orbit'),
                orbitWidth = orbit.width(),
                orbitHeight = orbit.height(),
                locked = false;

            // count image
            var images = orbit.find('img, a img');
            numberImages = images.length;
            images.eq(activeImage).css({"z-index" : 3});

            //set auto advance
            if(options.isAuto){
                var clock,timeRunning;
                function startAuto(){
                    timeRunning = true;
                    clock = setInterval(function(){
                        shift('next');
                    },options.autoTime);
                }

                function stopAuto(){
                    timeRunning = false;
                    clearInterval(clock);
                }

                orbit.mouseenter(function(){
                    if(timeRunning){
                        stopAuto();
                    }
                }).mouseleave(function(){
                    if(!timeRunning){
                        startAuto();
                    }
                });

                startAuto();
            }

            //animation locking functions
            function unlock() {
                locked = false;
            }
            function lock() {
                locked = true;
            }

            //set caption
            if(options.captions){
                var _captionsHTML = '<div class="caption"><span class="orbit-caption"></span></div>';
                orbit.append(_captionsHTML);

                var captionParent = orbit.children('.caption'),
                    caption = captionParent.children('.orbit-caption').show();

                function setCaption(){
                    var _captionID = images.eq(activeImage).attr('rel'), // target caption ID
                        _captionHTML = $('#' + _captionID).html(), // target caption
                        _captionHeight = caption.height() + 20;

                    caption.attr('id','#'+_captionID).html(_captionHTML);

                    if(!_captionHTML){
                        captionParent.animate({bottom : -_captionHeight}, options.captionAnimationSpeed);
                    }else{
                        captionParent.animate({bottom : '0'}, options.captionAnimationSpeed);
                    }
                }

                setCaption();
            }


            //DirectionalNav { rightButton --> shift("next"), leftButton --> shift("prev");
            if(options.directionalNav){
                var _navHTML = '<div class="slider-nav"><span class="left"></span><span class="right"></span></div>';
                orbit.append(_navHTML);

                var nav = orbit.children('.slider-nav'),
                    leftBtn = nav.children('.left'),
                    rightBtn = nav.children('.right');

                leftBtn.click(function(){
                    shift("prev");
                });

                rightBtn.click(function(){
                    shift("next");
                })

            }

            //set bullets
            if(options.bullets){
                var bulletHTML = '<ul class="orbit-bullets"></ul>';
                orbit.append(bulletHTML);

                var bullets = orbit.children('.orbit-bullets'),
                    i,item = null;
                // add items
                for(i = 0; i < numberImages; i++){
                    item = $('<li>'+i+'</li>');
                    bullets.append(item);

                    item.attr('data-idx',i);
                }

                bullets.click(function(event){
                    var target = $(event.target),
                        idx = target.attr('data-idx');

                    shift(idx);
                });

                function setActiveBullet(){
                    bullets.children('li').removeClass('active').eq(activeImage).addClass('active');
                }

                setActiveBullet();
            }

            // slide image
            function shift(direction){
                var prevActiveImage = activeImage,
                    slideDirection = direction;

                if(prevActiveImage == slideDirection){ return false; }

                //reset Z & Unlock
                function resetAndUnlock() {
                    images.eq(prevActiveImage).css({"z-index" : 1});
                    unlock();
                }

                if(!locked){
                    lock();

                    if(direction == 'next'){
                        activeImage++;
                        if(activeImage == numberImages){
                            activeImage = 0;
                        }

                    }else if(direction == 'prev'){
                        activeImage--;
                        if(activeImage < 0){
                            activeImage = numberImages - 1;
                        }

                    }else{
                        activeImage = direction;
                        if (prevActiveImage < activeImage) {
                            slideDirection = "next";
                        } else if (prevActiveImage > activeImage) {
                            slideDirection = "prev"
                        }
                    }

                    //set to correct bullet
                    if(options.bullets) { setActiveBullet(); }

                    if(options.animation == 'fade'){
                        images.eq(prevActiveImage).css({"z-index" : 2});
                        images.eq(activeImage).css({"opacity" : 0, "z-index" : 3})
                            .animate({"opacity" : 1}, options.animationSpeed, resetAndUnlock);

                        if(options.captions) { setCaption(); }

                    }

                    if(options.animation == 'horizontal-slide'){
                        images.eq(prevActiveImage).css({"z-index" : 2});
                        if(slideDirection == 'next'){
                            images.eq(activeImage)
                                .css({'left' : -orbitWidth, 'z-index' : 3})
                                .animate({'left' : 0}, options.animationSpeed, resetAndUnlock);

                        }else if(slideDirection == 'prev'){
                            images.eq(activeImage)
                                .css({'left' : orbitWidth, 'z-index' : 3})
                                .animate({'left' : 0}, options.animationSpeed, resetAndUnlock);
                        }

                        if(options.captions) { setCaption(); }

                    }

                    if(options.animation == 'vertical-slide'){
                        images.eq(prevActiveImage).css({"z-index" : 2});
                        if(slideDirection == 'next'){
                            images.eq(activeImage)
                                .css({'top' : -orbitHeight, 'z-index' : 3})
                                .animate({'top' : 0}, options.animationSpeed, resetAndUnlock);

                        }else if(slideDirection == 'prev'){
                            images.eq(activeImage)
                                .css({'top' : orbitHeight, 'z-index' : 3})
                                .animate({'top' : 0}, options.animationSpeed, resetAndUnlock);
                        }

                        if(options.captions) { setCaption(); }
                    }
                }

            }
        });
    }

})(jQuery)