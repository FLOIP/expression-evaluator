import MathNodeEvaluator from '../../../src/Evaluator/NodeEvaluator/MathNodeEvaluator'
import DateHandler from '../../../src/Evaluator/NodeEvaluator/MethodNodeEvaluator/MethodNodeHandlers/DateTimeHandler'
import Node from '../../../src/Evaluator/Node';
import { MATH_TYPE } from '../../../src/Contract/Expression';
import moment = require('moment');

const evaluator = new MathNodeEvaluator;
const dateHandler = new DateHandler;

const dateNode = (year : number, month : number, day : number) : Node => {
	const n = new Node({});
	n.value = dateHandler.date(year, month, day);
	return n;
}

const timeNode = (hour : number, minute: number, second : number) : Node => {
	const n = new Node({});
	n.value = dateHandler.time(hour, minute, second);
	return n;
}

const mathNode = (lhs: any, rhs: any, operator: string) : Node => {
	return new Node({
		type: MATH_TYPE,
		lhs,
		rhs,
		operator
	});
}

const dateTimeMathProvider : Array<[Node, string]> = [
	[
		mathNode(dateNode(2019, 1, 1), timeNode(9, 30, 42), '+'),
		moment('2019-01-01 09:30:42').toString(),
	],
	[
		mathNode(dateNode(2019, 1, 1), timeNode(9, 30, 42), '-'),
		moment('2018-12-31 14:29:18').toString(),
	]
]

describe.each(dateTimeMathProvider)(
	'',
	(node, expected) => {
		it('performs math on dates and times', () => {
			//@ts-ignore
			expect(evaluator.evaluate(node, {}).toString()).toBe(expected);
		})
	}
)
