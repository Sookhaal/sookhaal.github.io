var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "../framework/shader", "../framework/module"], function (require, exports, Shader, Module) {
    var ShaderModule = (function (_super) {
        __extends(ShaderModule, _super);
        function ShaderModule() {
            _super.apply(this, arguments);
            this.prevTime = performance.now();
            this.transition = false;
        }
        ShaderModule.prototype.init = function (context) {
            var _this = this;
            context.camera.position.z = 1;
            context.renderer.setClearColor(0x000000);
            this.shader = new Shader("raymarcher", function () { return _this.createScene(context); });
        };
        ShaderModule.prototype.createScene = function (context) {
            var geo = new THREE.PlaneBufferGeometry(2, 2);
            var mesh = new THREE.Mesh(geo, this.shader.material);
            context.camera.lookAt(new THREE.Vector3(0, 0, 0));
            context.scene.add(mesh);
            this.audioCtx = new AudioContext();
            this.shadersApplied = true;
            this.resize(context);
        };
        ShaderModule.prototype.resize = function (context) {
            if (!this.shadersApplied)
                return;
            this.shader.uniforms.resolution.value.x = window.innerWidth;
            this.shader.uniforms.resolution.value.y = window.innerHeight;
        };
        ShaderModule.prototype.callback = function (context) {
            this.transition = true;
        };
        ShaderModule.prototype.render = function (context, t) {
            if (!this.shadersApplied)
                return;
            var delta = t - this.prevTime;
            this.shader.uniforms.time.value += delta * .0001;
            this.prevTime = t;
        };
        return ShaderModule;
    })(Module);
    return ShaderModule;
});
