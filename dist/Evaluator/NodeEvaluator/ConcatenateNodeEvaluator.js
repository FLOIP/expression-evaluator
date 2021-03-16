"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConcatenateNodeEvaluator = exports.CONCATENATE_TYPE = void 0;
var tslib_1 = require("tslib");
var __1 = require("../../");
exports.CONCATENATE_TYPE = 'CONCATENATE';
var ConcatenateNodeEvaluator = /** @class */ (function () {
    function ConcatenateNodeEvaluator() {
    }
    ConcatenateNodeEvaluator.prototype.evaluate = function (node, _context) {
        var data = node.data;
        this.typeGuard(data);
        var lhs = this.value(data.lhs);
        var rhs = this.value(data.rhs);
        return String(lhs) + String(rhs);
    };
    ConcatenateNodeEvaluator.prototype.value = function (item) {
        if (item instanceof __1.Node) {
            return item.value;
        }
        else {
            return item;
        }
    };
    ConcatenateNodeEvaluator.prototype.handles = function () {
        return exports.CONCATENATE_TYPE;
    };
    ConcatenateNodeEvaluator.prototype.typeGuard = function (concatenate) {
        var e_1, _a;
        try {
            for (var _b = tslib_1.__values(['rhs', 'lhs']), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                if (!(key in concatenate)) {
                    throw new __1.NodeShapeError('Concatenation node is the wrong shape, should have "rhs", "lhs"');
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
    };
    return ConcatenateNodeEvaluator;
}());
exports.ConcatenateNodeEvaluator = ConcatenateNodeEvaluator;
//# sourceMappingURL=ConcatenateNodeEvaluator.js.map