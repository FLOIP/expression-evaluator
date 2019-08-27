import { NodeEvaluator } from ".";
import { NULL_TYPE } from "../../Contract/Expression";
import Node from "../Node";

export default class NullNodeEvaluator implements NodeEvaluator {
    handles(): string {
        return NULL_TYPE;
    }

    evaluate(node: Node, context: object) {
        return null;
    }
}
