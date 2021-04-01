import {AbstractNodeHandler, Node, NodeEvaluatorError} from "../../../.."

export class ArrayHandler extends AbstractNodeHandler {
  public handles(): string[] {
    return [
      'array',
      'in',
      'count'
    ]
  }

  public array(...args: any[]): any[] {
    return args.map(arg => this.value(arg))
  }

  public in(value: any, array: Node | any[]): boolean {
    let search = array
    if (array instanceof Node) {
      search = array.value
    }

    if (!(Array.isArray(search) || this.isIterable(search))) {
      throw new NodeEvaluatorError(`Can only perform IN on an array or iterable, got ${typeof search}`)
    }

    for (let val of (search as Iterable<any>)) {
      if (String(val) === String(value)) {
          return true
      }
    }
  return false
  }

  private isIterable(obj) {
    if (obj == null) {
        return false
    }
    return typeof obj[Symbol.iterator] === 'function'
  }

  public count(array: Node | any[]): number {
    let arr = array
    if (array instanceof Node) {
      arr = array.value
    }

    if (!(Array.isArray(arr) || 'length' in arr)) {
      throw new NodeEvaluatorError(`Can only perform COUNT on an array, got ${typeof arr}`)
    } else {
      return (arr as Array<any>).length
    }
  }
}
