import Logical from '../../../../src/Evaluator/NodeEvaluator/MethodNodeEvaluator/MethodNodeHandlers/Logical'
import Node from '../../../../src/Evaluator/Node';

const handler = new Logical;

const makeNode = (value) => {
	const n = new Node({});
	n.value = value;
	return n;
}

const andProvider : Array<[Array<any>, boolean]> = [
	[[true, true], true],
	[[true, false], false],
	[[true, true, false], false],
	[[makeNode(true), true], true],
	[[makeNode(false), false], false],
	[[makeNode('TRUE'), true], true],
	[[makeNode('FALSE'), true], false]
]

describe.each(andProvider)(
	'%#: and(%o) : %s',
	(args, expected) => {
		test('and', () => {
			expect(handler.and(...args)).toBe(expected);
		})
	}
)

const ifProvider : Array<[Array<any>, number]> = [
	[[true, 1, 2], 1],
	[[false, 1, 2], 2],
	[[makeNode(true), 1, 2], 1],
	[[makeNode(false), 1, 2], 2],
	[[makeNode('TRUE'), 1, 2], 1],
	[[makeNode('FALSE'), 1, 2], 2]
]

describe.each(ifProvider)(
	'%#: if(%o) : %s',
	(args, expected) => {
		test('if', () => {
			expect(handler.if(...args)).toBe(expected);
		})
	}
)
