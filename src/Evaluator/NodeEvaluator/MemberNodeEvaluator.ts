import {NodeEvaluator} from "."
import Node from '../Node'
import {Member, MEMBER_TYPE} from "../../Contract/Expression"
import {NodeShapeError} from "./Exception"
import moment from "moment"

export default class MemberNodeEvaluator implements NodeEvaluator {

  handles(): string {
    return MEMBER_TYPE
  }

  /**
   * Evaluate the value of a member access node given a context.
   *
   * @param node
   * @param context
   */
  evaluate(node: Node, context: object) {
    const data: Member = node.data as Member

    this.typeGuard(data)

    const keys = data.key.split('.')
    let currentContext = context

    // traverse the context tree until we run out of keys
    for (const currentKey of keys) {
      if (currentKey in currentContext) {
        currentContext = currentContext[currentKey]
      } else {
        // if our current key doesn't exist, we return the compound key
        return data.key
      }
    }

    // at this point, we have a value associated with our key
    // if it is a nested context, return its default value or JSON
    // unless it is a Moment object which we return
    if (!Array.isArray(currentContext)
      && typeof currentContext === 'object'
      && currentContext !== null) {
      if ('__value__' in currentContext) {
        return currentContext['__value__']
      }

      if (moment.isMoment(currentContext)) {
        return currentContext
      }

      return JSON.stringify(currentContext)
    }
    // if we hit an undefined value, just return the compound key
    if (typeof currentContext === 'undefined') {
      return data.key
    }
    return currentContext
  }

  typeGuard(member: Member) {
    if (!('key' in member)) {
      throw new NodeShapeError('Member node is the wrong shape, should have "key"')
    }
  }
}
