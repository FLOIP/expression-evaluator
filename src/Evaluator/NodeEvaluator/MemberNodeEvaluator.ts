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

		// the requested object does not exist in the context, so just
		// return the key/value that was requested as they were entered in
		// the expression (e.g. return 'contact.name')
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
		return this.get(element, data.value);
	}

	typeGuard(member: Member) {
		if (!('key' in member)) {
			throw new NodeShapeError('Member node is the wrong shape, should have "key"');
		}
	}

	private get(context: object, key: string) {
		const keys = key.split('.');
		let currentContext = context;

		// traverse the context tree until we run out of keys
		for (const currentKey of keys) {
			if (currentKey in currentContext) {
				currentContext = currentContext[currentKey];
			} else {
				// if our current key doesn't exist, we return the compound key
				return key;
			}
		}

		// at this point, we have a value associated with our key
		// if it is a nested context, return its default value or JSON
		if (!Array.isArray(currentContext)
		&& typeof currentContext === 'object'
		&& currentContext !== null) {
			if ('__value__' in currentContext) {
				return currentContext['__value__'];
			}
			return JSON.stringify(currentContext);
		}
		return currentContext;
	}
}
