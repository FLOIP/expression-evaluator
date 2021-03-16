import {Concatenate, Node, NodeEvaluator, NodeShapeError} from "../../"

export const CONCATENATE_TYPE = 'CONCATENATE'

export class ConcatenateNodeEvaluator implements NodeEvaluator {
  public evaluate(node: Node, _context: object): string {
    const data: Concatenate = node.data as Concatenate

    this.typeGuard(data)

    const lhs = this.value(data.lhs)
    const rhs = this.value(data.rhs)

    return String(lhs) + String(rhs)
  }

  private value(item: any): any {
    if (item instanceof Node) {
      return item.value
    } else {
      return item
    }
  }

  public handles(): string {
    return CONCATENATE_TYPE
  }

  private typeGuard(concatenate: Concatenate): void {
    for (const key of ['rhs', 'lhs']) {
      if (!(key in concatenate)) {
        throw new NodeShapeError('Concatenation node is the wrong shape, should have "rhs", "lhs"')
      }
    }
  }
}
