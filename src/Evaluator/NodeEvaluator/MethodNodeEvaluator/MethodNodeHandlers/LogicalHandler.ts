import {AbstractNodeHandler, Node, NodeEvaluatorError} from "../../../.."

export class LogicalHandler extends AbstractNodeHandler {
  public handles(): string[] {
    return [
      'and',
      'if',
      'or',
    ]
  }

  public and(...args: any[]): boolean {
    for (const arg of args.map(arg => this.value(arg)).filter(arg => super.isScalar(arg))) {
      if (!arg) {
        return false
      }
    }
    return true
  }

  public if(...args: any[]): any {
    args = args.map(arg => this.value(arg)).filter(arg => super.isScalar(arg))
    if (args.length != 3) {
      throw new NodeEvaluatorError()
    }
    return args[0] ? args[1] : args[2]
  }

  public or(...args: any[]): boolean {
    for (const arg of args.map(arg => this.value(arg)).filter(arg => super.isScalar(arg))) {
      if (arg) {
        return true
      }
    }
    return false
  }

  protected value(item: any): boolean {
    if (item instanceof Node) {
      const val = item.value
      if (typeof val === 'string') {
        switch (val.toUpperCase()) {
          case 'TRUE':
            return true
          case 'FALSE':
            return false
        }
      }
      if (typeof val === 'boolean') {
        return val
      }
      return false

    }
    return item
  }
}
