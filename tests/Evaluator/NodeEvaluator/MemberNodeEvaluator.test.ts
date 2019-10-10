import MemberNodeEvaluator from '../../../src/Evaluator/NodeEvaluator/MemberNodeEvaluator';
import { NodeEvaluator } from '../../../src/Evaluator/NodeEvaluator';
import { MEMBER_TYPE } from '../../../src/Contract/Expression';
import Node from '../../../src/Evaluator/Node';

const evaluator : NodeEvaluator = new MemberNodeEvaluator;

const makeNode = (key : string) => {
	return new Node({
		type: MEMBER_TYPE,
		key,
	});
}

const keysAndValuesProvider : Array<[Node, object, string]> = [
	[
		makeNode('contact.name'),
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
		makeNode('contact'),
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
		makeNode('contact'),
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

const absentKeyProvider : Array<[Node, object, string]> = [
	[
		makeNode('contact.name'),
		{}, // empty context
		'contact.name',
	],
	[
		makeNode('contact.foo.bar.baz'),
		{},
		'contact.foo.bar.baz'
	]
]

describe.each(absentKeyProvider)(
	'%#: node: %o context: %o => %s',
	(node, context, expected) => {
		it('evaluates empty context access to key and value string', () => {
			expect(evaluator.evaluate(node, context)).toEqual(expected);
		})
	}
)

const arrayReturnProvider : Array<[Node, object, Array<any>]> = [
	[
		makeNode('flow.multipleChoice.value'),
		{
			flow: {
				multipleChoice: {
					value: [1, 'two', 3]
				}
			}
		},
		[1, 'two', 3]
	]
]

describe.each(arrayReturnProvider)(
	'%#: node: %o context: %o => %s',
	(node, context, expected) => {
		it('evaluates context array value to array', () => {
			expect(evaluator.evaluate(node, context)).toEqual(expected);
		})
	}
)

const nestedContextProvider : Array<[Node, object, string]> = [
	[
		makeNode('contact.lang.default'),
		{
			contact: {
				lang: {
					default: 'en',
					available: ['fr']
				}
			}
		},
		'en'
	],
	[
		makeNode('contact.address.business.city'),
		{
			contact: {
				name: 'Kyle',
				address: {
					business: {
						city: 'Winnipeg'
					}
				}
			}
		},
		'Winnipeg'
	],
	[
		makeNode('contact.address.business.city'),
		{
			contact: {
				name: 'Kyle',
				address: {
					business: {
						foo: 'bar',
						__value__: '42'
					}
				}
			}
		},
		'contact.address.business.city'
	],
	[
		makeNode('contact.address.business'),
		{
			contact: {
				name: 'Kyle',
				address: {
					business: {
						foo: 'bar',
						__value__: '42'
					}
				}
			}
		},
		'42'
	],
	[
		makeNode('contact.address.business'),
		{
			contact: {
				name: 'Kyle',
				address: {
					business: {
						foo: 'bar',
					}
				}
			}
		},
		'{"foo":"bar"}'
	],
]

describe.each(nestedContextProvider)(
	'%#: node: %o context: %o => %s',
	(node, context, expected) => {
		it('evaluates nested context', () => {
			expect(evaluator.evaluate(node, context)).toEqual(expected);
		})
	}
)

const numericKeyProvider : Array<[Node, object, string]> = [
	[
		makeNode('flow.1570165060485_42.value'),
		{
			'flow' : {
				'1570165060485_42' : {
					'value' : 'Some Value',
					'__value__' : 'Some Default'
				}
			}
		},
		'Some Value'
	],
	[
		makeNode('flow.1570165060485_42'),
		{
			'flow' : {
				'1570165060485_42' : {
					'value' : 'Some Value',
					'__value__' : 'Some Default'
				}
			}
		},
		'Some Default'
	],
]

describe.each(numericKeyProvider)(
	'%#: node: %o context: %o => %s',
	(node, context, expected) => {
		it('evaluates numeric key access in context', () => {
			expect(evaluator.evaluate(node, context)).toEqual(expected);
		})
	}
)
