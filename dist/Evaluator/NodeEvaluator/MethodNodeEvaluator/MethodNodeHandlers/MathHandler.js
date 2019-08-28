"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractNodeHandler_1 = __importDefault(require("./AbstractNodeHandler"));
var MathHandler = /** @class */ (function (_super) {
    __extends(MathHandler, _super);
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
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        //@ts-ignore
        return Math.max.apply(Math, (args.map(this.value).filter(function (x) { return !isNaN(x); })));
    };
    MathHandler.prototype.min = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        //@ts-ignore
        return Math.min.apply(Math, (args.map(this.value).filter(function (x) { return !isNaN(x); })));
    };
    MathHandler.prototype.power = function (number, power) {
        return Math.pow(this.value(number), this.value(power));
    };
    MathHandler.prototype.sum = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        //@ts-ignore
        return args.map(this.value).filter(function (x) { return !isNaN(x); })
            .reduce(function (carry, n) { return carry += Number(n); });
    };
    MathHandler.prototype.value = function (item) {
        return Number(_super.prototype.value.call(this, item));
    };
    return MathHandler;
}(AbstractNodeHandler_1.default));
exports.default = MathHandler;
//# sourceMappingURL=MathHandler.js.map