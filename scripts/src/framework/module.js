define(["require", "exports"], function (require, exports) {
    var Module = (function () {
        function Module() {
            this.active = false;
            this.shadersApplied = false;
        }
        Module.prototype.init = function (context) { };
        Module.prototype.callback = function (context) { };
        Module.prototype.resize = function (context) { };
        Module.prototype.activate = function (context) {
            this.active = true;
            this.resize(context);
        };
        Module.prototype.render = function (context, t) { };
        return Module;
    })();
    return Module;
});
