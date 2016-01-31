define(["require", "exports"], function (require, exports) {
    var Div = (function () {
        function Div(id) {
            this.element = document.getElementById(id);
        }
        Div.prototype.show = function () {
            this.element.style.opacity = "1";
            this.element.style.visibility = "visible";
        };
        Div.prototype.hide = function () {
            this.element.style.opacity = "0";
            this.element.style.visibility = "hidden";
        };
        return Div;
    })();
    return Div;
});
