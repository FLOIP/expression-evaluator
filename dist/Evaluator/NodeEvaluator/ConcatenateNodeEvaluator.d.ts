import {Node, NodeEvaluator} from "../../";

export declare const CONCATENATE_TYPE = "CONCATENATE";
export declare class ConcatenateNodeEvaluator implements NodeEvaluator {
    evaluate(node: Node, _context: object): string;
    private value;
    handles(): string;
    private typeGuard;
}
//# sourceMappingURL=ConcatenateNodeEvaluator.d.ts.map
