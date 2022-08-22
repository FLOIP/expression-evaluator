import {Logic, Node, NodeEvaluator, NodeEvaluatorError, NodeShapeError} from "../.."

export const LOGIC_TYPE = 'LOGIC'

export class LogicNodeEvaluator implements NodeEvaluator {

  evaluate(node: Node, _context: object): boolean {
    const data: Logic = node.data as Logic

    this.typeGuard(data)

    let lhs = this.value(data.lhs)
    let rhs = this.value(data.rhs)

    if (this.isNumber(lhs)) {
      lhs = Number(lhs)
    }
    if (this.isNumber(rhs)) {
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

  private isNumber(item: unknown): boolean {
    if (typeof item === 'number') {
      return true
    }
    if (typeof item !== 'string') {
      return false
    }
    if (item === '') {
      return false
    }
    return !isNaN(Number(item)) 
  }

  private value(item): any {
    if (item instanceof Node) {
      item = item.value
    }

    if (typeof item === 'string') {
      if (item.toUpperCase() === 'TRUE') {
        return true
      }
      if (item.toUpperCase() === 'FALSE') {
        return false
      }
      if (item === '') {
        return null
      }
      item = item.toLowerCase()
    }
    return item
  }

  private typeGuard(logic: Logic): void {
    for (const key of ['rhs', 'lhs', 'operator']) {
      if (!(key in logic)) {
        throw new NodeShapeError('Logic node is the wrong shape, should have "rhs", "lhs", "operator"')
      }
    }
  }
}
