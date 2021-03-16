"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTimeHandler = void 0;
var tslib_1 = require("tslib");
var __1 = require("../../../..");
var moment_1 = tslib_1.__importDefault(require("moment"));
var DateTimeHandler = /** @class */ (function (_super) {
    tslib_1.__extends(DateTimeHandler, _super);
    function DateTimeHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DateTimeHandler.prototype.handles = function () {
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
        ];
    };
    DateTimeHandler.prototype.date = function (year, month, day) {
        return moment_1.default(new Date(Number(year), Number(month) - 1, Number(day)));
    };
    DateTimeHandler.prototype.datevalue = function (dateString) {
        return moment_1.default(String(dateString));
    };
    DateTimeHandler.prototype.day = function (datetime) {
        return moment_1.default(this.value(datetime)).date();
    };
    DateTimeHandler.prototype.edate = function (datetime, months) {
        return moment_1.default(String(datetime))
            .add(Number(months), 'months');
    };
    DateTimeHandler.prototype.hour = function (datetime) {
        return moment_1.default(String(datetime)).hour();
    };
    DateTimeHandler.prototype.minute = function (datetime) {
        return moment_1.default(String(datetime)).minute();
    };
    DateTimeHandler.prototype.month = function (datetime) {
        return moment_1.default(this.value(datetime)).month() + 1;
    };
    DateTimeHandler.prototype.now = function () {
        return moment_1.default(new Date);
    };
    DateTimeHandler.prototype.second = function (datetime) {
        return moment_1.default(String(datetime)).second();
    };
    DateTimeHandler.prototype.time = function (hours, minutes, seconds) {
        return moment_1.default.duration({ hours: Number(hours), minutes: Number(minutes), seconds: Number(seconds) });
    };
    DateTimeHandler.prototype.timevalue = function (string) {
        return moment_1.default.duration(String(string));
    };
    DateTimeHandler.prototype.today = function () {
        return moment_1.default();
    };
    DateTimeHandler.prototype.weekday = function (date) {
        return moment_1.default(String(date)).isoWeekday();
    };
    DateTimeHandler.prototype.year = function (date) {
        return moment_1.default(this.value(date)).year();
    };
    DateTimeHandler.prototype.value = function (item) {
        // TODO: result of super.value is unused, is this an error, or is this an unnecessary call?
        _super.prototype.value.call(this, item);
        if (moment_1.default.isMoment(item)) {
            return item;
        }
        return String(item);
    };
    DateTimeHandler.prototype.between = function (date, start, end) {
        return moment_1.default(this.value(date)).isBetween(moment_1.default(this.value(start)), moment_1.default(this.value(end)));
    };
    return DateTimeHandler;
}(__1.AbstractNodeHandler));
exports.DateTimeHandler = DateTimeHandler;
//# sourceMappingURL=DateTimeHandler.js.map