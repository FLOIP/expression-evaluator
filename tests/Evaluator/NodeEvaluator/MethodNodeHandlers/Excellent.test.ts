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

describe.each(wordCountProvider)(
	'%#: word_count(%s) : %i)',
	(string, expected) => {
		expect(handler.word_count(string)).toBe(expected);
	}
)

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
);

const wordSliceProvider : Array<[string, number, number|undefined, boolean|undefined, string]> = [
	['RapidPro expressions are fun', 2, 4, undefined, 'expressions are'],
	['RapidPro expressions are fun', 2, undefined, undefined, 'expressions are fun'],
	['RapidPro expressions are fun', 1, -2, undefined, 'RapidPro expressions'],
	['RapidPro expressions are fun', -1, 2, undefined, 'fun']
];

describe.each(wordSliceProvider)(
	'%#: word_slice(%s, %i, %i, %s) : %s)',
	(string, start, stop, bySpaces, expected) => {
		test('word_slice', () => {
			expect(handler.word_slice(string, start, stop, bySpaces)).toBe(expected);
		})
	}
);

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

describe.each(isNumberProvider)(
	'%#: is_number(%s, %s) : %s',
	(input, expected) => {
		test('is_number', () => {
			expect(handler.is_number(input)).toBe(expected);
		})
	}
)

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

describe.each(isStringProvider)(
	'%#: is_string(%s, %s) : %s',
	(input, expected) => {
		test('is_string', () => {
			expect(handler.is_string(input)).toBe(expected);
		})
	}
)

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

describe.each(isBoolProvider)(
	'%#: is_bool(%s, %s) : %s',
	(input, expected) => {
		test('is_bool', () => {
			expect(handler.is_bool(input)).toBe(expected);
		})
	}
)
