let $wrap = $("#wraper"),
    $container = $("#wraper .container"),
    now = 1,
    p,
    itemLength = $("#wraper .item").length;

!function init() {
    for(let i = 0; i<itemLength; i++){
        let span = document.createElement('span');
        $("#wraper .pagination").append(span);
    }
    $("#wraper .pagination span").eq(0).addClass('on');
    $container.append( $("#wraper .item:first").clone() )
        .prepend( $("#wraper .item:nth-last-child(2)").clone() )
        .css( {"transform":"translateX("+ -$wrap.width() +"px)"} )
}();

function slide(index){
    if(index === "prev"){
        if(now <= 0){
            p = itemLength * -$wrap.width();
            $container.css( {"transition-duration":0+"ms","transform":"translateX("+p+"px)"} );
            now = itemLength
        }
        now --;
    }else if(index === "next"){
        if(now >= itemLength ){
            $container.css( {"transition-duration":0+"ms","transform":"translateX("+0+"px)"} );
            now = 0
        }
        now ++
    }else{
        now = index
    }

    p = now * -$wrap.width();

    $container.css({"transition-duration":800+"ms","transform":"translateX("+p+"px)"});
    $("#wraper .pagination span").eq(now-1).addClass('on').siblings().removeClass('on')
}

$("#wraper .pagination span").on('click', function () {
    slide($(this).index()+1);
});

$("#wraper .btn-prev").on('click', () => slide('prev'));
$("#wraper .btn-next").on('click', () => slide('next'));

let timerId = setTimer();

function setTimer() {
    return setInterval( () => slide('next') ,3000)
}

$wrap.on('mouseenter', () => clearInterval(timerId) ).on('mouseleave', () => timerId = setTimer() );