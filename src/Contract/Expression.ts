export interface LocationDetail {
	column: number,
	line: number,
	offset: number
}

export interface Location {
	end: LocationDetail,
	start: LocationDetail,
}

export interface Expression {
	type: string,
	location: Location,
}

export interface Member extends Expression {
	key: string,
	value?: string,
}

export interface Method extends Expression {
	call: string,
	args: Array<any>,
}

export interface Concatenate extends Expression {
	lhs: any,
	rhs: any,
}

export interface Escape extends Expression {
	//
}

export interface Null extends Expression {
	//
}

export interface Logic extends Expression {
	lhs: any,
	rhs: any,
	operator: string
}

export interface Math extends Expression {
	lhs: any,
	rhs: any,
	operator: string
}

export class ExpressionFactory {
	public static instance(data: Expression) : Method|Member|Math|Logic|Escape|Concatenate{
		switch(data.type.toUpperCase()) {
			case 'METHOD':
				return data as Method;
			case 'MEMBER':
				return data as Member;
			case 'MATH':
				return data as Math;
			case 'LOGIC':
				return data as Logic;
			case 'ESCAPE':
				return data as Escape;
			case 'NULL':
				return data as Null;
			case 'CONCATENATE':
				return data as Concatenate;
		}
		throw new Error('Node data not formatted correctly');
	}
}

export const METHOD_TYPE = 'METHOD';
export const MEMBER_TYPE = 'MEMBER';
export const MATH_TYPE = 'MATH';
export const LOGIC_TYPE = 'LOGIC';
export const ESCAPE_TYPE = 'ESCAPE';
export const NULL_TYPE = 'NULL';
export const CONCATENATE_TYPE = 'CONCATENATE';
export const IDENTIFIER = '@';
