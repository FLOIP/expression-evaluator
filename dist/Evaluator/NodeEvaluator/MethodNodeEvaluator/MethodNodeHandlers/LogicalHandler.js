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
var LogicalHandler = /** @class */ (function (_super) {
    __extends(LogicalHandler, _super);
    function LogicalHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LogicalHandler.prototype.handles = function () {
        return [
            'and',
            'if',
            'or',
        ];
    };
    LogicalHandler.prototype.and = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        for (var _a = 0, _b = args.map(this.value).filter(this.isScalar); _a < _b.length; _a++) {
            var arg = _b[_a];
            if (arg == false) {
                return false;
            }
        }
        return true;
    };
    LogicalHandler.prototype.if = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        args = args.map(this.value).filter(this.isScalar);
        if (args.length != 3) {
            throw new Exception_1.NodeEvaluatorError();
        }
        return args[0] ? args[1] : args[2];
    };
    LogicalHandler.prototype.or = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        for (var _a = 0, _b = args.map(this.value).filter(this.isScalar); _a < _b.length; _a++) {
            var arg = _b[_a];
            if (arg == true) {
                return true;
            }
        }
        return false;
    };
    LogicalHandler.prototype.value = function (item) {
        if (item instanceof Node_1.default) {
            var val = item.value;
            if (typeof val === 'string') {
                switch (val.toUpperCase()) {
                    case 'TRUE':
                        return true;
                    case 'FALSE':
                        return false;
                }
            }
            if (typeof val === 'boolean') {
                return val;
            }
            return false;
        }
        return item;
    };
    return LogicalHandler;
}(AbstractNodeHandler_1.default));
exports.default = LogicalHandler;
//# sourceMappingURL=LogicalHandler.js.map