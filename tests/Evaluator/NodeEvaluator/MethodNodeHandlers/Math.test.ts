import Node from "../../../../src/Evaluator/Node";
import MathHandler from '../../../../src/Evaluator/NodeEvaluator/MethodNodeEvaluator/MethodNodeHandlers/MathHandler'

const handler = new MathHandler;

const makeNode = (value : any) : Node => {
	const n = new Node({});
	n.value = value;
	return n;
}

const maxProvider : Array<[Array<Node|number>, number]> = [
	[[1, 3, 2], 3],
	[[1, makeNode(5), 3], 5]
]

describe.each(maxProvider)(
	'%#: max(%o) : %i)',
	(input, expected) => {
		test('max', () => {
			//@ts-ignore
			expect(handler.max(...input)).toBe(expected);
		})
	}
)

const minProvider : Array<[Array<Node|number>, number]> = [
	[[2, 3, 5], 2],
	[[3, makeNode(1), 6], 1]
];

describe.each(minProvider)(
	'%#: min(%o) : %i)',
	(input, expected) => {
		test('min', () => {
			//@ts-ignore
			expect(handler.min(...input)).toBe(expected);
		})
	}
)

const absProvider : Array<[number|Node, number]> = [
	[3, 3],
	[-42, 42],
	[makeNode(-84), 84]
];

describe.each(absProvider)(
	'%#: abs(%d) : %i)',
	(input, expected) => {
		test('abs', () => {
			expect(handler.abs(input)).toBe(expected);
		})
	}
)

const powerProvider : Array<[number|Node, number|Node, number]> = [
	[3, 3, 27],
	[makeNode(3), makeNode(2), 9]
]

describe.each(powerProvider)(
	'%#: power(%o, %o) : %i)',
	(base, exponent, expected) => {
		test('power', () => {
			expect(handler.power(base, exponent)).toBe(expected);
		})
	}
)

const sumProvider : Array<[Array<number|Node>, number]> = [
	[[3, 4, 5], 12],
	[[makeNode(1), 2, makeNode(3)], 6],
	[[makeNode(1), 2, makeNode('5')], 8]
]

describe.each(sumProvider)(
	'%#: sum(%o) : %i)',
	(args, expected) => {
		test('sum', () => {
			//@ts-ignore
			expect(handler.sum(...args)).toBe(expected);
		})
	}
)
