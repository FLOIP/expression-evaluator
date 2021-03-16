export interface LocationDetail {
  column: number,
  line: number,
  offset: number,
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
}

export interface Null extends Expression {
}

export interface Logic extends Expression {
  lhs: any,
  rhs: any,
  operator: string,
}

export interface Math extends Expression {
  lhs: any,
  rhs: any,
  operator: string,
}
