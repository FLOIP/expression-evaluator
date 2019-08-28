import { NodeEvaluator, MethodNodeHandler } from "..";
import Node from "../../Node";
export interface MethodNodeHandler {
    handles(): Array<string>;
}
export declare class MethodNodeEvaluator implements NodeEvaluator {
    private handlers;
    constructor();
    addHandler(handler: MethodNodeHandler): this;
    getHandler(method: string): MethodNodeHandler;
    evaluate(node: Node, context: object): any;
    private value;
    private typeGuard;
    handles(): string;
}
