import AbstractNodeHandler from "./AbstractNodeHandler";
import Node from "../../../Node";
import moment, { Moment, Duration } from 'moment';

export default class DateTimeHandler extends AbstractNodeHandler {
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
		];
	}

	public date(year : number|Node, month: number|Node, day: number|Node) : Moment {
		return moment(new Date(Number(year), Number(month) - 1, Number(day)));
	}

	public datevalue(dateString : string|Node) : Moment {
		return moment(String(dateString));
	}

	public day(datetime : string|Node) : number {
		return moment(this.value(datetime)).date();
	}

	public edate(datetime : string|Node, months : number|Node) : Moment {
		return moment(String(datetime))
			.add(Number(months), 'months');
	}

	public hour(datetime : string|Node) : number {
		return moment(String(datetime)).hour();
	}

	public minute(datetime : string|Node) : number {
		return moment(String(datetime)).minute();
	}

	public month(datetime : string|Node) : number {
		return moment(this.value(datetime)).month() + 1;
	}

	public now() : Moment {
		return moment(new Date);
	}

	public second(datetime : string|Node) : number {
		return moment(String(datetime)).second();
	}

	public time(hours : number|Node, minutes : number|Node, seconds : number|Node) : Duration {
		return moment.duration({hours: Number(hours), minutes: Number(minutes), seconds: Number(seconds)});
	}

	public timevalue(string : string|Node) : Duration {
		return moment.duration(String(string));
	}

	public today() : Moment {
		return moment();
	}

	public weekday(date : string|Node) : number {
		return moment(String(date)).weekday();
	}

	public year(date : string|Node) : number {
		return moment(this.value(date)).year();
	}

	protected value(item : any) : string|Moment {
		const v = super.value(item);
		if (moment.isMoment(item)) {
			return item;
		}
		return String(item);
	}
}
