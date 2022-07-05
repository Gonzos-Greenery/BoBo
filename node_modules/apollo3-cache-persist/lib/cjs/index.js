"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.persistCache = exports.CachePersistor = void 0;
var CachePersistor_1 = require("./CachePersistor");
Object.defineProperty(exports, "CachePersistor", { enumerable: true, get: function () { return CachePersistor_1.default; } });
var persistCache_1 = require("./persistCache");
Object.defineProperty(exports, "persistCache", { enumerable: true, get: function () { return persistCache_1.default; } });
__exportStar(require("./persistCacheSync"), exports);
__exportStar(require("./storageWrappers/index"), exports);
//# sourceMappingURL=index.js.map