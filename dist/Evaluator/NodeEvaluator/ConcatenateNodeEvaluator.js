"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Expression_1 = require("../../Contract/Expression");
var Exception_1 = require("./Exception");
var Node_1 = __importDefault(require("../Node"));
var ConcatenateNodeEvaluator = /** @class */ (function () {
    function ConcatenateNodeEvaluator() {
    }
    ConcatenateNodeEvaluator.prototype.evaluate = function (node, context) {
        var data = node.data;
        this.typeGuard(data);
        var lhs = this.value(data.lhs);
        var rhs = this.value(data.rhs);
        return String(lhs) + String(rhs);
    };
    ConcatenateNodeEvaluator.prototype.value = function (item) {
        if (item instanceof Node_1.default) {
            return item.value;
        }
        return item;
    };
    ConcatenateNodeEvaluator.prototype.handles = function () {
        return Expression_1.CONCATENATE_TYPE;
    };
    ConcatenateNodeEvaluator.prototype.typeGuard = function (concatenate) {
        for (var _i = 0, _a = ['rhs', 'lhs']; _i < _a.length; _i++) {
            var key = _a[_i];
            if (!(key in concatenate)) {
                throw new Exception_1.NodeShapeError('Concatenation node is the wrong shape, should have "rhs", "lhs"');
            }
        }
    };
    return ConcatenateNodeEvaluator;
}());
exports.default = ConcatenateNodeEvaluator;
//# sourceMappingURL=ConcatenateNodeEvaluator.js.map