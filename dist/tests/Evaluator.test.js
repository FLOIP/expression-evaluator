"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Evaluator_1 = require("../src/Evaluator");
var Parser_1 = require("floip-parser/dist/Parser");
var evaluator = new Evaluator_1.Evaluator(Parser_1.parse);
it('returns a string from an expression', function () {
    expect(evaluator.evaluate('Hello World', {}))
        .toEqual('Hello World');
});
it('evaluates an expression with context member access', function () {
    expect(evaluator.evaluate('Hello @contact.name', { contact: { name: 'Kyle' } }))
        .toEqual('Hello Kyle');
});
//# sourceMappingURL=Evaluator.test.js.map