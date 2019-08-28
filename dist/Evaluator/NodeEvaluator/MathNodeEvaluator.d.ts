import { NodeEvaluator } from ".";
import Node from "../Node";
export default class MathNodeEvaluator implements NodeEvaluator {
    evaluate(node: Node, context: object): number | undefined;
    handles(): string;
    private value;
    private typeGuard;
}
