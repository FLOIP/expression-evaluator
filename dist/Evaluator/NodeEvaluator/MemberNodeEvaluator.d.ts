import { NodeEvaluator } from ".";
import Node from '../Node';
import { Member } from "../../Contract/Expression";
export default class MemberNodeEvaluator implements NodeEvaluator {
    handles(): string;
    /**
     * Evaluate the value of a member access node given a context.
     *
     * @param node
     * @param context
     */
    evaluate(node: Node, context: object): any;
    typeGuard(member: Member): void;
}
