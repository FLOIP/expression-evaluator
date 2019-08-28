import MemberNodeEvaluator from '../../../src/Evaluator/NodeEvaluator/MemberNodeEvaluator';
import { NodeEvaluator } from '../../../src/Evaluator/NodeEvaluator';
import { MEMBER_TYPE } from '../../../src/Contract/Expression';
import Node from '../../../src/Evaluator/Node';

const evaluator : NodeEvaluator = new MemberNodeEvaluator;

const makeNode = (key : string, value : string|null) => {
	return new Node({
		type: MEMBER_TYPE,
		key,
		value,
	});
}

const keysAndValuesProvider : Array<[Node, object, string]> = [
	[
		makeNode('contact', 'name'),
		{
			contact: {
				name: 'Kyle'
			}
		},
		'Kyle'
	],
];

describe.each(keysAndValuesProvider)(
	'%#: node: %o context: %o => %s',
	(node, context, expected) => {
		it('evaluates member node with key and value', () => {
			expect(evaluator.evaluate(node, context)).toEqual(expected);
		});
	},
);

const keysNoValueProvider : Array<[Node, object, string]> = [
	[
		makeNode('contact', null),
		{
			contact: {
				name: 'Kyle',
				foo: 'bar'
			}
		},
		'{"name":"Kyle","foo":"bar"}'
	]
]

describe.each(keysNoValueProvider)(
	'%#: node: %o context: %o => %s',
	(node, context, expected) => {
		it('evaluates member node with key and no value', () => {
			expect(evaluator.evaluate(node, context)).toEqual(expected);
		})
	}
)

const keysDefaultValueProvider : Array<[Node, object, string]> = [
	[
		makeNode('contact', null),
		{
			contact: {
				name: 'Kyle',
				foo: 'bar',
				__value__: 'Some Guy'
			}
		},
		'Some Guy'
	]
]

describe.each(keysDefaultValueProvider)(
	'%#: node: %o context: %o => %s',
	(node, context, expected) => {
		it('evaluates member node with key and default value', () => {
			expect(evaluator.evaluate(node, context)).toEqual(expected);
		})
	}
)
