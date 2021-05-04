import {Node, NodeEvaluator, Bool as BoolExpression} from "../.."
import { NodeEvaluatorError } from "./NodeEvaluatorError";
import { NodeShapeError } from "./NodeShapeError";

export const BOOL_TYPE = 'BOOL'

export class BoolNodeEvaluator implements NodeEvaluator {
  handles(): string {
    return BOOL_TYPE;
  }

  evaluate(_node: Node, _context: object): boolean {
    const data: BoolExpression = _node.data as BoolExpression

    this.typeGuard(data)

    switch(String(data.value).toUpperCase()) {
      case 'TRUE':
        return true
      case 'FALSE':
        return false
    }
      
    throw new NodeEvaluatorError(`Unknown value in Bool node: ${data.value}`);
  }

  private typeGuard(bool: BoolExpression): void {
    if (!('value' in bool)) {
      throw new NodeShapeError('Bool node is the wrong shape, should have "value"');
    }
  }
}
