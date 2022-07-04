"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CachePersistor_1 = require("./CachePersistor");
exports.default = (function (options) {
    var persistor = new CachePersistor_1.default(options);
    return persistor.restore();
});
//# sourceMappingURL=persistCache.js.map