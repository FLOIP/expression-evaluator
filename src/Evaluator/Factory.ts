import { Evaluator } from ".";
import {parse} from 'floip-parser/dist/Parser';
import { NodeEvaluator } from "./NodeEvaluator";
import MemberNodeEvaluator from "./NodeEvaluator/MemberNodeEvaluator";
import { MethodNodeEvaluator } from "./NodeEvaluator/MethodNodeEvaluator";

export class EvaluatorFactory {
	private nodeEvaluators : Array<NodeEvaluator>;

	constructor(nodeEvaluators : Array<NodeEvaluator> = []) {
		this.nodeEvaluators = [
			new MemberNodeEvaluator,
			new MethodNodeEvaluator,
			...nodeEvaluators,
		]
	}

	public create() : Evaluator {
		const evaluator = new Evaluator(parse);

		this.nodeEvaluators.forEach(evaluator.addNodeEvaluator);

		return evaluator;
	}
}
