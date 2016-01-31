var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "framework/demo", "modules/splashA"], function (require, exports, Demo, SplashA) {
    var SplashDemo = (function (_super) {
        __extends(SplashDemo, _super);
        function SplashDemo(divId) {
            var _this = this;
            _super.call(this, divId);
            this.modules = [];
            this.audio = document.createElement("audio");
            this.audio.src = "res/music.mp3";
            this.audio.volume = 0.1;
            console.log("Done");
            var splashA = new SplashA();
            this.modules.push(splashA);
            this.modules.forEach(function (m) {
                m.init(_this);
            });
            this.renderer.clear();
        }
        SplashDemo.prototype.animate = function (time) {
            var _this = this;
            _super.prototype.animate.call(this, time);
            this.modules.forEach(function (m) {
                if (m.active)
                    m.render(_this, time);
            });
            this.renderer.render(this.scene, this.camera);
        };
        SplashDemo.prototype.start = function () {
            _super.prototype.start.call(this);
        };
        SplashDemo.prototype.stop = function () {
            _super.prototype.stop.call(this);
        };
        SplashDemo.prototype.resize = function () {
            var _this = this;
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.modules.forEach(function (m) {
                if (m.active)
                    m.resize(_this);
            });
        };
        SplashDemo.prototype.callback = function () {
            this.modules[0].callback(this);
        };
        return SplashDemo;
    })(Demo);
    return SplashDemo;
});
