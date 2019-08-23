import Node from "../../../../src/Evaluator/Node";
import TextHandler from "../../../../src/Evaluator/NodeEvaluator/MethodNodeEvaluator/MethodNodeHandlers/TextHandler"

const handler = new TextHandler;

const makeNode = (value : any) : Node => {
	const n = new Node({});
	n.value = value;
	return n;
}

const fixedProvider : Array<[number, number, boolean, string]> = [
	[3.7979, 2, false, "3.79"],
	[4000.424242, 4, true, "4,000.424"],
	[3, 0, true, "3"]
]

describe.each(fixedProvider)(
	'%#: fixed(%i, %i, %s) : %s',
	(num, digits, commas, expected) => {
		test('fixed', () => {
			expect(handler.fixed(num, digits, commas)).toBe(expected);
		})
	}
)

const properProvider : Array<[string|Node, string]> = [
	['hello world', 'Hello World'],
	['hello World helloworld Helloworld', 'Hello World Helloworld Helloworld'],
	['one-two     three&four.five,six? seven', 'One-two     Three&four.five,six? Seven']
];

describe.each(properProvider)(
	'%#: proper(%s) : %s',
	(input, expected) => {
		test('proper', () => {
			expect(handler.proper(input)).toBe(expected);
		})
	}
)
