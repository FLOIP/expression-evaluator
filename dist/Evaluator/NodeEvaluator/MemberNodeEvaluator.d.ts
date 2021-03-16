import {Member, Node, NodeEvaluator} from '../..';

export declare const MEMBER_TYPE = "MEMBER";
export declare class MemberNodeEvaluator implements NodeEvaluator {
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
//# sourceMappingURL=MemberNodeEvaluator.d.ts.map
