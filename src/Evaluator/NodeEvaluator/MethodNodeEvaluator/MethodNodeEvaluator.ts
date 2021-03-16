import {Method, Node, NodeEvaluator, NodeEvaluatorException, NodeShapeError} from "../../.."

export const METHOD_TYPE = 'METHOD'

export interface MethodNodeHandler {
  handles(): Array<string>,
}

export class MethodNodeEvaluator implements NodeEvaluator {

  private handlers: Map<string, MethodNodeHandler>;

  constructor() {
    this.handlers = new Map()
  }

  public addHandler(handler: MethodNodeHandler): this {
    for (const method of handler.handles()) {
      this.handlers.set(method, handler)
    }
    return this
  }

  public getHandler(method: string): MethodNodeHandler {
    const ret = this.handlers.get(method)
    if (ret !== undefined) {
      return ret
    } else {
      throw new NodeEvaluatorException(`No node method handler found for ${method}`)
    }
  }

  evaluate(node: Node, context: object): any {
    const method: Method = node.data as Method

    this.typeGuard(method)

    const call = method.call.toLowerCase()
    const args = method.args.map((item) => this.value(item)).concat(context)

    const handler = this.getHandler(call)

    return handler[call](...args)
  }

  private value(item): any {
    if (item instanceof Node) {
      return item.value
    } else {
      return item
    }
  }

  private typeGuard(method: Method): void {
    for (const key of ['call', 'args']) {
      if (!(key in method)) {
        throw new NodeShapeError('Method node is the wrong shape, should have "call", "args"')
      }
      if (!Array.isArray(method.args)) {
        throw new NodeShapeError('Method node must have "args" array')
      }
    }
  }

  handles(): string {
    return METHOD_TYPE
  }
}
