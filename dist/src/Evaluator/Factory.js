"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var Parser_1 = require("floip-parser/dist/Parser");
var MemberNodeEvaluator_1 = __importDefault(require("./NodeEvaluator/MemberNodeEvaluator"));
var MethodNodeEvaluator_1 = require("./NodeEvaluator/MethodNodeEvaluator");
var EvaluatorFactory = /** @class */ (function () {
    function EvaluatorFactory(nodeEvaluators) {
        if (nodeEvaluators === void 0) { nodeEvaluators = []; }
        this.nodeEvaluators = [
            new MemberNodeEvaluator_1.default,
            new MethodNodeEvaluator_1.MethodNodeEvaluator
        ].concat(nodeEvaluators);
    }
    EvaluatorFactory.prototype.create = function () {
        var evaluator = new _1.Evaluator(Parser_1.parse);
        this.nodeEvaluators.forEach(evaluator.addNodeEvaluator);
        return evaluator;
    };
    return EvaluatorFactory;
}());
exports.EvaluatorFactory = EvaluatorFactory;
//# sourceMappingURL=Factory.js.map