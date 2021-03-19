"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoader = void 0;
var tslib_1 = require("tslib");
var graphql_1 = require("graphql");
var dataloader_1 = tslib_1.__importDefault(require("@rukmanamreza/dataloader"));
var delegate_1 = require("@graphql-tools/delegate");
var cache1 = new WeakMap();
function createBatchFn(options) {
    var _this = this;
    var _a;
    var argsFromKeys = (_a = options.argsFromKeys) !== null && _a !== void 0 ? _a : (function (keys) { return ({ ids: keys }); });
    var valuesFromResults = options.valuesFromResults, lazyOptionsFn = options.lazyOptionsFn;
    return function (keys) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var results, values;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, delegate_1.delegateToSchema(tslib_1.__assign({ returnType: new graphql_1.GraphQLList(graphql_1.getNamedType(options.info.returnType)), args: argsFromKeys(keys) }, (lazyOptionsFn == null ? options : lazyOptionsFn(options))))];
                case 1:
                    results = _a.sent();
                    values = valuesFromResults == null ? results : valuesFromResults(results, keys);
                    return [2 /*return*/, Array.isArray(values) ? values : keys.map(function () { return values; })];
            }
        });
    }); };
}
function getLoader(options) {
    var cache2 = cache1.get(options.info.fieldNodes);
    var loader;
    if (cache2 === undefined) {
        var batchFn_1 = createBatchFn(options);
        cache2 = new WeakMap();
        cache1.set(options.info.fieldNodes, cache2);
        loader = new dataloader_1.default(function (keys) { return batchFn_1(keys); }, options.dataLoaderOptions);
        cache2.set(options.schema, loader);
        return loader;
    }
    loader = cache2.get(options.schema);
    if (loader === undefined) {
        var batchFn_2 = createBatchFn(options);
        loader = new dataloader_1.default(function (keys) { return batchFn_2(keys); }, options.dataLoaderOptions);
        cache2.set(options.schema, loader);
        return loader;
    }
    return loader;
}
exports.getLoader = getLoader;
//# sourceMappingURL=getLoader.js.map