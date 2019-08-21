"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Expression_1 = require("../../Contract/Expression");
var EscapeNodeEvaluator = /** @class */ (function () {
    function EscapeNodeEvaluator() {
    }
    EscapeNodeEvaluator.prototype.evaluate = function (node, context) {
        return Expression_1.IDENTIFIER;
    };
    EscapeNodeEvaluator.prototype.handles = function () {
        return Expression_1.ESCAPE_TYPE;
    };
    return EscapeNodeEvaluator;
}());
exports.default = EscapeNodeEvaluator;
//# sourceMappingURL=EscapeNodeEvaluator.js.map