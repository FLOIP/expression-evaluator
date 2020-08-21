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
var __1 = require("../..");
var TextHandler = /** @class */ (function (_super) {
    __extends(TextHandler, _super);
    function TextHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextHandler.prototype.handles = function () {
        return [
            'char',
            'clean',
            'code',
            'concatenate',
            'contains',
            'fixed',
            'left',
            'len',
            'lower',
            'proper',
            'rept',
            'right',
            'substitute',
            'unichar',
            'unicode',
            'upper',
        ];
    };
    TextHandler.prototype.char = function (asciiCode) {
        return String.fromCharCode(Number(asciiCode));
    };
    TextHandler.prototype.clean = function (string) {
        return String(string)
            .replace(/[^ -~]+/, '');
    };
    TextHandler.prototype.code = function (string) {
        return String(string)
            .charCodeAt(0);
    };
    TextHandler.prototype.concatenate = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return args.filter(this.isScalar).map(String)
            .reduce(function (carry, s) { return carry + String(s); });
    };
    TextHandler.prototype.contains = function (needle, haystack) {
        return String(haystack).includes(String(needle));
    };
    TextHandler.prototype.fixed = function (number, decimals, commas) {
        if (decimals === void 0) { decimals = 0; }
        if (commas === void 0) { commas = false; }
        if (typeof commas === 'object') { // if context is 3rd param
            commas = false;
        }
        var n = number.toString()
            .match(new RegExp("^-?\\d+(?:\\.\\d{0," + decimals + "})?", "g"));
        if (n !== null && n.length) {
            if (commas) {
                return Number(n[0]).toLocaleString();
            }
            return n[0];
        }
        throw new __1.NodeEvaluatorException("Cannot format number " + number);
    };
    TextHandler.prototype.left = function (string, chars) {
        return String(string).substr(0, Number(chars));
    };
    TextHandler.prototype.len = function (string) {
        return String(string).length;
    };
    TextHandler.prototype.lower = function (string) {
        return String(string).toLowerCase();
    };
    TextHandler.prototype.proper = function (string) {
        string = String(string).toLowerCase();
        var reg = /\b\w/mg; // match words
        var match;
        while ((match = reg.exec(string)) !== null) {
            var i = match.index;
            // matching on word boundaries will also match after symbols like
            // -.& etc. We only want to uppercase after whitespace.
            if (i > 0 && /[^\s]/.test(string[i - 1])) {
                continue;
            }
            string = string.substr(0, i) + string[i].toUpperCase() + string.substr(i + 1);
        }
        return string;
    };
    TextHandler.prototype.rept = function (string, times) {
        return String(string).repeat(Number(times));
    };
    TextHandler.prototype.right = function (string, chars) {
        return String(string).substr(-(Number(chars)));
    };
    TextHandler.prototype.substitute = function (string, old, replace, instances) {
        if (instances === void 0) { instances = null; }
        if (typeof instances === 'object') {
            instances = null;
        }
        string = String(string);
        old = String(old);
        replace = String(replace);
        if (instances) {
            for (var i = 0; i < Number(instances); ++i) {
                string = string.replace(old, replace);
            }
            return string;
        }
        return string.replace(new RegExp(old, 'mg'), replace);
    };
    TextHandler.prototype.unichar = function (unicode) {
        return String.fromCodePoint(Number(unicode));
    };
    TextHandler.prototype.unicode = function (string) {
        return String(string).codePointAt(0);
    };
    TextHandler.prototype.upper = function (string) {
        return String(string).toUpperCase();
    };
    return TextHandler;
}(AbstractNodeHandler_1.default));
exports.default = TextHandler;
//# sourceMappingURL=TextHandler.js.map