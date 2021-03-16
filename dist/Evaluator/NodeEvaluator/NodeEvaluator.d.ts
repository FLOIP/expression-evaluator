import {Node} from "../..";

export interface NodeValue {
    value: any;
    toString(): string;
}
export interface NodeEvaluator {
    evaluate(node: Node, context: object): any;
    handles(): string;
}
export declare class NodeEvaluatorException extends Error {
}
//# sourceMappingURL=NodeEvaluator.d.ts.map
