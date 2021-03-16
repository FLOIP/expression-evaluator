"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractNodeHandler = void 0;
var index_1 = require("../../../../index");
var AbstractNodeHandler = /** @class */ (function () {
    function AbstractNodeHandler() {
    }
    AbstractNodeHandler.prototype.value = function (item) {
        return (item instanceof index_1.Node) ? item.value : item;
    };
    AbstractNodeHandler.prototype.isScalar = function (item) {
        if (item instanceof index_1.Node) {
            item = item.value;
        }
        return (/boolean|number|string/).test(typeof item);
    };
    return AbstractNodeHandler;
}());
exports.AbstractNodeHandler = AbstractNodeHandler;
//# sourceMappingURL=AbstractNodeHandler.js.map