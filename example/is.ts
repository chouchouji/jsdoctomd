/**
 * 判断是否为字符串
 * @param {string | undefined | null} val 输入的值
 * @returns {boolean}
 */
export function isURL(val: string | undefined | null): boolean {
  if (!val) {
    return false
  }

  return /^(http)|(\.*\/)/.test(val)
}

/**
 * 判断某个值是否为数组
 * @param {*} val 判断的值
 * @returns {boolean}
 */
export function isArray(val: unknown): val is Array<any> {
  return Array.isArray(val)
}

/**
 * 判断某个值是否为空
 * @param {*} val 判断的值
 * @returns {boolean}
 */
export function isEmpty(val: unknown) {
  return val === undefined || val === null || val === '' || (isArray(val) && !val.length)
}

/**
 * 判断某个值是否为字符串类型
 * @param {*} val 判断的值
 * @returns {boolean}
 */
export const isString = (val: unknown): val is string => typeof val === 'string'
