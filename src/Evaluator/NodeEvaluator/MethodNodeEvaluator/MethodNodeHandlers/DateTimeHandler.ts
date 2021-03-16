import {AbstractNodeHandler, Node} from "../../../.."
import moment, {Duration, Moment} from 'moment'

export class DateTimeHandler extends AbstractNodeHandler {
  public handles(): string[] {
    return [
      'date',
      'datevalue',
      'day',
      'edate',
      'hour',
      'minute',
      'month',
      'now',
      'second',
      'time',
      'timevalue',
      'today',
      'weekday',
      'year',
      'between',
    ]
  }

  public date(year: number | Node, month: number | Node, day: number | Node): Moment {
    return moment(new Date(Number(year), Number(month) - 1, Number(day)))
  }

  public datevalue(dateString: string | Node): Moment {
    return moment(String(dateString))
  }

  public day(datetime: string | Node): number {
    return moment(this.value(datetime)).date()
  }

  public edate(datetime: string | Node, months: number | Node): Moment {
    return moment(String(datetime))
      .add(Number(months), 'months')
  }

  public hour(datetime: string | Node): number {
    return moment(String(datetime)).hour()
  }

  public minute(datetime: string | Node): number {
    return moment(String(datetime)).minute()
  }

  public month(datetime: string | Node): number {
    return moment(this.value(datetime)).month() + 1
  }

  public now(): Moment {
    return moment(new Date)
  }

  public second(datetime: string | Node): number {
    return moment(String(datetime)).second()
  }

  public time(hours: number | Node, minutes: number | Node, seconds: number | Node): Duration {
    return moment.duration({hours: Number(hours), minutes: Number(minutes), seconds: Number(seconds)})
  }

  public timevalue(string: string | Node): Duration {
    return moment.duration(String(string))
  }

  public today(): Moment {
    return moment()
  }

  public weekday(date: string | Node): number {
    return moment(String(date)).isoWeekday()
  }

  public year(date: string | Node): number {
    return moment(this.value(date)).year()
  }

  protected value(item: any): string | Moment {
    // TODO: result of super.value is unused, is this an error, or is this an unnecessary call?
    super.value(item)
    if (moment.isMoment(item)) {
      return item
    }
    return String(item)
  }

  public between(date: string | Node, start: string | Node, end: string | Node): boolean {
    return moment(this.value(date)).isBetween(moment(this.value(start)), moment(this.value(end)))
  }
}
