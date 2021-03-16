import {Node, NodeEvaluator} from "../..";

export declare const IDENTIFIER = "@";
export declare const ESCAPE_TYPE = "ESCAPE";
export declare class EscapeNodeEvaluator implements NodeEvaluator {
    evaluate(_node: Node, _context: object): string;
    handles(): string;
}
//# sourceMappingURL=EscapeNodeEvaluator.d.ts.map
