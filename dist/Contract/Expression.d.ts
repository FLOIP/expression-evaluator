export interface LocationDetail {
    column: number;
    line: number;
    offset: number;
}
export interface Location {
    end: LocationDetail;
    start: LocationDetail;
}
export interface Expression {
    type: string;
    location: Location;
}
export interface Member extends Expression {
    key: string;
    value?: string;
}
export interface Method extends Expression {
    call: string;
    args: Array<any>;
}
export interface Concatenate extends Expression {
    lhs: any;
    rhs: any;
}
export interface Escape extends Expression {
}
export interface Null extends Expression {
}
export interface Logic extends Expression {
    lhs: any;
    rhs: any;
    operator: string;
}
export interface Math extends Expression {
    lhs: any;
    rhs: any;
    operator: string;
}
export declare class ExpressionFactory {
    static instance(data: Expression): Method | Member | Math | Logic | Escape | Concatenate;
}
export declare const METHOD_TYPE = "METHOD";
export declare const MEMBER_TYPE = "MEMBER";
export declare const MATH_TYPE = "MATH";
export declare const LOGIC_TYPE = "LOGIC";
export declare const ESCAPE_TYPE = "ESCAPE";
export declare const NULL_TYPE = "NULL";
export declare const CONCATENATE_TYPE = "CONCATENATE";
export declare const IDENTIFIER = "@";
