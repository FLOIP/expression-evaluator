import { NodeEvaluator } from ".";
export default class LogicNodeEvaluator implements NodeEvaluator {
    evaluate(node: import("../Node").default, context: object): boolean;
    handles(): string;
    private value;
    private typeGuard;
}
