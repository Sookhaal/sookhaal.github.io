var buttonSize;

$(function(){
    positionDiv();
});

$(window).resize(function () {
    positionDiv();
});

//6
$("#b61").click(function (e){
    colorize(12,5,"05cdff", "000");
    colorize(6,11,"2b77de", "000");
});
$("#b62").click(function (e){
    colorize(1,6,"05cdff", "000");
    colorize(7,12,"2b77de", "000");
});
$("#b63").click(function (e){
    colorize(2,7,"05cdff", "000");
    colorize(8,1,"2b77de", "000");
});
$("#b64").click(function (e){
    colorize(3,8,"05cdff", "000");
    colorize(9,2,"2b77de", "000");
});
$("#b65").click(function (e){
    colorize(4,9,"05cdff", "000");
    colorize(10,3,"2b77de", "000");
});
$("#b66").click(function (e){
    colorize(5,10,"05cdff", "000");
    colorize(11,4,"2b77de", "000");
});

//4
$("#b41").click(function (e){
    colorize(12,3,"05cdff", "000");
    colorize(4,7,"ffb005", "000");
    colorize(8,11,"c1ff05", "000");
});
$("#b42").click(function (e){
    colorize(1,4,"05cdff", "000");
    colorize(5,8,"ffb005", "000");
    colorize(9,12,"c1ff05", "000");
});
$("#b43").click(function (e){
    colorize(2,5,"05cdff", "000");
    colorize(6,9,"ffb005", "000");
    colorize(10,1,"c1ff05", "000");
});
$("#b44").click(function (e){
    colorize(3,6,"05cdff", "000");
    colorize(7,10,"ffb005", "000");
    colorize(11,2,"c1ff05", "000");
});

//3
$("#b31").click(function (e){
    colorize(12,2,"f646fd", "000");
    colorize(3,5,"05cdff", "000");
    colorize(6,8,"ffb005", "000");
    colorize(9,11,"c1ff05", "000");
});
$("#b32").click(function (e){
    colorize(1,3,"f646fd", "000");
    colorize(4,6,"05cdff", "000");
    colorize(7,9,"ffb005", "000");
    colorize(10,12,"c1ff05", "000");
});
$("#b33").click(function (e){
    colorize(2,4,"f646fd", "000");
    colorize(5,7,"05cdff", "000");
    colorize(8,10,"ffb005", "000");
    colorize(11,1,"c1ff05", "000");
})

function positionDiv(){
    $("#groupbuttons").css({
        "marginTop":$("#5").offset().top - $("#11").offset().top +$("#5").width()+80+ "px"
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

function colorize(from, to, bgcolor, textcolor){
    if (from-to <0){
        for (var i = from-1; i <= to-1; i++){
            $("#"+i).css({
                "background-color":"#"+bgcolor,
                "color":"#"+textcolor
            });
        }
    } else {
        for (var i = from-1; i <= 11; i++){
            $("#"+i).css({
                "background-color":"#"+bgcolor,
                "color":"#"+textcolor
            });
        }
        for (var i = to-1; i >= 0; i--){
            $("#"+i).css({
                "background-color":"#"+bgcolor,
                "color":"#"+textcolor
            });
        }
    }
}