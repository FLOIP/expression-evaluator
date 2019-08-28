"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Node_1 = __importDefault(require("../../../Node"));
var AbstractNodeHandler = /** @class */ (function () {
    function AbstractNodeHandler() {
    }
    AbstractNodeHandler.prototype.value = function (item) {
        return (item instanceof Node_1.default) ? item.value : item;
    };
    AbstractNodeHandler.prototype.isScalar = function (item) {
        if (item instanceof Node_1.default) {
            item = item.value;
        }
        return (/boolean|number|string/).test(typeof item);
    };
    return AbstractNodeHandler;
}());
exports.default = AbstractNodeHandler;
//# sourceMappingURL=AbstractNodeHandler.js.map