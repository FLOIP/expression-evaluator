import {MethodNodeHandler, Node} from "../../../.."

export class ExcellentHandler implements MethodNodeHandler {
  public handles(): string[] {
    return [
      'first_word',
      'percent',
      'read_digits',
      'remove_fist_word',
      'word',
      'word_count',
      'word_slice',
      'is_number',
      'is_string',
      'is_bool',
      'isbool',
      'isnumber',
      'isstring'
    ]
  }

  public first_word(string: string): string {
    return this.word(string, 1)
  }

  public percent(number: number | string): string {
    return `${Number(number) * 100}%`
  }

  public read_digits(_value: string): void {
    throw new Error('Not implemented')
  }

  public remove_fist_word(string: string): string {
    return String(string).substr(this.first_word(string).length)
  }

  public word(string: string, number: number, bySpaces?: boolean): string {
    string = String(string)
    const split = bySpaces ? string.split(' ') : this.splitByPunc(string)

    if (number < 0) {
      return split.reverse()[Math.abs(++number)]
    } else {
      return split[--number]
    }
  }

  private splitByPunc(string: string): Array<string> {
    return String(string).split(/\s*[,:;!?.-]\s*|\s/g).filter(a => a)
  }

  public word_count(string: string, bySpaces?: boolean): number {
    if (bySpaces) {
      return String(string).split(' ').length
    }
    return this.splitByPunc(string).length
  }

  public word_slice(string: string, start: number, stop?: number, bySpaces?: boolean): string {
    string = String(string)
    let split = bySpaces ? string.split(' ') : this.splitByPunc(string)

    if (typeof stop === 'undefined') {
      if (start < 0) {
        split = split.reverse()
        ++start
      } else {
        --start
      }
      return split.slice(start).join(' ')
    }

    if (stop > 0) {
      stop = split.length - (stop - 2)
    }

    if (start < 0) {
      split = split.reverse()
      ++start
      stop = (split.length - stop + 1)
    } else {
      --start
      if (stop > 0) {
        ++stop
      }
    }

    return split.slice(start, stop).join(' ')
  }

  public is_number(value: any): boolean {
    if (value instanceof Node) {
      value = value.value
    }
    if (typeof value === 'number') {
      return true
    } else if (typeof value === 'string') {
      return !isNaN(Number(value))
    } else {
      return false
    }
  }

  public is_string(value: any): boolean {
    if (value instanceof Node) {
      value = value.value
    }
    return typeof value === 'string'
      && (isNaN(Number(value)) || value.trim().length === 0)
  }

  public is_bool(value: any): boolean {
    if (value instanceof Node) {
      value = value.value
    }
    if (typeof value === 'string') {
      switch (value) {
        case 'TRUE' :
          return true
        case 'FALSE' :
          return true
      }
      // TODO: If we got here, this is probably a bug, so maybe we should throw an exception?
      return false
    } else if (typeof value === 'boolean') {
      return true
    } else {
      return false
    }
  }

  public isnumber(value: any): boolean {
    return this.is_number(value)
  }

  public isbool(value: any): boolean {
    return this.is_bool(value)
  }

  public isstring(value: any): boolean {
    return this.is_string(value)
  }
}
