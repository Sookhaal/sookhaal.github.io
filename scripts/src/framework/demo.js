define(["require", "exports", "framework/div"], function (require, exports, Div) {
    var Demo = (function () {
        function Demo(divId) {
            this.modules = [];
            this.camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 10000);
            this.scene = new THREE.Scene();
            this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            this.renderer.autoClear = false;
            this.renderer.setClearColor(0xF00000);
            this.renderer.setPixelRatio(window.devicePixelRatio);
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.div = new Div(divId);
            this.div.element.appendChild(this.renderer.domElement);
            window.onresize = this.resize.bind(this);
        }
        Demo.prototype.start = function () {
            this.modules[0].activate(this);
            this.animate(performance.now());
        };
        Demo.prototype.stop = function () {
            if (this.audio)
                this.audio.pause();
        };
        Demo.prototype.resize = function () {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        };
        Demo.prototype.callback = function () { };
        Demo.prototype.animate = function (time) {
            requestAnimationFrame(this.animate.bind(this));
            this.renderer.clear();
        };
        return Demo;
    })();
    return Demo;
});
