import {Node} from "../.."

export interface NodeValue {
  value: any,

  toString(): string,
}

export interface NodeEvaluator {
  evaluate(node: Node, context: object): any,

  handles(): string,
}

export class NodeEvaluatorException extends Error {
}
