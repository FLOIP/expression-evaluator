import {MethodNodeHandler, Node} from "../../../../index"

export abstract class AbstractNodeHandler implements MethodNodeHandler {
  abstract handles(): string[];

  protected value(item: any): any {
    return (item instanceof Node) ? item.value : item
  }

  protected isScalar(item: any): boolean {
    if (item instanceof Node) {
      item = item.value
    }
    return (/boolean|number|string|null/).test(typeof item) || item === null
  }
}
