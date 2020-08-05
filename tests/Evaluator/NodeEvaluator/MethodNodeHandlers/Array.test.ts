import ArrayHandler from "../../../../src/Evaluator/NodeEvaluator/MethodNodeEvaluator/MethodNodeHandlers/ArrayHandler"
import Node from "../../../../src/Evaluator/Node";

const handler = new ArrayHandler

const makeNode = (value : any) : Node => {
	const n = new Node({});
	n.value = value;
	return n;
}

it('constructs an array', () => {
	const expected = ['abc', '123']
	const actual = handler.array('abc', '123')
	expect(actual).toEqual(expected)
})

it('constructs an array from nodes', () => {
	const node1 = makeNode('abc')
	const node2 = makeNode('123')

	const expected = ['abc', '123']
	const actual = handler.array(node1, node2)

	expect(actual).toEqual(expected)
})

const inProvider: Array<[string, string[], boolean]> = [
	[
		'world',
		['hello', 'world', 'foo'],
		true
	],
	[
		'world',
		['hello', 'foo', 'bar'],
		false
	]
]

describe.each(inProvider)(
	'%#: in(%s, %s) : %s',
	(value, search, expected) => {
		test('in', () => {
			expect(handler.in(value, search)).toEqual(expected)
		})
	}
)

const countProvider: Array <[string[], number]> = [
	[
		[],
		0
	],
	[
		[''],
		1
	],
	[
		['hello', 'foo', 'bar'],
		3
	]
]

describe.each(countProvider)(
	'%#: count(%s) : %s',
	(arr, expected) => {
		test('count', () => {
			expect(handler.count(arr)).toEqual(expected)
		})
	}
)
