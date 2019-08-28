import { Evaluator } from ".";
import {parse} from 'floip-parser/dist/Parser';
import { NodeEvaluator } from "./NodeEvaluator";
import MemberNodeEvaluator from "./NodeEvaluator/MemberNodeEvaluator";
import LogicNodeEvaluator from "./NodeEvaluator/LogicNodeEvaluator";
import MathNodeEvaluator from "./NodeEvaluator/MathNodeEvaluator";
import EscapeNodeEvaluator from "./NodeEvaluator/EscapeNodeEvaluator";
import ConcatenateNodeEvaluator from "./NodeEvaluator/ConcatenateNodeEvaluator";
import MethodNodeEvaluatorFactory from "./NodeEvaluator/MethodNodeEvaluator/Factory";
import NullNodeEvaluator from "./NodeEvaluator/NullNodeEvaluator";

export default class EvaluatorFactory {
	public static create(nodeEvaluators : Array<NodeEvaluator> = []) : Evaluator {
		const evaluator = new Evaluator(parse);

		EvaluatorFactory
			.defaultEvaluators()
			.concat(nodeEvaluators)
			.forEach(item => evaluator.addNodeEvaluator(item));

		return evaluator;
	}

	public static defaultEvaluators() : Array<NodeEvaluator> {
		return [
			new MemberNodeEvaluator,
			MethodNodeEvaluatorFactory.create(),
			new LogicNodeEvaluator,
			new MathNodeEvaluator,
			new EscapeNodeEvaluator,
			new ConcatenateNodeEvaluator,
			new NullNodeEvaluator,
		];
	}
}
