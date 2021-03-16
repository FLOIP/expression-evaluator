"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MathHandler = void 0;
var tslib_1 = require("tslib");
var __1 = require("../../../..");
var MathHandler = /** @class */ (function (_super) {
    tslib_1.__extends(MathHandler, _super);
    function MathHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MathHandler.prototype.handles = function () {
        return [
            'abs',
            'max',
            'min',
            'power',
            'sum',
        ];
    };
    MathHandler.prototype.abs = function (number) {
        return Math.abs(this.value(number));
    };
    MathHandler.prototype.max = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return Math.max.apply(Math, tslib_1.__spread((args.map(function (arg) { return _this.value(arg); }).filter(function (x) { return !isNaN(x); }))));
    };
    MathHandler.prototype.min = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return Math.min.apply(Math, tslib_1.__spread((args.map(function (arg) { return _this.value(arg); }).filter(function (x) { return !isNaN(x); }))));
    };
    MathHandler.prototype.power = function (number, power) {
        return Math.pow(this.value(number), this.value(power));
    };
    MathHandler.prototype.sum = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return args.map(function (arg) { return _this.value(arg); }).filter(function (x) { return !isNaN(x); })
            .reduce(function (carry, n) { return carry += Number(n); });
    };
    MathHandler.prototype.value = function (item) {
        return Number(_super.prototype.value.call(this, item));
    };
    return MathHandler;
}(__1.AbstractNodeHandler));
exports.MathHandler = MathHandler;
//# sourceMappingURL=MathHandler.js.map