"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
exports.default = (function () { return function (persist) {
    var wasActive = true;
    var listener = function (state) {
        if (state === 'active') {
            wasActive = true;
        }
        else if (wasActive) {
            wasActive = false;
            persist();
        }
    };
    react_native_1.AppState.addEventListener('change', listener);
    return function () { return react_native_1.AppState.removeEventListener('change', listener); };
}; });
//# sourceMappingURL=onAppBackground.native.js.map