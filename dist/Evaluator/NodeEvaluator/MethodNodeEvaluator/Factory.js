"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MethodNodeEvaluatorFactory = void 0;
var index_1 = require("../../../index");
var MethodNodeEvaluatorFactory = /** @class */ (function () {
    function MethodNodeEvaluatorFactory() {
    }
    MethodNodeEvaluatorFactory.create = function (methodNodeHandlers) {
        if (methodNodeHandlers === void 0) { methodNodeHandlers = []; }
        var evaluator = new index_1.MethodNodeEvaluator;
        MethodNodeEvaluatorFactory
            .defaultHandlers()
            .concat(methodNodeHandlers)
            .forEach(function (item) { return evaluator.addHandler(item); });
        return evaluator;
    };
    MethodNodeEvaluatorFactory.defaultHandlers = function () {
        return [
            new index_1.DateTimeHandler(),
            new index_1.ExcellentHandler(),
            new index_1.LogicalHandler(),
            new index_1.MathHandler(),
            new index_1.TextHandler(),
            new index_1.ArrayHandler()
        ];
    };
    return MethodNodeEvaluatorFactory;
}());
exports.MethodNodeEvaluatorFactory = MethodNodeEvaluatorFactory;
//# sourceMappingURL=Factory.js.map