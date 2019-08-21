"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Node_1 = __importDefault(require("../Node"));
var Expression_1 = require("../../Contract/Expression");
var Exception_1 = require("./Exception");
var MathNodeEvaluator = /** @class */ (function () {
    function MathNodeEvaluator() {
    }
    MathNodeEvaluator.prototype.evaluate = function (node, context) {
        var data = node.data;
        this.typeGuard(data);
        var lhs = this.value(data.lhs);
        var rhs = this.value(data.rhs);
        var operator = data.operator;
        switch (operator) {
            case '+':
                return lhs + rhs;
            case '-':
                return lhs - rhs;
            case '/':
                return lhs / rhs;
            case '*':
                return lhs * rhs;
            case '^':
                return Math.pow(lhs, rhs);
        }
    };
    MathNodeEvaluator.prototype.handles = function () {
        return Expression_1.MATH_TYPE;
    };
    MathNodeEvaluator.prototype.value = function (item) {
        if (item instanceof Node_1.default) {
            item = item.value;
        }
        if (!isNaN(item)) {
            return Number(item);
        }
        throw new Exception_1.NodeEvaluatorError("Can only perform math on numbers, got " + item);
    };
    MathNodeEvaluator.prototype.typeGuard = function (math) {
        for (var _i = 0, _a = ['rhs, lhs']; _i < _a.length; _i++) {
            var key = _a[_i];
            if (!(key in math)) {
                throw new Exception_1.NodeShapeError('Math node is the wrong shape, should have "rhs", "lhs", "operator"');
            }
        }
    };
    return MathNodeEvaluator;
}());
exports.default = MathNodeEvaluator;
//# sourceMappingURL=MathNodeEvaluator.js.map