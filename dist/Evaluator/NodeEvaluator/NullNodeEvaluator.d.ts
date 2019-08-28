import { NodeEvaluator } from ".";
import Node from "../Node";
export default class NullNodeEvaluator implements NodeEvaluator {
    handles(): string;
    evaluate(node: Node, context: object): null;
}
