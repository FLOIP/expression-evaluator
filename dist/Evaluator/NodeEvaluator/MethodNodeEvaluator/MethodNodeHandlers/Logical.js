"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Node_1 = __importDefault(require("../../../Node"));
var Exception_1 = require("../../Exception");
var Logical = /** @class */ (function () {
    function Logical() {
    }
    Logical.prototype.handles = function () {
        throw new Error("Method not implemented.");
    };
    Logical.prototype.and = function () {
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
    Logical.prototype.if = function () {
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
    Logical.prototype.or = function () {
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
    Logical.prototype.isScalar = function (item) {
        return (/boolean|number|string/).test(typeof item);
    };
    Logical.prototype.value = function (item) {
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
    return Logical;
}());
exports.default = Logical;
//# sourceMappingURL=Logical.js.map