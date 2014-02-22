var elems = $("#circle").children("h3");
var tempText = "";
var increase = Math.PI * 2 / 12;
var x = 0, y = 0, angle = -3*increase, elem;
var tones = new Array();
tones[0] = "A";
tones[1] = "A#";
tones[2] = " B ";
tones[3] = "C";
tones[4] = "C#";
tones[5] = "D";
tones[6] = "D#";
tones[7] = "E";
tones[8] = "F";
tones[9] = "F#";
tones[10] = "G";
tones[11] = "G#";

var tempTones = new Array();
var toneIndex = new Array();

$(function(){
    for (var i = 0; i < 12; i++) {
        elems[i].id = i;
        setupCircle();
        $("#"+i).text(""+tones[i]);
        tempTones[i] = tones[i];
        toneIndex[i] = tones[i];
        setupIndex(i);
    }

    $("#randomize").button().click(function(event){
        event.preventDefault();
        randomCircle();
        //bFix();
    });

    $("#useSeed").button().click(function(event){
        event.preventDefault();
        useSeed();
        //bFix();
    });

    setupSeed();
    //bFix();
    //$("#0").css('color', 'red');
});

$(window).resize(function () {
    setupCircle();
    //$("#seed").val(window.innerWidth);
});

/*function bFix(){
    for (var i = 0; i < 12; i++){
        if ($("#"+i).text() == "B"){
            $("#"+i).text(" B ");
        }
    }
}*/

/*function setupCircle(){
    for (var i = 0; i < 12; i++) {
        elem = elems[i];
        if (window.innerWidth >= 606){
            x = 240 * Math.cos(angle) + 165 + window.innerWidth/2 - 450/2;
        } else{
            x = Math.pow(window.innerWidth/2.55,0.99) * Math.cos(angle) + (1/2.55*window.innerWidth);
        }
        if (window.innerWidth >= 726){
            y = 240 * Math.sin(angle) + 320;

        } else if (window.innerWidth < 606){
            y = Math.pow(window.innerWidth/2.55,0.99) * Math.sin(angle)+7/20*window.innerWidth + -1/10*window.innerWidth + 228;
            elem.style.fontSize = 1/101*window.innerWidth-1+"em";
        } else {
            y = 240 * Math.sin(angle) + 390;
            elem.style.width = "1.5em";
            elem.style.fontSize = "5em";
        }
        elem.style.height = elem.style.width;
        elem.style.lineHeight = elem.style.width;
        elem.style.position = 'absolute';
        elem.style.left = x + 'px';
        elem.style.top = y + 'px';
        angle += increase;
    }
}*/

function setupCircle(){
    for (var i = 0; i < 12; i++) {
        elem = elems[i];
        if (window.innerWidth >= 606){
            x = 240 * Math.cos(angle) + 165 + window.innerWidth/2 - 450/2;
        } else{
            x = Math.pow(window.innerWidth/2.55,0.99) * Math.cos(angle) + (1/2.55*window.innerWidth);
        }
        if (window.innerWidth >= 726){
            y = 240 * Math.sin(angle) + 320;

        } else if (window.innerWidth < 606){
            y = Math.pow(window.innerWidth/2.55,0.99) * Math.sin(angle)+7/20*window.innerWidth + -1/10*window.innerWidth + 228;
            elem.style.fontSize = 1/101*window.innerWidth-1+"em";
        } else {
            y = 240 * Math.sin(angle) + 390;
            elem.style.width = "1.5em";
            elem.style.fontSize = "5em";
        }
        elem.style.height = elem.style.width;
        elem.style.lineHeight = elem.style.width;
        elem.style.position = 'absolute';
        elem.style.left = x + 'px';
        elem.style.top = y + 'px';
        angle += increase;
    }
}

function randomCircle(){
    $("#seed").val("");
    shuffle(tempTones);
    for (var i = 0; i < 12; i++) {
        $("#"+i).text(""+tempTones[i]);
        setupIndex(i);
    }
    setupSeed();
}

function useSeed(){
    toneIndex = $("#seed").val().split(" ");
    if (toneIndex.length == 12 && toneIndex[11] != ""){
        for (var i = 0; i < 12; i++) {
            $("#"+i).text(""+tones[toneIndex[i]]);
        }
    } else{
        $("#seed").val("WRONG SEED");
    }
}

function setupIndex(indexPosition){
    for (var i = 0; i < 12; i++){
        if (tempTones[indexPosition] == tones[i]){
            toneIndex[indexPosition] = i;
        }
    }
}

function setupSeed(){
    tempText = toneIndex.toString().replace(/,/g, " ");
    $("#seed").val(tempText);
}

function shuffle(object){
    var output = new Array();
    for(var j, x, i = object.length; i; j = Math.floor(Math.random() * i), x = object[--i], object[i] = object[j], object[j] = x);
    return output;
};