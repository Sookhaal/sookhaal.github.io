$(function(){
});

$("#seedcreator").button().click(function(event){
    event.preventDefault();
    $("body").load("seedcreator.html");
});

$("#clock").button().click(function(event){
    event.preventDefault();
    $("body").load("clock.html");
});