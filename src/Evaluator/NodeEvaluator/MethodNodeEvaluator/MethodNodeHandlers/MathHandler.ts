import {AbstractNodeHandler, Node} from "../../../.."

export class MathHandler extends AbstractNodeHandler {
  public handles(): string[] {
    return [
      'abs',
      'max',
      'min',
      'power',
      'sum',
    ]
  }

  public abs(number: number | Node): number {
    return Math.abs(this.value(number))
  }

  public max(...args: [number | Node]): number {
    return Math.max(...(args.map(arg => this.value(arg)).filter(x => !isNaN(x))))
  }

  public min(...args: [number | Node]): number {
    return Math.min(...(args.map(arg => this.value(arg)).filter(x => !isNaN(x))))
  }

  public power(number: number | Node, power: number | Node): number {
    return Math.pow(this.value(number), this.value(power))
  }

  public sum(...args: [number | Node]): number {
    return args.map(arg => this.value(arg)).filter(x => !isNaN(x))
      .reduce((carry, n) => carry += Number(n))
  }

  protected value(item: any): number {
    return Number(super.value(item))
  }
}
