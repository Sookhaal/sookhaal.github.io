define(["require", "exports", "app"], function (require, exports, App) {
    require([
        "app"
    ], function () {
        var app = new App();
        app.init();
    });
});
