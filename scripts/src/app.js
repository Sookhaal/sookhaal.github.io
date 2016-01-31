define(["require", "exports", "splashDemo", "framework/div"], function (require, exports, SplashDemo, Div) {
    var App = (function () {
        function App() {
            this.splashDiv = new Div("splash");
            this.splashDemo = new SplashDemo("splash-demo");
        }
        App.prototype.init = function () {
            var _this = this;
            document.getElementById("start-button").onclick = function () { return _this.startDemo(); };
            this.splashDemo.start();
            this.splashDemo.div.show();
            setTimeout(function () { _this.splashDiv.show(); }, 4000);
        };
        App.prototype.startDemo = function () {
            var _this = this;
            this.splashDemo.div.hide();
            this.splashDiv.hide();
            this.splashDemo.callback();
            setTimeout(function () { _this.splashDemo.stop(); }, 5000);
        };
        return App;
    })();
    return App;
});
