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
var Node_1 = __importDefault(require("../../../Node"));
var Exception_1 = require("../../Exception");
var AbstractNodeHandler_1 = __importDefault(require("./AbstractNodeHandler"));
var ArrayHandler = /** @class */ (function (_super) {
    __extends(ArrayHandler, _super);
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
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return args.map(this.value);
    };
    ArrayHandler.prototype.in = function (value, array) {
        var search = array;
        if (array instanceof Node_1.default) {
            search = array.value;
        }
        if (!Array.isArray(search)) {
            throw new Exception_1.NodeEvaluatorError("Can only perform IN on an array, got " + typeof search);
        }
        // we use some instead of includes for loose comparison
        return (search).some(function (item) { return item == value; });
    };
    ArrayHandler.prototype.count = function (array) {
        var arr = array;
        if (array instanceof Node_1.default) {
            arr = array.value;
        }
        if (!Array.isArray(arr)) {
            throw new Exception_1.NodeEvaluatorError("Can only perform COUNT on an array, got " + typeof arr);
        }
        return arr.length;
    };
    return ArrayHandler;
}(AbstractNodeHandler_1.default));
exports.default = ArrayHandler;
//# sourceMappingURL=ArrayHandler.js.map