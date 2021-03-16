import {Logic, Node, NodeEvaluator, NodeEvaluatorError, NodeShapeError} from "../.."

export const LOGIC_TYPE = 'LOGIC'

export class LogicNodeEvaluator implements NodeEvaluator {

  evaluate(node: Node, _context: object): boolean {
    const data: Logic = node.data as Logic

    this.typeGuard(data)

    let lhs = this.value(data.lhs)
    let rhs = this.value(data.rhs)

    if (!isNaN(Number(lhs))) {
      lhs = Number(lhs)
    }
    if (!isNaN(Number(rhs))) {
      rhs = Number(rhs)
    }

    const operator = data.operator

    switch (operator) {
      case '<':
        return lhs < rhs
      case '<=':
        return lhs <= rhs
      case '>':
        return lhs > rhs
      case '>=':
        return lhs >= rhs
      case '=':
        return lhs == rhs
      case '!=':
      case '<>':
        return lhs !== rhs
    }
    throw new NodeEvaluatorError(`${operator} is not a valid logic operator`)
  }

  handles(): string {
    return LOGIC_TYPE
  }

  private value(item): any {
    if (item instanceof Node) {
      item = item.value
    }

    if (typeof item === 'string') {
      if (item.toUpperCase() === 'TRUE') {
        return true
      } else if (item.toUpperCase() === 'FALSE') {
        return false
      } else {
        return item
      }
    } else {
      return item
    }
  }

  private typeGuard(logic: Logic): void {
    for (const key of ['rhs', 'lhs', 'operator']) {
      if (!(key in logic)) {
        throw new NodeShapeError('Logic node is the wrong shape, should have "rhs", "lhs", "operator"')
      }
    }
  }
}
