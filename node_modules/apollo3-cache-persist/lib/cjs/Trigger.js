"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var onCacheWrite_1 = require("./onCacheWrite");
var onAppBackground_1 = require("./onAppBackground");
var Trigger = (function () {
    function Trigger(_a, options) {
        var _this = this;
        var log = _a.log, persistor = _a.persistor;
        this.fire = function () {
            if (!_this.debounce) {
                _this.persist();
                return;
            }
            if (_this.timeout != null) {
                clearTimeout(_this.timeout);
            }
            _this.timeout = setTimeout(_this.persist, _this.debounce);
        };
        this.persist = function () {
            if (_this.paused) {
                return;
            }
            _this.persistor.persist();
        };
        var defaultDebounce = Trigger.defaultDebounce;
        var cache = options.cache, debounce = options.debounce, _b = options.trigger, trigger = _b === void 0 ? 'write' : _b;
        if (!trigger) {
            return;
        }
        this.debounce = debounce != null ? debounce : defaultDebounce;
        this.persistor = persistor;
        this.paused = false;
        switch (trigger) {
            case 'write':
                this.uninstall = onCacheWrite_1.default({ cache: cache })(this.fire);
                break;
            case 'background':
                if (debounce) {
                    log.warn('Debounce is not recommended with `background` trigger');
                }
                this.debounce = debounce;
                this.uninstall = onAppBackground_1.default({ cache: cache, log: log })(this.fire);
                break;
            default:
                if (typeof trigger === 'function') {
                    this.uninstall = trigger(this.fire);
                }
                else {
                    throw Error("Unrecognized trigger option: " + trigger);
                }
        }
    }
    Trigger.prototype.pause = function () {
        this.paused = true;
    };
    Trigger.prototype.resume = function () {
        this.paused = false;
    };
    Trigger.prototype.remove = function () {
        if (this.uninstall) {
            this.uninstall();
            this.uninstall = null;
            this.paused = true;
        }
    };
    Trigger.defaultDebounce = 1000;
    return Trigger;
}());
exports.default = Trigger;
//# sourceMappingURL=Trigger.js.map