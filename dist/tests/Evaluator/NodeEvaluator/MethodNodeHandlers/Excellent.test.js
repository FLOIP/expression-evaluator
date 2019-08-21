"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Excellent_1 = __importDefault(require("../../../../src/Evaluator/NodeEvaluator/MethodNodeEvaluator/MethodNodeHandlers/Excellent"));
var handler = new Excellent_1.default;
var wordProvider = [
    ['hello cow-boy', 2, false, 'cow'],
    ['hello cow-boy', 2, true, 'cow-boy'],
    ['hello cow-boy', -1, false, 'boy'],
];
describe.each(wordProvider)('%#: word(%s, %d, %s) : %s', function (string, number, bySpaces, expected) {
    it('excellent word function', function () {
        expect(handler.word(string, number, bySpaces)).toEqual(expected);
    });
});
//# sourceMappingURL=Excellent.test.js.map