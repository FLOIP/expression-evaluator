"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var Parser_1 = require("floip-parser/dist/Parser");
var MemberNodeEvaluator_1 = __importDefault(require("./NodeEvaluator/MemberNodeEvaluator"));
var LogicNodeEvaluator_1 = __importDefault(require("./NodeEvaluator/LogicNodeEvaluator"));
var MathNodeEvaluator_1 = __importDefault(require("./NodeEvaluator/MathNodeEvaluator"));
var EscapeNodeEvaluator_1 = __importDefault(require("./NodeEvaluator/EscapeNodeEvaluator"));
var ConcatenateNodeEvaluator_1 = __importDefault(require("./NodeEvaluator/ConcatenateNodeEvaluator"));
var Factory_1 = __importDefault(require("./NodeEvaluator/MethodNodeEvaluator/Factory"));
var EvaluatorFactory = /** @class */ (function () {
    function EvaluatorFactory() {
    }
    EvaluatorFactory.create = function (nodeEvaluators) {
        if (nodeEvaluators === void 0) { nodeEvaluators = []; }
        var evaluator = new _1.Evaluator(Parser_1.parse);
        EvaluatorFactory
            .defaultEvaluators()
            .concat(nodeEvaluators)
            .forEach(function (item) { return evaluator.addNodeEvaluator(item); });
        return evaluator;
    };
    EvaluatorFactory.defaultEvaluators = function () {
        return [
            new MemberNodeEvaluator_1.default,
            Factory_1.default.create(),
            new LogicNodeEvaluator_1.default,
            new MathNodeEvaluator_1.default,
            new EscapeNodeEvaluator_1.default,
            new ConcatenateNodeEvaluator_1.default,
        ];
    };
    return EvaluatorFactory;
}());
exports.default = EvaluatorFactory;
//# sourceMappingURL=Factory.js.map