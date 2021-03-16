import {Concatenate, Escape, Expression, Logic, Math, Member, Method, Null} from ".."

// noinspection JSUnusedGlobalSymbols
export class ExpressionFactory {
  public static instance(data: Expression): Method | Member | Math | Logic | Escape | Concatenate {
    switch (data.type.toUpperCase()) {
      case 'METHOD':
        return data as Method
      case 'MEMBER':
        return data as Member
      case 'MATH':
        return data as Math
      case 'LOGIC':
        return data as Logic
      case 'ESCAPE':
        return data as Escape
      case 'NULL':
        return data as Null
      case 'CONCATENATE':
        return data as Concatenate
      default:
        throw new Error('Node data not formatted correctly')
    }
  }
}
