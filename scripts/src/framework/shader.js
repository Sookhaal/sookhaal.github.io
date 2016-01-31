define(["require", "exports"], function (require, exports) {
    var Shader = (function () {
        function Shader(shaderName, callback) {
            this.shaderName = shaderName;
            this.request = new XMLHttpRequest();
            this.callback = callback;
            this.load();
        }
        Shader.prototype.load = function () {
            if (this.uniforms === undefined)
                this.loadUniforms();
            else if (this.vertexShader === undefined)
                this.loadVertexShader();
            else if (this.fragmentShader === undefined)
                this.loadFragmentShader();
            else
                console.log("Warning: You're trying to load " + this.shaderName + " multiple times.");
        };
        Shader.prototype.loadUniforms = function () {
            var _this = this;
            this.request.onloadend = function () {
                if (_this.request.status === 200) {
                    _this.uniforms = JSON.parse(_this.request.responseText);
                }
                else if (_this.request.status === 404) {
                    _this.uniforms = {
                        time: { type: "f", value: 1.0 },
                        audioTime: { type: "f", value: 1.0 },
                        resolution: { type: "v2", value: new THREE.Vector2() }
                    };
                }
                _this.loadVertexShader();
            };
            this.request.open("GET", "/res/shaders/" + this.shaderName + "/uniforms.json", true);
            this.request.send();
        };
        Shader.prototype.loadVertexShader = function () {
            var _this = this;
            this.request.onloadend = function () {
                _this.vertexShader = _this.request.responseText;
                _this.loadFragmentShader();
            };
            this.request.open("GET", "/res/shaders/" + this.shaderName + "/vertex.c", true);
            this.request.send();
        };
        Shader.prototype.loadFragmentShader = function () {
            var _this = this;
            this.request.onloadend = function () {
                _this.fragmentShader = _this.request.responseText;
                _this.material = new THREE.ShaderMaterial({
                    uniforms: _this.uniforms,
                    vertexShader: _this.vertexShader,
                    fragmentShader: _this.fragmentShader
                });
                if (_this.callback)
                    _this.callback();
                else
                    console.log("No callback found for " + _this.shaderName + ".");
            };
            this.request.open("GET", "/res/shaders/" + this.shaderName + "/fragment.c", true);
            this.request.send();
        };
        return Shader;
    })();
    return Shader;
});
