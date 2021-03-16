import {AbstractNodeHandler, Node} from "../../../..";

export declare class TextHandler extends AbstractNodeHandler {
    handles(): string[];
    char(asciiCode: number | Node): string;
    clean(string: string | Node): string;
    code(string: string | Node): number;
    concatenate(...args: [string | Node]): string;
    contains(needle: string | Node, haystack: string | Node): boolean;
    fixed(number: number | Node, decimals?: number | Node, commas?: boolean | Node): string;
    left(string: string | Node, chars: number | Node): string;
    len(string: string | Node): number;
    lower(string: string | Node): string;
    proper(string: string | Node): string;
    rept(string: string | Node, times: number | Node): string;
    right(string: string | Node, chars: number | Node): string;
    substitute(string: string | Node, old: string | Node, replace: string | Node, instances?: number | null): string | Node;
    unichar(unicode: number | Node): string;
    unicode(string: string | Node): number | undefined;
    upper(string: string | Node): string;
}
//# sourceMappingURL=TextHandler.d.ts.map
