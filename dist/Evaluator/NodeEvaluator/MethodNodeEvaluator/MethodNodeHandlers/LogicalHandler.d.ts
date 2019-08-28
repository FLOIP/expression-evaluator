import AbstractNodeHandler from "./AbstractNodeHandler";
export default class LogicalHandler extends AbstractNodeHandler {
    handles(): string[];
    and(...args: any[]): boolean;
    if(...args: any[]): any;
    or(...args: any[]): boolean;
    protected value(item: any): boolean;
}
