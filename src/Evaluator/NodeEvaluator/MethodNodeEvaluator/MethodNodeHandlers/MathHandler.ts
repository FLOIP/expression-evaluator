import AbstractNodeHandler from "./AbstractNodeHandler";
import Node from "../../../Node";

export default class MathHandler extends AbstractNodeHandler {
	public handles(): string[] {
		return [
			'abs',
			'max',
			'min',
			'power',
			'sum',
		];
	}

	public abs(number : number|Node) {
		return Math.abs(this.value(number));
	}

	public max(...args : [number|Node]) {
		//@ts-ignore
		return Math.max(...(args.map(this.value)));
	}

	public min(...args : [number|Node]) {
		//@ts-ignore
		return Math.min(...(args.map(this.value)));
	}

	public power(number : number|Node, power : number|Node) {
		return Math.pow(this.value(number), this.value(power));
	}

	public sum(...args : [number|Node]) {
		//@ts-ignore
		return args.map(this.value)
			       .reduce((carry, n) => carry += Number(n));
	}
}
