var Clock = /** @class */ (function () {
    function Clock(clockId) {
        this.clockElement = document.getElementById(clockId);
        if (!this.clockElement) {
            throw new Error("Element with id ".concat(clockId, " not found."));
        }
    }
    Clock.prototype.updateClock = function () {
        var now = new Date();
        var hours = now.getHours().toString().padStart(2, '0');
        var minutes = now.getMinutes().toString().padStart(2, '0');
        var seconds = now.getSeconds().toString().padStart(2, '0');
        this.clockElement.textContent = "".concat(hours, ":").concat(minutes, ":").concat(seconds);
    };
    Clock.prototype.start = function () {
        var _this = this;
        this.updateClock();
        setInterval(function () { return _this.updateClock(); }, 1000);
    };
    return Clock;
}());
var clock = new Clock('clock');
clock.start();
