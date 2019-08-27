import { NodeEvaluator } from ".";
import Node from "../Node";
import { Math as MathExpression, MATH_TYPE } from "../../Contract/Expression";
import { NodeShapeError, NodeEvaluatorError } from "./Exception";

export default class MathNodeEvaluator implements NodeEvaluator {
	evaluate(node: Node, context: object) {
		const data : MathExpression = node.data as MathExpression;

		this.typeGuard(data);

		const lhs = this.value(data.lhs);
		const rhs = this.value(data.rhs);
		const operator = data.operator;

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
	
	handles(): string {
		return MATH_TYPE;
	}

	private value(item) {
		if (item instanceof Node) {
			item = item.value;
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
