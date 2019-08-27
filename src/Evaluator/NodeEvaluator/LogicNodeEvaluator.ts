import { NodeEvaluator } from ".";
import { Logic, LOGIC_TYPE } from "../../Contract/Expression";
import { NodeShapeError, NodeEvaluatorError } from "./Exception";
import Node from "../Node";

export default class LogicNodeEvaluator implements NodeEvaluator {
	evaluate(node: import("../Node").default, context: object) {
		const data : Logic = node.data as Logic;

		this.typeGuard(data);

		let lhs = this.value(data.lhs);
		let rhs = this.value(data.rhs);

		if (!isNaN(lhs)) {
			lhs = Number(lhs);
		}
		if (!isNaN(rhs)) {
			rhs = Number(rhs);
		}

		const operator = data.operator;

		switch(operator) {
            case '<':
                return lhs < rhs;
            case '<=':
                return lhs <= rhs;
            case '>':
                return lhs > rhs;
            case '>=':
                return lhs >= rhs;
            case '=':
                return lhs == rhs;
            case '!=':
            case '<>':
                return lhs !== rhs;
		}
		throw new NodeEvaluatorError(`${operator} is not a valid logic operator`);
	}
	
	handles(): string {
		return LOGIC_TYPE;
	}

	private value(item) {
		if (item instanceof Node) {
			item = item.value;
		}
		if (typeof item === 'string') {
			if (item.toUpperCase() === 'TRUE') {
				return true;
			}
			if (item.toUpperCase() === 'FALSE') {
				return false;
			}
		}
		return item;
	}

	private typeGuard(logic : Logic) {
		for (let key of ['rhs' , 'lhs', 'operator']) {
			if (!(key in logic)) {
				throw new NodeShapeError('Logic node is the wrong shape, should have "rhs", "lhs", "operator"');
			}
		}
	}
}
