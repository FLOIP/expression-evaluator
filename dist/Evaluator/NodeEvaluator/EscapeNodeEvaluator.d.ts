import { NodeEvaluator } from ".";
export default class EscapeNodeEvaluator implements NodeEvaluator {
    evaluate(node: import("../Node").default, context: object): string;
    handles(): string;
}
