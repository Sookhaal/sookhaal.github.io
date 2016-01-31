var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "../framework/shader", "../framework/module"], function (require, exports, Shader, Module) {
    var SplashA = (function (_super) {
        __extends(SplashA, _super);
        function SplashA() {
            _super.apply(this, arguments);
            this.prevTime = performance.now();
            this.transition = false;
            this.shaders = [];
            this.shadersDone = 0;
        }
        SplashA.prototype.init = function (context) {
            var _this = this;
            context.camera.position.z = 2;
            context.renderer.setClearColor(0x005050);
            this.shaders[0] = new Shader("splashA", function () { return _this.applyShader(context, 0); });
            context.camera.lookAt(new THREE.Vector3(0, 0, 0));
        };
        SplashA.prototype.applyShader = function (context, index) {
            var geo = new THREE.PlaneBufferGeometry(2, 2);
            var mesh = new THREE.Mesh(geo, this.shaders[index].material);
            context.scene.add(mesh);
            this.shadersDone += 1;
            if (this.shadersDone < this.shaders.length)
                return;
            this.shadersApplied = true;
            this.resize(context);
        };
        SplashA.prototype.resize = function (context) {
            if (!this.shadersApplied)
                return;
            this.shaders.forEach(function (s) {
                s.uniforms.resolution.value.x = window.innerWidth;
                s.uniforms.resolution.value.y = window.innerHeight;
            });
        };
        SplashA.prototype.callback = function (context) {
            this.transition = true;
        };
        SplashA.prototype.render = function (context, t) {
            if (!this.shadersApplied)
                return;
            var delta = t - this.prevTime;
            this.shaders.forEach(function (s) {
                s.uniforms.time.value += delta * .001;
            });
            if (this.transition) {
                this.shaders[0].uniforms.blurTransition.value += .002;
            }
            this.prevTime = t;
        };
        return SplashA;
    })(Module);
    return SplashA;
});
