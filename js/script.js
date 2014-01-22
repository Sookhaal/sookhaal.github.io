var bContent1 = false, bContent2 = false, bContent3 = false;
var widthValue, paddingValue, FIREFOX;

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

$("#content1, #content2, #content3").hide();

$(function () {
    "use strict";
    $('audio').audioPlayer();

    FIREFOX = /Firefox/i.test(navigator.userAgent);
    if (FIREFOX) {
        $(".left, .right").hide();
        $("#center").css({
            position: "absolute"
        });
        
        console.log("Test");

        $(".center").center();
    }
});

$(".toggle1").click(function (e) {
    "use strict";
    e.preventDefault();
    $("#content1").slideToggle(300, function () {
        bContent1 = !bContent1;
    });
    
    $(".listen").toggleClass("hovered");
    
    if (!bContent1 && !FIREFOX) {
        widthValue = 900;
        paddingValue = 50;
    } else if (FIREFOX){
        
    } else {
        widthValue = 500;
        paddingValue = 30;
    }
    
    $(".center").animate({width: widthValue}, 300, function () {
        widthValue = 500;
    });
    
    $(".content_text").animate({paddingLeft: paddingValue, paddingRight: paddingValue}, 300, function () { paddingValue = 30; });
});

$(".toggle2").click(function (e) {
    "use strict";
    e.preventDefault();
    
    $(".info").toggleClass("hovered");
    
    $("#content2").slideToggle(300, function () {});
});

$(".toggle3").click(function (e) {
    "use strict";
    e.preventDefault();
    
    $(".contact").toggleClass("hovered");
    
    $("#content3").slideToggle(300, function () {});
});