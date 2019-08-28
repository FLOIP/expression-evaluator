import { NodeEvaluator } from ".";
import Node from "../Node";
export default class ConcatenateNodeEvaluator implements NodeEvaluator {
    evaluate(node: Node, context: object): string;
    private value;
    handles(): string;
    private typeGuard;
}
