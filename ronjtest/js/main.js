var elems = $("#circle").children("h3");
var tempText = "";
var increase = Math.PI * 2 / 12;
var x = 0, y = 0, angle = 0, elem;
var tones = new Array();
tones[0] = "C";
tones[1] = "C#";
tones[2] = "D";
tones[3] = "D#";
tones[4] = "E";
tones[5] = "F";
tones[6] = "F#";
tones[7] = "G";
tones[8] = "G#";
tones[9] = "A";
tones[10] = "A#";
tones[11] = "B";

var tempTones = new Array();
var toneIndex = new Array();

$(function(){
    tones = new Array();
tones[0] = "C";
tones[1] = "C#";
tones[2] = "D";
tones[3] = "D#";
tones[4] = "E";
tones[5] = "F";
tones[6] = "F#";
tones[7] = "G";
tones[8] = "G#";
tones[9] = "A";
tones[10] = "A#";
tones[11] = "B";
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
        checkEmpty();
    });

    $("#useSeed").button().click(function(event){
        event.preventDefault();
        useSeed();
        checkEmpty();
    });
    $("#testid").text("  "+tones[11]+"  ");

    setupSeed();
    //$("#0").css('color', 'red');
});

$(window).resize(function () {
    setupCircle();
});

function checkEmpty(){
    for (var i = 0; i < 13; i++){
        if ($("#"+i).text() == "B"){
            $("#"+i).text("THIS");
        }
    }
}

function setupCircle(){
    angle = -1;
    for (var i = 0; i < 12; i++) {
        elem = elems[i];
        x = 150 * Math.cos(angle) + 155 + window.innerWidth/2 - 370/2;
        y = 150 * Math.sin(angle) + 250;
        elem.style.position = 'absolute';
        elem.style.left = x + 'px';
        elem.style.top = y + 'px';
        angle += increase;
    }
}

function randomCircle(){
    //$("#seed").val("");
    shuffle(tempTones);
    for (var i = 0; i < 12; i++) {
        $("#"+i).text(""+tempTones[i]);
        setupIndex(i);
    }
    setupSeed();
}

function useSeed(){
    toneIndex = $("#seed").val().split(" ");
    for (var i = 0; i < 12; i++) {
        $("#"+i).text(""+tones[toneIndex[i]]);
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