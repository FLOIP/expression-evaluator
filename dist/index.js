"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvaluatorFactory = exports.Evaluator = void 0;
var Evaluator_1 = require("./Evaluator");
Object.defineProperty(exports, "Evaluator", { enumerable: true, get: function () { return Evaluator_1.Evaluator; } });
var Factory_1 = __importDefault(require("./Evaluator/Factory"));
exports.EvaluatorFactory = Factory_1.default;
exports.default = Evaluator_1.Evaluator;
//# sourceMappingURL=index.js.map