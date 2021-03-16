import {AbstractNodeHandler, Node} from "../../../..";
import {Duration, Moment} from 'moment';

export declare class DateTimeHandler extends AbstractNodeHandler {
    handles(): string[];
    date(year: number | Node, month: number | Node, day: number | Node): Moment;
    datevalue(dateString: string | Node): Moment;
    day(datetime: string | Node): number;
    edate(datetime: string | Node, months: number | Node): Moment;
    hour(datetime: string | Node): number;
    minute(datetime: string | Node): number;
    month(datetime: string | Node): number;
    now(): Moment;
    second(datetime: string | Node): number;
    time(hours: number | Node, minutes: number | Node, seconds: number | Node): Duration;
    timevalue(string: string | Node): Duration;
    today(): Moment;
    weekday(date: string | Node): number;
    year(date: string | Node): number;
    protected value(item: any): string | Moment;
    between(date: string | Node, start: string | Node, end: string | Node): boolean;
}
//# sourceMappingURL=DateTimeHandler.d.ts.map
