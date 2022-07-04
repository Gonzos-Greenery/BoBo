"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Log_1 = require("./Log");
var Cache_1 = require("./Cache");
var Storage_1 = require("./Storage");
var Persistor_1 = require("./Persistor");
var Trigger_1 = require("./Trigger");
var CachePersistor = (function () {
    function CachePersistor(options) {
        if (!options.cache) {
            throw new Error('In order to persist your Apollo Cache, you need to pass in a cache. ' +
                'Please see https://www.apollographql.com/docs/react/basics/caching.html for our default InMemoryCache.');
        }
        if (!options.storage) {
            throw new Error('In order to persist your Apollo Cache, you need to pass in an underlying storage provider. ' +
                'Please see https://github.com/apollographql/apollo-cache-persist#storage-providers');
        }
        var log = new Log_1.default(options);
        var cache = new Cache_1.default(options);
        var storage = new Storage_1.default(options);
        var persistor = new Persistor_1.default({ log: log, cache: cache, storage: storage }, options);
        var trigger = new Trigger_1.default({ log: log, persistor: persistor }, options);
        this.log = log;
        this.cache = cache;
        this.storage = storage;
        this.persistor = persistor;
        this.trigger = trigger;
    }
    CachePersistor.prototype.persist = function () {
        return this.persistor.persist();
    };
    CachePersistor.prototype.restore = function () {
        return this.persistor.restore();
    };
    CachePersistor.prototype.purge = function () {
        return this.persistor.purge();
    };
    CachePersistor.prototype.pause = function () {
        this.trigger.pause();
    };
    CachePersistor.prototype.resume = function () {
        this.trigger.resume();
    };
    CachePersistor.prototype.remove = function () {
        this.trigger.remove();
    };
    CachePersistor.prototype.getLogs = function (print) {
        if (print === void 0) { print = false; }
        if (print) {
            this.log.tailLogs();
        }
        else {
            return this.log.getLogs();
        }
    };
    CachePersistor.prototype.getSize = function () {
        return this.storage.getSize();
    };
    return CachePersistor;
}());
exports.default = CachePersistor;
//# sourceMappingURL=CachePersistor.js.map