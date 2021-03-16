"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogicalHandler = void 0;
var tslib_1 = require("tslib");
var __1 = require("../../../..");
var LogicalHandler = /** @class */ (function (_super) {
    tslib_1.__extends(LogicalHandler, _super);
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
        var e_1, _a;
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        try {
            for (var _b = tslib_1.__values(args.map(function (arg) { return _this.value(arg); }).filter(function (arg) { return _super.prototype.isScalar.call(_this, arg); })), _c = _b.next(); !_c.done; _c = _b.next()) {
                var arg = _c.value;
                if (!arg) {
                    return false;
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
        return true;
    };
    LogicalHandler.prototype.if = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        args = args.map(function (arg) { return _this.value(arg); }).filter(function (arg) { return _super.prototype.isScalar.call(_this, arg); });
        if (args.length != 3) {
            throw new __1.NodeEvaluatorError();
        }
        return args[0] ? args[1] : args[2];
    };
    LogicalHandler.prototype.or = function () {
        var e_2, _a;
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        try {
            for (var _b = tslib_1.__values(args.map(function (arg) { return _this.value(arg); }).filter(function (arg) { return _super.prototype.isScalar.call(_this, arg); })), _c = _b.next(); !_c.done; _c = _b.next()) {
                var arg = _c.value;
                if (arg) {
                    return true;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return false;
    };
    LogicalHandler.prototype.value = function (item) {
        if (item instanceof __1.Node) {
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
}(__1.AbstractNodeHandler));
exports.LogicalHandler = LogicalHandler;
//# sourceMappingURL=LogicalHandler.js.map