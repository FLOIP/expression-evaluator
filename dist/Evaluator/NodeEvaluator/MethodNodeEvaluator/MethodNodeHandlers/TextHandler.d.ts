import AbstractNodeHandler from "./AbstractNodeHandler";
import Node from "../../../Node";
export default class TextHandler extends AbstractNodeHandler {
    handles(): string[];
    char(asciiCode: number | Node): string;
    clean(string: string | Node): string;
    code(string: string | Node): number;
    concatenate(...args: [string | Node]): string;
    fixed(number: number | Node, decimals?: number | Node, commas?: boolean | Node): string;
    left(string: string | Node, chars: number | Node): string;
    len(string: string | Node): number;
    lower(string: string | Node): string;
    proper(string: string | Node): string;
    rept(string: string | Node, times: number | Node): string;
    right(string: string | Node, chars: number | Node): string;
    substitute(string: string | Node, old: string | Node, replace: string | Node, instances?: number | null): string;
    unichar(unicode: number | Node): string;
    unicode(string: string | Node): number | undefined;
    upper(string: string | Node): string;
}
