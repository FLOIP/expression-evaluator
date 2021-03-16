import {Math as MathExpression, Node, NodeEvaluator, NodeEvaluatorError, NodeShapeError} from "../.."
import moment, {Duration, DurationInputArg2, Moment} from 'moment'

export const MATH_TYPE = 'MATH'
const DATE_INTERVAL_REGEX = /^([0-9]+)\s(\w+)$/i

export class MathNodeEvaluator implements NodeEvaluator {

  evaluate(node: Node, _context: object): any {
    const data: MathExpression = node.data as MathExpression

    this.typeGuard(data)

    const lhs = this.value(data.lhs)
    const rhs = this.value(data.rhs)
    const operator = data.operator

    // special handling for math operations on dates
    if (typeof lhs === 'object' || typeof rhs === 'object') {
      if (moment.isMoment(lhs)) {
        if (moment.isDuration(rhs)) {
          return this.evaluateDateMath(lhs, rhs, operator)
        }
        // can only add durations to dates
        throw new NodeEvaluatorError(`When lhs of equation is a date, rhs, must be a duration, got ${typeof rhs}`)
      }
      throw new NodeEvaluatorError(`Can only perform math on numbers or date/time, got {lhs: ${typeof lhs}, rhs: ${typeof rhs}}`)
    } else if (typeof lhs === "number" && typeof rhs === "number") {
      switch (operator) {
        case '+':
          return lhs + rhs
        case '-':
          return lhs - rhs
        case '/':
          return lhs / rhs
        case '*':
          return lhs * rhs
        case '^':
          return Math.pow(lhs, rhs)
      }
    } else {
      throw new NodeEvaluatorError(`Can only perform math on numbers or date/time, got {lhs: ${typeof lhs}, rhs: ${typeof rhs}}`)
    }
  }

  private evaluateDateMath(lhs: Moment, rhs: Duration, operator): Moment {
    switch (operator) {
      case '+':
        return lhs.add(rhs)
      case '-':
        return lhs.subtract(rhs)
    }
    throw new NodeEvaluatorError(`Cannot perform operation ${operator} on dates`)
  }

  handles(): string {
    return MATH_TYPE
  }

  // TODO: Can change type of `item` to Node, Number, or a String
  value(item: unknown): any {
    if (item instanceof Node) {
      item = item.value
    }

    if (moment.isDuration(item) || moment.isMoment(item)) {
      return item
    } else if (!isNaN(Number(item))) {
      return Number(item)
    } else if (typeof item === "string"){
      const date = this.parseDateTime(item)
      if (date != null) {
        return date
      } else {
        throw new NodeEvaluatorError(`Can only perform math on numbers, got ${item}`)
      }
    } else {
      throw new NodeEvaluatorError(`Item must be a Node, Number, or a String, but got ${item}`)
    }
  }

  parseDateTime(dateTimeString: string): moment.Moment | boolean | moment.Duration {
    const res = DATE_INTERVAL_REGEX.exec(dateTimeString)
    if (res == null) {
      return false
    } else if (res.length == 3) {
      return moment.duration(res[1], res[2] as DurationInputArg2)
    } else {
      const date = moment(dateTimeString)
      if (date.isValid()) {
        return date
      } else {
        return false
      }
    }
  }

  private typeGuard(math: MathExpression): void {
    for (const key of ['rhs', 'lhs', 'operator']) {
      if (!(key in math)) {
        throw new NodeShapeError('Math node is the wrong shape, should have "rhs", "lhs", "operator"')
      }
    }
  }
}
