export function isEmpty(val: unknown) {
  return val === undefined || val === null || val === '' || (Array.isArray(val) && !val.length)
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(val: unknown): val is Function {
  return typeof val === 'function'
}