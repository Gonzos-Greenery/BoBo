"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SynchronousStorage = exports.SynchronousPersistor = exports.SynchronousCachePersistor = exports.persistCacheSync = void 0;
var CachePersistor_1 = require("./CachePersistor");
var Persistor_1 = require("./Persistor");
var Storage_1 = require("./Storage");
exports.persistCacheSync = function (options) {
    var cachePersistor = new SynchronousCachePersistor(options);
    cachePersistor.restoreSync();
};
var SynchronousCachePersistor = (function (_super) {
    __extends(SynchronousCachePersistor, _super);
    function SynchronousCachePersistor(options) {
        var _this = _super.call(this, options) || this;
        _this.storage = new SynchronousStorage(options);
        _this.persistor = new SynchronousPersistor({ log: _this.log, cache: _this.cache, storage: _this.storage }, options);
        return _this;
    }
    SynchronousCachePersistor.prototype.restoreSync = function () {
        this.persistor.restoreSync();
    };
    return SynchronousCachePersistor;
}(CachePersistor_1.default));
exports.SynchronousCachePersistor = SynchronousCachePersistor;
var SynchronousPersistor = (function (_super) {
    __extends(SynchronousPersistor, _super);
    function SynchronousPersistor(_a, options) {
        var log = _a.log, cache = _a.cache, storage = _a.storage;
        return _super.call(this, { log: log, cache: cache, storage: storage }, options) || this;
    }
    SynchronousPersistor.prototype.restoreSync = function () {
        this.cache.restore(this.storage.readSync());
    };
    return SynchronousPersistor;
}(Persistor_1.default));
exports.SynchronousPersistor = SynchronousPersistor;
var SynchronousStorage = (function (_super) {
    __extends(SynchronousStorage, _super);
    function SynchronousStorage(options) {
        return _super.call(this, options) || this;
    }
    SynchronousStorage.prototype.readSync = function () {
        return this.storage.getItem(this.key);
    };
    return SynchronousStorage;
}(Storage_1.default));
exports.SynchronousStorage = SynchronousStorage;
//# sourceMappingURL=persistCacheSync.js.map