"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var MemberNodeEvaluator_1 = __importDefault(require("../../../src/Evaluator/NodeEvaluator/MemberNodeEvaluator"));
var Expression_1 = require("../../../src/Contract/Expression");
var Node_1 = __importDefault(require("../../../src/Evaluator/Node"));
var evaluator = new MemberNodeEvaluator_1.default;
var keysAndValuesProvider = [
    [
        {
            type: Expression_1.MEMBER_TYPE,
            key: 'contact',
            value: 'name',
        },
        {
            contact: {
                name: 'Kyle'
            }
        },
        'Kyle'
    ]
];
describe.each(keysAndValuesProvider)('evaluates member nodes with key and value', function (data, context, expected) {
    it('evaluates member node with key and value', function () {
        expect(evaluator.evaluate(new Node_1.default(data), context)).toEqual(expected);
    });
});
//# sourceMappingURL=MemberNodeEvaluator.test.js.map