$(function(){
    var dragging = null,
        diffX = 0,
        diffY = 0;

    $('.draggable').mousedown(function(event){
        dragging = $(this);
        diffX = event.clientX - $(this).offset().left;
        diffY = event.clientY - $(this).offset().top;

        console.log(diffX);
    }).mouseup(function(){
        dragging = null;
    });

    $('body').mousemove(function(event){
        if(dragging !== null){
            console.log(event.clientX);
            dragging.css('left', (event.clientX - diffX) + "px");
            dragging.css('top', (event.clientY - diffY) + "px");
        }

    });

})
