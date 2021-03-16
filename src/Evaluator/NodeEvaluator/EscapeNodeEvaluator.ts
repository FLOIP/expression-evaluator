import {Node, NodeEvaluator} from "../.."

export const IDENTIFIER = '@'

export const ESCAPE_TYPE = 'ESCAPE'

export class EscapeNodeEvaluator implements NodeEvaluator {
  evaluate(_node: Node, _context: object): string {
    return IDENTIFIER
  }

  handles(): string {
    return ESCAPE_TYPE
  }
}
