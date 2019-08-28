"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Expression_1 = require("../../Contract/Expression");
var NullNodeEvaluator = /** @class */ (function () {
    function NullNodeEvaluator() {
    }
    NullNodeEvaluator.prototype.handles = function () {
        return Expression_1.NULL_TYPE;
    };
    NullNodeEvaluator.prototype.evaluate = function (node, context) {
        return null;
    };
    return NullNodeEvaluator;
}());
exports.default = NullNodeEvaluator;
//# sourceMappingURL=NullNodeEvaluator.js.map