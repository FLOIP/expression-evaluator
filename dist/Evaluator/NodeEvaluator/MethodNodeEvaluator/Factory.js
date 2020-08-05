"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var DateTimeHandler_1 = __importDefault(require("./MethodNodeHandlers/DateTimeHandler"));
var ExcellentHandler_1 = __importDefault(require("./MethodNodeHandlers/ExcellentHandler"));
var LogicalHandler_1 = __importDefault(require("./MethodNodeHandlers/LogicalHandler"));
var MathHandler_1 = __importDefault(require("./MethodNodeHandlers/MathHandler"));
var TextHandler_1 = __importDefault(require("./MethodNodeHandlers/TextHandler"));
var ArrayHandler_1 = __importDefault(require("./MethodNodeHandlers/ArrayHandler"));
var MethodNodeEvaluatorFactory = /** @class */ (function () {
    function MethodNodeEvaluatorFactory() {
    }
    MethodNodeEvaluatorFactory.create = function (methodNodeHandlers) {
        if (methodNodeHandlers === void 0) { methodNodeHandlers = []; }
        var evaluator = new _1.MethodNodeEvaluator;
        MethodNodeEvaluatorFactory
            .defaultHandlers()
            .concat(methodNodeHandlers)
            .forEach(function (item) { return evaluator.addHandler(item); });
        return evaluator;
    };
    MethodNodeEvaluatorFactory.defaultHandlers = function () {
        return [
            new DateTimeHandler_1.default,
            new ExcellentHandler_1.default,
            new LogicalHandler_1.default,
            new MathHandler_1.default,
            new TextHandler_1.default,
            new ArrayHandler_1.default
        ];
    };
    return MethodNodeEvaluatorFactory;
}());
exports.default = MethodNodeEvaluatorFactory;
//# sourceMappingURL=Factory.js.map