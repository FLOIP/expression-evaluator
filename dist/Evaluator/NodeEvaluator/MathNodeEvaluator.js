"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MathNodeEvaluator = exports.MATH_TYPE = void 0;
var tslib_1 = require("tslib");
var __1 = require("../..");
var moment_1 = tslib_1.__importDefault(require("moment"));
exports.MATH_TYPE = 'MATH';
var DATE_INTERVAL_REGEX = /^([0-9]+)\s(\w+)$/i;
var MathNodeEvaluator = /** @class */ (function () {
    function MathNodeEvaluator() {
    }
    MathNodeEvaluator.prototype.evaluate = function (node, _context) {
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
                throw new __1.NodeEvaluatorError("When lhs of equation is a date, rhs, must be a duration, got " + typeof rhs);
            }
            throw new __1.NodeEvaluatorError("Can only perform math on numbers or date/time, got {lhs: " + typeof lhs + ", rhs: " + typeof rhs + "}");
        }
        else if (typeof lhs === "number" && typeof rhs === "number") {
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
        }
        else {
            throw new __1.NodeEvaluatorError("Can only perform math on numbers or date/time, got {lhs: " + typeof lhs + ", rhs: " + typeof rhs + "}");
        }
    };
    MathNodeEvaluator.prototype.evaluateDateMath = function (lhs, rhs, operator) {
        switch (operator) {
            case '+':
                return lhs.add(rhs);
            case '-':
                return lhs.subtract(rhs);
        }
        throw new __1.NodeEvaluatorError("Cannot perform operation " + operator + " on dates");
    };
    MathNodeEvaluator.prototype.handles = function () {
        return exports.MATH_TYPE;
    };
    // TODO: Can change type of `item` to Node, Number, or a String
    MathNodeEvaluator.prototype.value = function (item) {
        if (item instanceof __1.Node) {
            item = item.value;
        }
        if (moment_1.default.isDuration(item) || moment_1.default.isMoment(item)) {
            return item;
        }
        else if (!isNaN(Number(item))) {
            return Number(item);
        }
        else if (typeof item === "string") {
            var date = this.parseDateTime(item);
            if (date != null) {
                return date;
            }
            else {
                throw new __1.NodeEvaluatorError("Can only perform math on numbers, got " + item);
            }
        }
        else {
            throw new __1.NodeEvaluatorError("Item must be a Node, Number, or a String, but got " + item);
        }
    };
    MathNodeEvaluator.prototype.parseDateTime = function (dateTimeString) {
        var res = DATE_INTERVAL_REGEX.exec(dateTimeString);
        if (res == null) {
            return false;
        }
        else if (res.length == 3) {
            return moment_1.default.duration(res[1], res[2]);
        }
        else {
            var date = moment_1.default(dateTimeString);
            if (date.isValid()) {
                return date;
            }
            else {
                return false;
            }
        }
    };
    MathNodeEvaluator.prototype.typeGuard = function (math) {
        var e_1, _a;
        try {
            for (var _b = tslib_1.__values(['rhs', 'lhs', 'operator']), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                if (!(key in math)) {
                    throw new __1.NodeShapeError('Math node is the wrong shape, should have "rhs", "lhs", "operator"');
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
    return MathNodeEvaluator;
}());
exports.MathNodeEvaluator = MathNodeEvaluator;
//# sourceMappingURL=MathNodeEvaluator.js.map