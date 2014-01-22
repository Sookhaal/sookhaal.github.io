$("#content1, #content2, #content3").hide();
$( function() {
    $( 'audio' ).audioPlayer();
});

var bContent1 = false, bContent2 = false, bContent3 = false;
var widthValue, paddingValue;

$(".toggle1").click(function (e) {
    "use strict";
    e.preventDefault();
    $("#content1").slideToggle(300, function () {
        bContent1 = !bContent1;
    });
    
    $(".listen").toggleClass("hovered");
    
    if (!bContent1) {
        widthValue = 900;
        paddingValue = 50;
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