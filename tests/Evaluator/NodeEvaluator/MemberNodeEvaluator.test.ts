import MemberNodeEvaluator from '../../../src/Evaluator/NodeEvaluator/MemberNodeEvaluator';
import { NodeEvaluator } from '../../../src/Evaluator/NodeEvaluator';
import { MEMBER_TYPE } from '../../../src/Contract/Expression';
import Node from '../../../src/Evaluator/Node';

const evaluator : NodeEvaluator = new MemberNodeEvaluator;

const keysAndValuesProvider : Array<Array<Object|String>> = [
	[
		{
			type: MEMBER_TYPE,
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


describe.each(keysAndValuesProvider)(
	'evaluates member nodes with key and value',
	(data, context, expected) => {
		it('evaluates member node with key and value', () => {
			expect(evaluator.evaluate(new Node(data), context)).toEqual(expected);
		});
	},
  );
