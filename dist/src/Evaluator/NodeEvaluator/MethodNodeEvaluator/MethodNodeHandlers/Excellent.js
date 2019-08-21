"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PUNCTUATION = ',:;!?.-';
var Excellent = /** @class */ (function () {
    function Excellent() {
    }
    Excellent.prototype.handles = function () {
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
        ];
    };
    Excellent.prototype.first_word = function (string) {
        return this.word(string, 1);
    };
    Excellent.prototype.percent = function (number) {
        return Number(number) * 100 + "%";
    };
    Excellent.prototype.read_digits = function ($string) {
        throw new Error('Not implemented');
    };
    Excellent.prototype.remove_fist_word = function (string) {
        var word = this.first_word(string);
        return string.substr(word.length);
    };
    Excellent.prototype.word = function (string, number, bySpaces) {
        var split = bySpaces ? string.split(' ') : this.splitByPunc(string);
        if (number < 0) {
            return split.reverse()[Math.abs(++number)];
        }
        return split[--number];
    };
    Excellent.prototype.splitByPunc = function (string) {
        return string.split(/\s*[,:;!?.-]\s*|\s/g);
    };
    Excellent.prototype.word_count = function ($string, $bySpaces) {
        if ($bySpaces === void 0) { $bySpaces = null; }
    };
    Excellent.prototype.word_slice = function ($string, $start, $stop, $bySpaces) {
        if ($stop === void 0) { $stop = null; }
        if ($bySpaces === void 0) { $bySpaces = null; }
    };
    Excellent.prototype.is_number = function ($value) {
    };
    Excellent.prototype.is_string = function ($value) {
    };
    Excellent.prototype.is_bool = function ($value) {
    };
    return Excellent;
}());
exports.default = Excellent;
//# sourceMappingURL=Excellent.js.map