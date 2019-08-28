"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Node_1 = __importDefault(require("../../../Node"));
var PUNCTUATION = ',:;!?.-';
var ExcellentHandler = /** @class */ (function () {
    function ExcellentHandler() {
    }
    ExcellentHandler.prototype.handles = function () {
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
        ];
    };
    ExcellentHandler.prototype.first_word = function (string) {
        return this.word(string, 1);
    };
    ExcellentHandler.prototype.percent = function (number) {
        return Number(number) * 100 + "%";
    };
    ExcellentHandler.prototype.read_digits = function (string) {
        throw new Error('Not implemented');
    };
    ExcellentHandler.prototype.remove_fist_word = function (string) {
        var word = this.first_word(string);
        return string.substr(word.length);
    };
    ExcellentHandler.prototype.word = function (string, number, bySpaces) {
        var split = bySpaces ? string.split(' ') : this.splitByPunc(string);
        if (number < 0) {
            return split.reverse()[Math.abs(++number)];
        }
        return split[--number];
    };
    ExcellentHandler.prototype.splitByPunc = function (string) {
        return string.split(/\s*[,:;!?.-]\s*|\s/g).filter(function (a) { return a; });
    };
    ExcellentHandler.prototype.word_count = function (string, bySpaces) {
        if (bySpaces) {
            return string.split(' ').length;
        }
        return this.splitByPunc(string).length;
    };
    ExcellentHandler.prototype.word_slice = function (string, start, stop, bySpaces) {
        var split = bySpaces ? string.split(' ') : this.splitByPunc(string);
        if (typeof stop === 'undefined') {
            if (start < 0) {
                split = split.reverse();
                ++start;
            }
            else {
                --start;
            }
            return split.slice(start).join(' ');
        }
        if (stop > 0) {
            stop = split.length - (stop - 2);
        }
        if (start < 0) {
            split = split.reverse();
            ++start;
            stop = (split.length - stop + 1);
        }
        else {
            --start;
            if (stop > 0) {
                ++stop;
            }
        }
        return split.slice(start, stop).join(' ');
    };
    ExcellentHandler.prototype.is_number = function (value) {
        if (value instanceof Node_1.default) {
            value = value.value;
        }
        if (typeof value === 'number') {
            return true;
        }
        if (typeof value === 'string') {
            return !isNaN(Number(value));
        }
        return false;
    };
    ExcellentHandler.prototype.is_string = function (value) {
        if (value instanceof Node_1.default) {
            value = value.value;
        }
        return typeof value === 'string'
            && (isNaN(Number(value)) || value.trim().length === 0);
    };
    ExcellentHandler.prototype.is_bool = function (value) {
        if (value instanceof Node_1.default) {
            value = value.value;
        }
        if (typeof value === 'string') {
            switch (value) {
                case 'TRUE':
                    return true;
                case 'FALSE':
                    return true;
            }
            return false;
        }
        if (typeof value === 'boolean') {
            return true;
        }
        return false;
    };
    ExcellentHandler.prototype.isnumber = function (value) {
        return this.is_number(value);
    };
    ExcellentHandler.prototype.isbool = function (value) {
        return this.is_bool(value);
    };
    ExcellentHandler.prototype.isstring = function (value) {
        return this.is_string(value);
    };
    return ExcellentHandler;
}());
exports.default = ExcellentHandler;
//# sourceMappingURL=ExcellentHandler.js.map