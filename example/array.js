/**
 * 判断数据是否为非空数组
 * @example
 * ```js
 * isNotEmptyArray([]) // false
 * isNotEmptyArray([1]) // true
 * ```
 * @param {*} value 数据
 * @returns {boolean}
 */
export function isNotEmptyArray(value) {
  return Array.isArray(value) && value.length > 0
}

/**
 * 将数据转化为数组
 * @param {*} value 数据
 * @returns {Array<*>}
 */
export function normalizeToArray(value) {
  return Array.isArray(value) ? value : [value]
}

/**
 * 数组去重
 * @param {*} value 数据
 * @returns {Array<*>}
 */
export function uniq(value) {
  if (Array.isArray(value)) {
    return [...new Set(value)]
  }

  return value
}
