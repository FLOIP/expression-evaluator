import AbstractNodeHandler from "./AbstractNodeHandler";
import Node from "../../../Node";
import { NodeEvaluatorError } from "../../Exception";

export default class ArrayHandler extends AbstractNodeHandler {
	public handles(): string[] {
		return [
			'array',
			'in'
		];
	}

	public array(...args: any[]): any[] {
		return args.map(this.value)
	}

	public in(value: any, array: Node|any[]): boolean {
		let search = array
		if (array instanceof Node) {
			search = array.value
		}
		if (!Array.isArray(search)) {
			throw new NodeEvaluatorError(`Can only perform IN on an array, got ${typeof search}`)
		}
		return (search).includes(value)
	}
}
