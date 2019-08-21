"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Expression_1 = require("../../Contract/Expression");
var Exception_1 = require("./Exception");
var Node_1 = __importDefault(require("../Node"));
var LogicNodeEvaluator = /** @class */ (function () {
    function LogicNodeEvaluator() {
    }
    LogicNodeEvaluator.prototype.evaluate = function (node, context) {
        var data = node.data;
        this.typeGuard(data);
        var lhs = this.value(data.lhs);
        var rhs = this.value(data.rhs);
        var operator = data.operator;
        switch (operator) {
            case '<':
                return lhs < rhs;
            case '<=':
                return lhs <= rhs;
            case '>':
                return lhs > rhs;
            case '>=':
                return lhs >= rhs;
            case '=':
                return lhs == rhs;
            case '!=':
            case '<>':
                return lhs !== rhs;
        }
        throw new Exception_1.NodeEvaluatorError(operator + " is not a valid logic operator");
    };
    LogicNodeEvaluator.prototype.handles = function () {
        return Expression_1.LOGIC_TYPE;
    };
    LogicNodeEvaluator.prototype.value = function (item) {
        if (item instanceof Node_1.default) {
            item = item.value;
        }
        if (typeof item === 'string') {
            if (item.toUpperCase() === 'TRUE') {
                return true;
            }
            if (item.toUpperCase() === 'FALSE') {
                return false;
            }
        }
        return item;
    };
    LogicNodeEvaluator.prototype.typeGuard = function (logic) {
        for (var _i = 0, _a = ['rhs, lhs', 'operator']; _i < _a.length; _i++) {
            var key = _a[_i];
            if (!(key in logic)) {
                throw new Exception_1.NodeShapeError('Logic node is the wrong shape, should have "rhs", "lhs", "operator"');
            }
        }
    };
    return LogicNodeEvaluator;
}());
exports.default = LogicNodeEvaluator;
//# sourceMappingURL=LogicNodeEvaluator.js.map