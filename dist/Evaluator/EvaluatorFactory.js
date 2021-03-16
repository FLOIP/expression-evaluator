"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvaluatorFactory = void 0;
var expression_parser_1 = require("@floip/expression-parser");
var __1 = require("..");
// noinspection JSUnusedGlobalSymbols
var EvaluatorFactory = /** @class */ (function () {
    function EvaluatorFactory() {
    }
    EvaluatorFactory.create = function (nodeEvaluators) {
        if (nodeEvaluators === void 0) { nodeEvaluators = []; }
        var evaluator = new __1.Evaluator(expression_parser_1.parse);
        EvaluatorFactory
            .defaultEvaluators()
            .concat(nodeEvaluators)
            .forEach(function (item) { return evaluator.addNodeEvaluator(item); });
        return evaluator;
    };
    EvaluatorFactory.defaultEvaluators = function () {
        return [
            new __1.MemberNodeEvaluator,
            __1.MethodNodeEvaluatorFactory.create(),
            new __1.LogicNodeEvaluator,
            new __1.MathNodeEvaluator,
            new __1.EscapeNodeEvaluator,
            new __1.ConcatenateNodeEvaluator,
            new __1.NullNodeEvaluator,
        ];
    };
    return EvaluatorFactory;
}());
exports.EvaluatorFactory = EvaluatorFactory;
//# sourceMappingURL=EvaluatorFactory.js.map