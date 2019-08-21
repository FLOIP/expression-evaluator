import Excellent from "../../../../src/Evaluator/NodeEvaluator/MethodNodeEvaluator/MethodNodeHandlers/Excellent";
import Node from "../../../../src/Evaluator/Node";

const handler = new Excellent;

const wordProvider : Array<[string, number, boolean, string]> = [
	['hello cow-boy', 2, false, 'cow'],
	['hello cow-boy', 2, true, 'cow-boy'],
	['hello cow-boy', -1, false, 'boy'],
];

describe.each(wordProvider)(
	'%#: word(%s, %d, %s) : %s',
	(string, number, bySpaces, expected) => {
		it('excellent word function', () => {
			expect(handler.word(string, number, bySpaces)).toBe(expected);
		});
	}
)

const wordCountProvider : Array<[string, number]> = [
	['I am a little teapot.', 5],
	['I.am.a.little.teapot', 5],
	['I am. A. Little.Teapot', 5],
	['I.Am,A!Little;Teapot:', 5],
];

const firstWordProvider : Array<[string, string]> = [
	['Foo Bar', 'Foo'],
	['Foo,Bar', 'Foo'],
	['Foo. Bar', 'Foo'],
	['Foo...bar!', 'Foo'],
];

describe.each(firstWordProvider)(
	'%#: first_word(%s) : %s)',
	(string, expected) => {
		expect(handler.first_word(string)).toBe(expected);
	}
)

const wordSliceProvider : Array<[string, number, number|null, boolean|null, string]> = [
	['RapidPro expressions are fun', 2, 4, null, 'expressions are'],
	['RapidPro expressions are fun', 2, null, null, 'expressions are fun'],
	['RapidPro expressions are fun', 1, -2, null, 'RapidPro expressions'],
	['RapidPro expressions are fun', -1, 2, null, 'fun']
];

const isNumberProvider : Array<[any, boolean]> = [
	[0, true],
	[-1, true],
	[1, true],
	['0', true],
	['-100', true],
	['100', true],
	[true, false],
	['string', false],
	['TRUE', false]
];

const isStringProvider : Array<[any, boolean]> = [
	['yes', true],
	['', true],
	[0, false],
	[1, false],
	[-1, false],
	['0', false],
	['1', false],
	['-1', false],
	[true, false]
];

const makeNode = (value : any) : Node => {
	const n = new Node({});
	n.value = value;
	return n;
}

const isBoolProvider : Array<[any, boolean]> = [
	['TRUE', true],
	['FALSE', true],
	[makeNode(true), true],
	[makeNode(false), true],
	[makeNode('foo'), false],
	[makeNode(42), false],
	['true', false],
	['false', false],
	['yes', false],
	['', false],
	[0, false],
	[1, false],
	[-1, false]
]
