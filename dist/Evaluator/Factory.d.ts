import { Evaluator } from ".";
import { NodeEvaluator } from "./NodeEvaluator";
export default class EvaluatorFactory {
    static create(nodeEvaluators?: Array<NodeEvaluator>): Evaluator;
    static defaultEvaluators(): Array<NodeEvaluator>;
}
