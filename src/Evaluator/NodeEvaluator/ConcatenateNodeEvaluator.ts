import { NodeEvaluator } from ".";
import { CONCATENATE_TYPE, Concatenate } from "../../Contract/Expression";
import { NodeShapeError } from "./Exception";
import Node from "../Node";

export default class ConcatenateNodeEvaluator implements NodeEvaluator {
	public evaluate(node: Node, context: object) {
		const data : Concatenate = node.data as Concatenate;

		this.typeGuard(data);

		const lhs = this.value(data.lhs);
		const rhs = this.value(data.rhs);

		return String(lhs) + String(rhs);
	}
	
	private value(item : any) {
		if (item instanceof Node) {
			return item.value;
		}
		return item;
	}
	
	public handles(): string {
		return CONCATENATE_TYPE;
	}

	private typeGuard(concatenate : Concatenate) {
		for (let key of ['rhs, lhs']) {
			if (!(key in concatenate)) {
				throw new NodeShapeError('Concatenation node is the wrong shape, should have "rhs", "lhs"');
			}
		}
	}
}
