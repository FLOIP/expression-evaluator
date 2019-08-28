"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var Expression_1 = require("../../../Contract/Expression");
var Node_1 = __importDefault(require("../../Node"));
var Exception_1 = require("../Exception");
var MethodNodeEvaluator = /** @class */ (function () {
    function MethodNodeEvaluator() {
        this.handlers = new Map();
    }
    MethodNodeEvaluator.prototype.addHandler = function (handler) {
        for (var _i = 0, _a = handler.handles(); _i < _a.length; _i++) {
            var method = _a[_i];
            this.handlers.set(method, handler);
        }
        return this;
    };
    MethodNodeEvaluator.prototype.getHandler = function (method) {
        var ret = this.handlers.get(method);
        if (ret !== undefined) {
            return ret;
        }
        throw new __1.NodeEvaluatorException("No node method handler found for " + method);
    };
    MethodNodeEvaluator.prototype.evaluate = function (node, context) {
        var method = node.data;
        this.typeGuard(method);
        var call = method.call.toLowerCase();
        var args = method.args.map(this.value).concat(context);
        var handler = this.getHandler(call);
        return handler[call].apply(handler, args);
    };
    MethodNodeEvaluator.prototype.value = function (item) {
        if (item instanceof Node_1.default) {
            return item.value;
        }
        return item;
    };
    MethodNodeEvaluator.prototype.typeGuard = function (method) {
        for (var _i = 0, _a = ['call', 'args']; _i < _a.length; _i++) {
            var key = _a[_i];
            if (!(key in method)) {
                throw new Exception_1.NodeShapeError('Method node is the wrong shape, should have "call", "args"');
            }
            if (!Array.isArray(method.args)) {
                throw new Exception_1.NodeShapeError('Method node must have "args" array');
            }
        }
    };
    MethodNodeEvaluator.prototype.handles = function () {
        return Expression_1.METHOD_TYPE;
    };
    return MethodNodeEvaluator;
}());
exports.MethodNodeEvaluator = MethodNodeEvaluator;
//# sourceMappingURL=index.js.map