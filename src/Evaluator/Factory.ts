import { Evaluator } from ".";
import {parse} from 'floip-parser/dist/Parser';
import { NodeEvaluator } from "./NodeEvaluator";
import MemberNodeEvaluator from "./NodeEvaluator/MemberNodeEvaluator";
import { MethodNodeEvaluator } from "./NodeEvaluator/MethodNodeEvaluator";
import LogicNodeEvaluator from "./NodeEvaluator/LogicNodeEvaluator";
import MathNodeEvaluator from "./NodeEvaluator/MathNodeEvaluator";
import EscapeNodeEvaluator from "./NodeEvaluator/EscapeNodeEvaluator";
import ConcatenateNodeEvaluator from "./NodeEvaluator/ConcatenateNodeEvaluator";

export default class EvaluatorFactory {
	public static create(nodeEvaluators : Array<NodeEvaluator> = []) : Evaluator {
		const evaluator = new Evaluator(parse);

		EvaluatorFactory
			.defaultEvaluators()
			.concat(nodeEvaluators)
			.forEach(evaluator.addNodeEvaluator);

		return evaluator;
	}

	public static defaultEvaluators() : Array<NodeEvaluator> {
		return [
			new MemberNodeEvaluator,
			new MethodNodeEvaluator,
			new LogicNodeEvaluator,
			new MathNodeEvaluator,
			new EscapeNodeEvaluator,
			new ConcatenateNodeEvaluator,
		];
	}
}
