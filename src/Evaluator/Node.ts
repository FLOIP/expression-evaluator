import {Expression} from "../"

export class Node {
  public data: Expression;
  public value: any;

  constructor(data: object) {
    this.data = data as Expression
  }

  /**
   * Check if an object looks like a node structure.
   * @param item Some item to check
   */
  public static isNode(item: any): boolean {
    return typeof item === 'object'
      && item !== null
      && 'type' in item
  }

  /**
   * Return the type of this node.
   * @see Contract\Expression for node types.
   */
  public type(): string {
    return this.data.type
  }

  public toString(): string {
    if (typeof this.value === 'undefined') {
      throw new Error('Expression node value not set')
    } else if (typeof this.value === 'boolean') {
      return this.value ? 'TRUE' : 'FALSE'
    } else if (this.value === null) {
      return 'NULL'
    } else if (Array.isArray(this.value)) {
      return this.value.join(', ')
    } else {
      return String(this.value)
    }
  }
}
