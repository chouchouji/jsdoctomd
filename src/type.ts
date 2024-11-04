interface generateArg {
  name: string
  type: string
  optional: boolean
  default: unknown
  desc: string
}

export interface generateFunction {
  /**
   * the name of function 
   */
  functionName: string
  /**
   * the description of function
   */
  description: string
  /**
   * the content of function
   */
  content: string
  /**
   * the arguments of function
   */
  args: generateArg[]
  /**
   * the return type of function
   */
  returnType: string
  /**
   * the type of function, like js or ts
   */
  extname: string
  /**
   * the example of function
   */
  example: string
}
