"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Factory_1 = __importDefault(require("../src/Evaluator/Factory"));
var evaluator = Factory_1.default.create();
it('returns a string from an expression', function () {
    expect(evaluator.evaluate('Hello World', {}))
        .toEqual('Hello World');
});
it('evaluates an expression with context member access', function () {
    expect(evaluator.evaluate('Hello @contact.name', { contact: { name: 'Kyle' } }))
        .toEqual('Hello Kyle');
});
//# sourceMappingURL=Evaluator.test.js.map