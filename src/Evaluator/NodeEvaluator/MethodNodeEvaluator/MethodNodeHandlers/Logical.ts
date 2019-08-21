import { MethodNodeHandler } from "../..";
import Node from "../../../Node";
import { NodeEvaluatorError } from "../../Exception";

export default class Logical implements MethodNodeHandler {
	public handles(): string[] {
		throw new Error("Method not implemented.");
	}

	public and(...args : any[]) : boolean {
		for (let arg of args.map(this.value).filter(this.isScalar)) {
			if (arg == false) {
				return false;
			}
		}
		return true;
	}

	public if(...args : any[]) : any {
		args = args.map(this.value).filter(this.isScalar);
		if (args.length != 3) {
			throw new NodeEvaluatorError()
		}
		return args[0] ? args[1] : args[2];
	}

	public or(...args : any[]) : boolean {
		for (let arg of args.map(this.value).filter(this.isScalar)) {
			if (arg == true) {
				return true;
			}
		}
		return false;
	}

	private isScalar(item : any) : boolean {
		return (/boolean|number|string/).test(typeof item);
	}

	private value(item : any) : boolean {
		if (item instanceof Node) {
			let val = item.value;
			if (typeof val === 'string') {
				switch (val.toUpperCase()) {
					case 'TRUE':
						return true;
					case 'FALSE':
						return false;
				}
			}
			if (typeof val === 'boolean') {
				return val;
			}
			return false;

		}
		return item;
	}
}
