"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.persist = void 0;
var mobx_1 = require("mobx");
var serializr_1 = require("serializr");
var Storage = require("./storage");
var merge_x_1 = require("./merge-x");
var types_1 = require("./types");
var persist_object_1 = require("./persist-object");
function persist() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var a = args[0], b = args[1], c = args[2];
    if (a in types_1.types) {
        return serializr_1.serializable(types_1.types[a](b));
    }
    else if (args.length === 1) {
        return function (target) { return persist_object_1.persistObject(target, a); };
    }
    else {
        return serializr_1.serializable.apply(null, args);
    }
}
exports.persist = persist;
function create(_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.storage, storage = _c === void 0 ? Storage : _c, _d = _b.jsonify, jsonify = _d === void 0 ? true : _d, _e = _b.debounce, debounce = _e === void 0 ? 0 : _e;
    if (typeof localStorage !== 'undefined' && localStorage === storage)
        storage = Storage;
    return function hydrate(key, store, initialState, customArgs) {
        if (initialState === void 0) { initialState = {}; }
        if (customArgs === void 0) { customArgs = {}; }
        var schema = serializr_1.getDefaultModelSchema(store);
        var disposer = { dispose: null };
        function hydration() {
            var fn = mobx_1.action("[mobx-persist " + key + "] LOAD_DATA", function () {
                var persisted = storage.getItem(key);
                persisted = !jsonify ? persisted : JSON.parse(persisted);
                if (persisted && typeof persisted === 'object') {
                    serializr_1.update(schema, store, persisted, null, customArgs);
                }
                merge_x_1.mergeObservables(store, initialState);
                return store;
            });
            var hydRes = fn();
            hydRes.rehydrate = hydration;
            hydRes.dispose = function () { return disposer.dispose(); };
            return hydRes;
        }
        var result = hydration();
        disposer.dispose = mobx_1.reaction(function () { return serializr_1.serialize(schema, store); }, function (data) { return storage.setItem(key, !jsonify ? data : JSON.stringify(data)); }, {
            delay: debounce
        });
        return result;
    };
}
exports.create = create;
