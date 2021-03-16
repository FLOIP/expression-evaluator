import {Node, NodeEvaluator} from "../.."

export const NULL_TYPE = 'NULL'

export class NullNodeEvaluator implements NodeEvaluator {
  handles(): string {
    return NULL_TYPE
  }

  evaluate(_node: Node, _context: object): null {
    return null
  }
}
