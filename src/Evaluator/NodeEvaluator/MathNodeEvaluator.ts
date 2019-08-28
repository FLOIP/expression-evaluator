import { NodeEvaluator } from ".";
import Node from "../Node";
import { Math as MathExpression, MATH_TYPE } from "../../Contract/Expression";
import { NodeShapeError, NodeEvaluatorError } from "./Exception";
import moment, { Moment, Duration } from 'moment';

export default class MathNodeEvaluator implements NodeEvaluator {
	evaluate(node: Node, context: object) {
		const data : MathExpression = node.data as MathExpression;

		this.typeGuard(data);

		const lhs = this.value(data.lhs);
		const rhs = this.value(data.rhs);
		const operator = data.operator;

		// special handling for math operations on dates
		if (typeof lhs === 'object' || typeof rhs === 'object') {
			if (moment.isMoment(lhs)) {
				if (moment.isDuration(rhs)) {
					return this.evaluateDateMath(lhs, rhs, operator);
				}
				// can only add durations to dates
				throw new NodeEvaluatorError(`When lhs of equation is a date, rhs, must be a duration, got ${typeof rhs}`)
			}
			throw new NodeEvaluatorError(`Can only perform math on numbers or date/time, got ${typeof lhs} and ${typeof rhs}`)
		}

		switch(operator) {
            case '+':
                return lhs + rhs;
            case '-':
                return lhs - rhs;
            case '/':
                return lhs / rhs;
            case '*':
                return lhs * rhs;
            case '^':
				return Math.pow(lhs, rhs);
        }
	}

	private evaluateDateMath(lhs : Moment, rhs : Duration, operator) {
		switch(operator) {
			case '+':
				return lhs.add(rhs);
			case '-':
				return lhs.subtract(rhs);
		}
		throw new NodeEvaluatorError(`Cannot perform operation ${operator} on dates`)
	}

	handles(): string {
		return MATH_TYPE;
	}

	private value(item) {
		if (item instanceof Node) {
			item = item.value;
		} 
		if (moment.isDuration(item) || moment.isMoment(item)) {
			return item;
		}
		if (!isNaN(item)) {
			return Number(item);
		}
		throw new NodeEvaluatorError(`Can only perform math on numbers, got ${item}`)
	}

	private typeGuard(math : MathExpression) {
		for (let key of ['rhs', 'lhs', 'operator']) {
			if (!(key in math)) {
				throw new NodeShapeError('Math node is the wrong shape, should have "rhs", "lhs", "operator"');
			}
		}
	}
}
