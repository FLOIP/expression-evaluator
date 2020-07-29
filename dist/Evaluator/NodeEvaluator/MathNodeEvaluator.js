"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Node_1 = __importDefault(require("../Node"));
var Expression_1 = require("../../Contract/Expression");
var Exception_1 = require("./Exception");
var moment_1 = __importDefault(require("moment"));
var DATE_INTERVAL_REGEX = /^([0-9]+)\s(\w+)$/i;
var MathNodeEvaluator = /** @class */ (function () {
    function MathNodeEvaluator() {
    }
    MathNodeEvaluator.prototype.evaluate = function (node, context) {
        var data = node.data;
        this.typeGuard(data);
        var lhs = this.value(data.lhs);
        var rhs = this.value(data.rhs);
        var operator = data.operator;
        // special handling for math operations on dates
        if (typeof lhs === 'object' || typeof rhs === 'object') {
            if (moment_1.default.isMoment(lhs)) {
                if (moment_1.default.isDuration(rhs)) {
                    return this.evaluateDateMath(lhs, rhs, operator);
                }
                // can only add durations to dates
                throw new Exception_1.NodeEvaluatorError("When lhs of equation is a date, rhs, must be a duration, got " + typeof rhs);
            }
            throw new Exception_1.NodeEvaluatorError("Can only perform math on numbers or date/time, got " + typeof lhs + " and " + typeof rhs);
        }
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
    MathNodeEvaluator.prototype.evaluateDateMath = function (lhs, rhs, operator) {
        switch (operator) {
            case '+':
                return lhs.add(rhs);
            case '-':
                return lhs.subtract(rhs);
        }
        throw new Exception_1.NodeEvaluatorError("Cannot perform operation " + operator + " on dates");
    };
    MathNodeEvaluator.prototype.handles = function () {
        return Expression_1.MATH_TYPE;
    };
    MathNodeEvaluator.prototype.value = function (item) {
        if (item instanceof Node_1.default) {
            item = item.value;
        }
        if (moment_1.default.isDuration(item) || moment_1.default.isMoment(item)) {
            return item;
        }
        if (!isNaN(item)) {
            return Number(item);
        }
        var date = this.parseDateTime(item);
        if (date) {
            return date;
        }
        throw new Exception_1.NodeEvaluatorError("Can only perform math on numbers, got " + item);
    };
    MathNodeEvaluator.prototype.parseDateTime = function (thing) {
        var res = DATE_INTERVAL_REGEX.exec(thing);
        if (res === null) {
            return false;
        }
        if (res.length == 3) {
            return moment_1.default.duration(res[1], res[2]);
        }
        var m = moment_1.default(thing);
        if (m.isValid()) {
            return m;
        }
        return false;
    };
    MathNodeEvaluator.prototype.typeGuard = function (math) {
        for (var _i = 0, _a = ['rhs', 'lhs', 'operator']; _i < _a.length; _i++) {
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