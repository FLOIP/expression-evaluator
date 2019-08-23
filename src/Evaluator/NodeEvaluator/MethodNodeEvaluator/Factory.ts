import { MethodNodeHandler, MethodNodeEvaluator } from ".";
import DateTimeHandler from "./MethodNodeHandlers/DateTimeHandler";
import ExcellentHandler from "./MethodNodeHandlers/ExcellentHandler";
import LogicalHandler from "./MethodNodeHandlers/LogicalHandler";
import MathHandler from "./MethodNodeHandlers/MathHandler";
import TextHandler from "./MethodNodeHandlers/TextHandler";

export default class MethodNodeEvaluatorFactory {
	public static create(methodNodeHandlers : Array<MethodNodeHandler> = []) : MethodNodeEvaluator {
		const evaluator = new MethodNodeEvaluator;
		
		MethodNodeEvaluatorFactory
			.defaultHandlers()
			.concat(methodNodeHandlers)
			.forEach(item => evaluator.addHandler(item))

		return evaluator;
	}

	public static defaultHandlers() : Array<MethodNodeHandler> {
		return [
			new DateTimeHandler,
			new ExcellentHandler,
			new LogicalHandler,
			new MathHandler,
			new TextHandler,
		];
	}
}
