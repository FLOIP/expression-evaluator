import {AbstractNodeHandler, Node, NodeEvaluatorException} from "../../../.."

export class TextHandler extends AbstractNodeHandler {
  public handles(): string[] {
    return [
      'char',
      'clean',
      'code',
      'concatenate',
      'contains',
      'fixed',
      'left',
      'len',
      'lower',
      'proper',
      'rept',
      'right',
      'substitute',
      'unichar',
      'unicode',
      'upper',
    ]
  }

  public char(asciiCode: number | Node): string {
    return String.fromCharCode(Number(asciiCode))
  }

  public clean(string: string | Node): string {
    return String(string)
      .replace(/[^ -~]+/, '')
  }

  public code(string: string | Node): number {
    return String(string)
      .charCodeAt(0)
  }

  public concatenate(...args: [string | Node]): string {
    return args.filter(arg => super.isScalar(arg)).map(String)
      .reduce((carry, s) => carry + String(s))
  }

  public contains(needle: string | Node, haystack: string | Node): boolean {
    return String(haystack).includes(String(needle))
  }

  public fixed(number: number | Node, decimals: number | Node = 0, commas: boolean | Node = false): string {
    // if context is 3rd param
    if (typeof commas === 'object') {
      commas = false
    }

    const n = new RegExp("^-?\\d+(?:\\.\\d{0," + decimals + "})?", "g").exec(number.toString())
    if (n != null && n.length) {
      if (commas) {
        return Number(n[0]).toLocaleString()
      } else {
        return n[0]
      }
    } else {
      throw new NodeEvaluatorException(`Cannot format number ${number}`)
    }
  }

  public left(string: string | Node, chars: number | Node): string {
    return String(string).substr(0, Number(chars))
  }

  public len(string: string | Node): number {
    return String(string).length
  }

  public lower(string: string | Node): string {
    return String(string).toLowerCase()
  }

  public proper(string: string | Node): string {
    string = String(string).toLowerCase()

    // match words
    const reg = /\b\w/mg

    let match
    while ((match = reg.exec(string)) !== null) {
      const i = (match as RegExpExecArray).index
      // matching on word boundaries will also match after symbols like
      // -.& etc. We only want to uppercase after whitespace.
      if (i > 0 && /[^\s]/.test(string[i - 1])) {
        continue
      }
      string = string.substr(0, i) + string[i].toUpperCase() + string.substr(i + 1)
    }
    return string
  }

  public rept(string: string | Node, times: number | Node): string {
    return String(string).repeat(Number(times))
  }

  public right(string: string | Node, chars: number | Node): string {
    return String(string).substr(-(Number(chars)))
  }

  public substitute(string: string | Node, old: string | Node, replace: string | Node, instances: number | null = null): string | Node {
    if (typeof instances === 'object') {
      instances = null
    }
    string = String(string)
    old = String(old)
    replace = String(replace)
    if (instances != null) {
      for (let i = 0; i < Number(instances); ++i) {
        string = string.replace(old, replace)
      }
      return string
    }
    return string.replace(new RegExp(old, 'mg'), replace)
  }

  public unichar(unicode: number | Node): string {
    return String.fromCodePoint(Number(unicode))
  }

  public unicode(string: string | Node): number | undefined {
    return String(string).codePointAt(0)
  }

  public upper(string: string | Node): string {
    return String(string).toUpperCase()
  }
}
