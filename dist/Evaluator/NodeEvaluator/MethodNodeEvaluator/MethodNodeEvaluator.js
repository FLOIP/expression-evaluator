"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MethodNodeEvaluator = exports.METHOD_TYPE = void 0;
var tslib_1 = require("tslib");
var __1 = require("../../..");
exports.METHOD_TYPE = 'METHOD';
var MethodNodeEvaluator = /** @class */ (function () {
    function MethodNodeEvaluator() {
        this.handlers = new Map();
    }
    MethodNodeEvaluator.prototype.addHandler = function (handler) {
        var e_1, _a;
        try {
            for (var _b = tslib_1.__values(handler.handles()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var method = _c.value;
                this.handlers.set(method, handler);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return this;
    };
    MethodNodeEvaluator.prototype.getHandler = function (method) {
        var ret = this.handlers.get(method);
        if (ret !== undefined) {
            return ret;
        }
        else {
            throw new __1.NodeEvaluatorException("No node method handler found for " + method);
        }
    };
    MethodNodeEvaluator.prototype.evaluate = function (node, context) {
        var _this = this;
        var method = node.data;
        this.typeGuard(method);
        var call = method.call.toLowerCase();
        var args = method.args.map(function (item) { return _this.value(item); }).concat(context);
        var handler = this.getHandler(call);
        return handler[call].apply(handler, tslib_1.__spread(args));
    };
    MethodNodeEvaluator.prototype.value = function (item) {
        if (item instanceof __1.Node) {
            return item.value;
        }
        else {
            return item;
        }
    };
    MethodNodeEvaluator.prototype.typeGuard = function (method) {
        var e_2, _a;
        try {
            for (var _b = tslib_1.__values(['call', 'args']), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                if (!(key in method)) {
                    throw new __1.NodeShapeError('Method node is the wrong shape, should have "call", "args"');
                }
                if (!Array.isArray(method.args)) {
                    throw new __1.NodeShapeError('Method node must have "args" array');
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
    };
    MethodNodeEvaluator.prototype.handles = function () {
        return exports.METHOD_TYPE;
    };
    return MethodNodeEvaluator;
}());
exports.MethodNodeEvaluator = MethodNodeEvaluator;
//# sourceMappingURL=MethodNodeEvaluator.js.map