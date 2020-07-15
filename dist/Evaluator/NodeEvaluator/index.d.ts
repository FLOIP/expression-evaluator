import Node from '../Node';
interface NodeValue {
    value: any;
    toString(): string;
}
interface NodeEvaluator {
    evaluate(node: Node, context: object): any;
    handles(): string;
}
declare class NodeEvaluatorException extends Error {
}
export { NodeValue, NodeEvaluatorException, NodeEvaluator, };
