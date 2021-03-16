import {Node, NodeEvaluator} from "../..";

export declare const LOGIC_TYPE = "LOGIC";
export declare class LogicNodeEvaluator implements NodeEvaluator {
    evaluate(node: Node, _context: object): boolean;
    handles(): string;
    private value;
    private typeGuard;
}
//# sourceMappingURL=LogicNodeEvaluator.d.ts.map
