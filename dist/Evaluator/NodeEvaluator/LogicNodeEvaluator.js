"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogicNodeEvaluator = exports.LOGIC_TYPE = void 0;
var tslib_1 = require("tslib");
var __1 = require("../..");
exports.LOGIC_TYPE = 'LOGIC';
var LogicNodeEvaluator = /** @class */ (function () {
    function LogicNodeEvaluator() {
    }
    LogicNodeEvaluator.prototype.evaluate = function (node, _context) {
        var data = node.data;
        this.typeGuard(data);
        var lhs = this.value(data.lhs);
        var rhs = this.value(data.rhs);
        if (!isNaN(Number(lhs))) {
            lhs = Number(lhs);
        }
        if (!isNaN(Number(rhs))) {
            rhs = Number(rhs);
        }
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
        throw new __1.NodeEvaluatorError(operator + " is not a valid logic operator");
    };
    LogicNodeEvaluator.prototype.handles = function () {
        return exports.LOGIC_TYPE;
    };
    LogicNodeEvaluator.prototype.value = function (item) {
        if (item instanceof __1.Node) {
            item = item.value;
        }
        if (typeof item === 'string') {
            if (item.toUpperCase() === 'TRUE') {
                return true;
            }
            else if (item.toUpperCase() === 'FALSE') {
                return false;
            }
            else {
                return item;
            }
        }
        else {
            return item;
        }
    };
    LogicNodeEvaluator.prototype.typeGuard = function (logic) {
        var e_1, _a;
        try {
            for (var _b = tslib_1.__values(['rhs', 'lhs', 'operator']), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                if (!(key in logic)) {
                    throw new __1.NodeShapeError('Logic node is the wrong shape, should have "rhs", "lhs", "operator"');
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    return LogicNodeEvaluator;
}());
exports.LogicNodeEvaluator = LogicNodeEvaluator;
//# sourceMappingURL=LogicNodeEvaluator.js.map