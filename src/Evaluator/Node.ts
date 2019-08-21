import { Expression } from "../Contract/Expression";

export default class Node {
	public data : Expression;
	public value : any;

	constructor(data: object) {
		this.data = data as Expression;
	}

	public static isNode(item: any) {
		return typeof item === 'object'
		&& item !== null 
		&& item.hasOwnProperty('type');
	}

	public type() {
		return this.data.type;
	}

	public toString(): string {
		if (typeof this.value === 'undefined') {
			throw new Error('Expression node value not set');
		}
		if (typeof this.value === 'boolean') {
			return this.value ? 'TRUE' : 'FALSE';
		}
		return this.value;
	}
}
