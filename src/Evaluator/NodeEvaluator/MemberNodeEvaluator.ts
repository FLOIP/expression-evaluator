import { NodeEvaluator } from ".";
import Node from '../Node';
import { Member, MEMBER_TYPE } from "../../Contract/Expression";
import { NodeShapeError } from "./Exception";

export default class MemberNodeEvaluator implements NodeEvaluator {

	handles(): string {
		return MEMBER_TYPE;
	}

	/**
	 * Evaluate the value of a member access node given a context.
	 *
	 * @param node
	 * @param context
	 */
	evaluate(node: Node, context: object) {
		const data : Member = node.data as Member;

		this.typeGuard(data);

		if (!(data.key in context)) {
			if (data.value) {
				return `${data.key}.${data.value}`
			}
			return data.key;
		}

		const element = context[data.key];

		if (typeof data.value === 'undefined' || data.value === null) {
			// return the __value__ element of the context, or else the whole
			// context serialized
			if ('__value__' in element) {
				return element.__value__
			}
			return JSON.stringify(element);
		}
		return element[data.value];
	}

	typeGuard(member: Member) {
		if (!('key' in member)) {
			throw new NodeShapeError('Member node is the wrong shape, should have "key"');
		}
	}
}
