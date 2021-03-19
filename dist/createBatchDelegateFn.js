"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBatchDelegateFn = void 0;
var tslib_1 = require("tslib");
var getLoader_1 = require("./getLoader");
function createBatchDelegateFn(optionsOrArgsFromKeys, lazyOptionsFn, dataLoaderOptions, valuesFromResults) {
    return typeof optionsOrArgsFromKeys === 'function'
        ? createBatchDelegateFnImpl({
            argsFromKeys: optionsOrArgsFromKeys,
            lazyOptionsFn: lazyOptionsFn,
            dataLoaderOptions: dataLoaderOptions,
            valuesFromResults: valuesFromResults,
        })
        : createBatchDelegateFnImpl(optionsOrArgsFromKeys);
}
exports.createBatchDelegateFn = createBatchDelegateFn;
function createBatchDelegateFnImpl(options) {
    return function (batchDelegateOptions) {
        var loader = getLoader_1.getLoader(tslib_1.__assign(tslib_1.__assign({}, options), batchDelegateOptions));
        return loader.load(batchDelegateOptions.key);
    };
}
//# sourceMappingURL=createBatchDelegateFn.js.map