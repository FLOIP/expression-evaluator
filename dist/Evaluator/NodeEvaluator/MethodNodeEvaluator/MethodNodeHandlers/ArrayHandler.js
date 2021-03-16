"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayHandler = void 0;
var tslib_1 = require("tslib");
var __1 = require("../../../..");
var ArrayHandler = /** @class */ (function (_super) {
    tslib_1.__extends(ArrayHandler, _super);
    function ArrayHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ArrayHandler.prototype.handles = function () {
        return [
            'array',
            'in',
            'count'
        ];
    };
    ArrayHandler.prototype.array = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return args.map(function (arg) { return _this.value(arg); });
    };
    ArrayHandler.prototype.in = function (value, array) {
        var search = array;
        if (array instanceof __1.Node) {
            search = array.value;
        }
        if (!Array.isArray(search)) {
            throw new __1.NodeEvaluatorError("Can only perform IN on an array, got " + typeof search);
        }
        else {
            // we use some instead of includes for loose comparison
            return (search).some(function (item) { return item == value; });
        }
    };
    ArrayHandler.prototype.count = function (array) {
        var arr = array;
        if (array instanceof __1.Node) {
            arr = array.value;
        }
        if (!Array.isArray(arr)) {
            throw new __1.NodeEvaluatorError("Can only perform COUNT on an array, got " + typeof arr);
        }
        else {
            return arr.length;
        }
    };
    return ArrayHandler;
}(__1.AbstractNodeHandler));
exports.ArrayHandler = ArrayHandler;
//# sourceMappingURL=ArrayHandler.js.map