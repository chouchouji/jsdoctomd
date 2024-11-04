export function isEmpty(val: unknown) {
  return val === undefined || val === null || val === '' || (Array.isArray(val) && !val.length)
}

export function isFunction(val: unknown) {
  return typeof val === 'function'
}