var buttonSize;

$(function(){
    positionDiv();
    //colorize(1,6);
});

$(window).resize(function () {
    positionDiv();
});

$("#b61").click(function (e){
    colorize(1,6);
});
$("#b62").click(function (e){
    colorize(7,12);
});
$("#b63").click(function (e){
    colorize(3,8);
});
$("#b64").click(function (e){
    colorize(9,2);
});
$("#b65").click(function (e){
    colorize(5,10);
});
$("#b66").click(function (e){
    colorize(11,4);
});

$("#b31").click(function (e){
    colorize(12,2);
});
$("#b32").click(function (e){
    colorize(3,5);
});
$("#b33").click(function (e){
    colorize(6,8);
});
$("#b34").click(function (e){
    colorize(9,11);
});
$("#b35").click(function (e){
    colorize(1,3);
});
$("#b36").click(function (e){
    colorize(4,6);
});
$("#b37").click(function (e){
    colorize(7,9);
});
$("#b38").click(function (e){
    colorize(10,12);
});
$("#b39").click(function (e){
    colorize(2,4);
});
$("#b310").click(function (e){
    colorize(5,7);
});
$("#b311").click(function (e){
    colorize(8,10);
});
$("#b312").click(function (e){
    colorize(11,1);
});

function positionDiv(){
    $("#groupbuttons").css({
        "marginTop":$("#5").offset().top - $("#11").offset().top +$("#5").width()+20+ "px"
    });
    if (window.innerWidth>=450){
        buttonSize = 75;
    } else {
        buttonSize = innerWidth/6;
    }
    $(".button").css({
        "width":buttonSize+"px",
        "height":buttonSize+"px"
    });
}

function colorize(from, to){
    for (var i = 0; i <= 11; i++){
        $("#"+i).css({
            "background-color":"#13171c",
            "color":"#eee"
        });
    }
    if (from-to <0){
        for (var i = from-1; i <= to-1; i++){
            $("#"+i).css({
                "background-color":"#05cdff",
                "color":"#000"
            });
        }
    } else {
        for (var i = from-1; i <= 11; i++){
            $("#"+i).css({
                "background-color":"#05cdff",
                "color":"#000"
            });
        }
        for (var i = to-1; i >= 0; i--){
            $("#"+i).css({
                "background-color":"#05cdff",
                "color":"#000"
            });
        }
    }
}