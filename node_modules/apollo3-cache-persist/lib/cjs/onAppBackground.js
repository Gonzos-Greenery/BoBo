"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var onCacheWrite_1 = require("./onCacheWrite");
exports.default = (function (_a) {
    var log = _a.log, cache = _a.cache;
    return function (persist) {
        log.warn('Trigger option `background` not available on web; using `write` trigger');
        return onCacheWrite_1.default({ cache: cache })(persist);
    };
});
//# sourceMappingURL=onAppBackground.js.map