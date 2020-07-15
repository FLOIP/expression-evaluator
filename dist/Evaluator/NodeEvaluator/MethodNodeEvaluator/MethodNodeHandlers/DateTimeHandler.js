"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractNodeHandler_1 = __importDefault(require("./AbstractNodeHandler"));
var moment_1 = __importDefault(require("moment"));
var DateTimeHandler = /** @class */ (function (_super) {
    __extends(DateTimeHandler, _super);
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
        return moment_1.default(String(date)).weekday();
    };
    DateTimeHandler.prototype.year = function (date) {
        return moment_1.default(this.value(date)).year();
    };
    DateTimeHandler.prototype.value = function (item) {
        var v = _super.prototype.value.call(this, item);
        if (moment_1.default.isMoment(item)) {
            return item;
        }
        return String(item);
    };
    return DateTimeHandler;
}(AbstractNodeHandler_1.default));
exports.default = DateTimeHandler;
//# sourceMappingURL=DateTimeHandler.js.map