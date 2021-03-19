"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.batchDelegateToSchema = void 0;
var getLoader_1 = require("./getLoader");
function batchDelegateToSchema(options) {
    var key = options.key;
    if (key == null) {
        return null;
    }
    else if (Array.isArray(key) && !key.length) {
        return [];
    }
    var loader = getLoader_1.getLoader(options);
    return Array.isArray(key) ? loader.loadMany(key) : loader.load(key);
}
exports.batchDelegateToSchema = batchDelegateToSchema;
//# sourceMappingURL=batchDelegateToSchema.js.map