"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NullNodeEvaluator = exports.NULL_TYPE = void 0;
exports.NULL_TYPE = 'NULL';
var NullNodeEvaluator = /** @class */ (function () {
    function NullNodeEvaluator() {
    }
    NullNodeEvaluator.prototype.handles = function () {
        return exports.NULL_TYPE;
    };
    NullNodeEvaluator.prototype.evaluate = function (_node, _context) {
        return null;
    };
    return NullNodeEvaluator;
}());
exports.NullNodeEvaluator = NullNodeEvaluator;
//# sourceMappingURL=NullNodeEvaluator.js.map