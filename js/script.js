var bContent1 = false, bContent2 = false, bContent3 = false, bContent4 = false;
var widthValue, marginValue, FIREFOX, MOBILE;

jQuery.fn.center = function () {
    this.css("position", "absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + 
                             $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + 
                              $(window).scrollLeft()) + "px");
    return this;
}

function preload(images) {
    if (document.images) {
        var i = 0;
        var imageArray = new Array();
        imageArray = images.split(',');
        var imageObj = new Image();
        for(i=0; i<=imageArray.length-1; i++) {
            imageObj.src=imageArray[i];
        }
    }
}

$("#content1, #content2, #content3, #content4").hide();

$(function () {
    "use strict";
    $('audio').audioPlayer();

    FIREFOX = /Firefox/i.test(navigator.userAgent);
    MOBILE = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    /*if (FIREFOX) {
        $(".left, .right").hide();
        $("#center").css({
            position: "absolute"
        });

        console.log("Test");

        $(".center").center();
    }*/
});

$("#toggle1").click(function (e) {
    "use strict";
    $(this).toggleClass("hovered");

    $("#content1").slideToggle(300, function () {bContent1 = !bContent1});

    if (!bContent1 && !FIREFOX && !MOBILE) {
        widthValue = 900;
        marginValue = 50;
    } else if (FIREFOX){

    } else {
        widthValue = 500;
        marginValue = 30;
    }

    $(".center").animate({width: widthValue}, 300, function () {
        widthValue = 500;
    });

    $(".content_text").animate({marginRight: marginValue, marginLeft: marginValue}, 300, function () { marginValue = 30; });

    e.preventDefault();
});

$("#toggle2").click(function (e) {
    "use strict";
    $(this).toggleClass("hovered");

    $("#content2").slideToggle(300, function () {bContent2 = !bContent2});
    if (!bContent2)
        $('html,body').animate({scrollTop: $("#content2").offset().top},300);

    e.preventDefault();
});

$("#toggle3").click(function (e) {
    "use strict";
    $(this).toggleClass("hovered");

    $("#content3").slideToggle(300, function () {bContent3 = !bContent3});
    if (!bContent3)
        $('html,body').animate({scrollTop: $("#content3").offset().top},300);

    e.preventDefault();
});

$("#toggle4").click(function (e) {
    "use strict";
    $(this).toggleClass("hovered");

    $("#content4").slideToggle(300, function () {bContent4 = !bContent4});
    if (!bContent4)
        $('html,body').animate({scrollTop: $("#content4").offset().top},300);

    e.preventDefault();
});