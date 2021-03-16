"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EscapeNodeEvaluator = exports.ESCAPE_TYPE = exports.IDENTIFIER = void 0;
exports.IDENTIFIER = '@';
exports.ESCAPE_TYPE = 'ESCAPE';
var EscapeNodeEvaluator = /** @class */ (function () {
    function EscapeNodeEvaluator() {
    }
    EscapeNodeEvaluator.prototype.evaluate = function (_node, _context) {
        return exports.IDENTIFIER;
    };
    EscapeNodeEvaluator.prototype.handles = function () {
        return exports.ESCAPE_TYPE;
    };
    return EscapeNodeEvaluator;
}());
exports.EscapeNodeEvaluator = EscapeNodeEvaluator;
//# sourceMappingURL=EscapeNodeEvaluator.js.map