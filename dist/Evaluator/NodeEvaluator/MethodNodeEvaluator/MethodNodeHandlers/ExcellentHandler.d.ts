import { MethodNodeHandler } from "../";
export default class ExcellentHandler implements MethodNodeHandler {
    handles(): string[];
    first_word(string: string): string;
    percent(number: number | string): string;
    read_digits(string: any): void;
    remove_fist_word(string: string): string;
    word(string: string, number: number, bySpaces?: boolean): string;
    private splitByPunc;
    word_count(string: string, bySpaces?: boolean): number;
    word_slice(string: string, start: number, stop?: number, bySpaces?: boolean): string;
    is_number(value: any): boolean;
    is_string(value: any): boolean;
    is_bool(value: any): boolean;
    isnumber(value: any): boolean;
    isbool(value: any): boolean;
    isstring(value: any): boolean;
}
