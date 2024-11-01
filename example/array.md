# isNotEmptyArray
      
判断数据是否为非空数组
      
```js
export function isNotEmptyArray(value) {
  return Array.isArray(value) && value.length > 0
}
```
      
### Arguments
      
| Arg | Type | Optional | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | _*_ | `false` | `undefined` | `数据` |
      
### Returns

| Type |
| ---  |
| boolean  |


# normalizeToArray
      
将数据转化为数组
      
```js
export function normalizeToArray(value) {
  return Array.isArray(value) ? value : [value]
}
```
      
### Arguments
      
| Arg | Type | Optional | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | _*_ | `false` | `undefined` | `数据` |
      
### Returns

| Type |
| ---  |
| Array<*>  |


# uniq
      
数组去重
      
```js
export function uniq(value) {
  if (Array.isArray(value)) {
    return [...new Set(value)]
  }

  return value
}
```
      
### Arguments
      
| Arg | Type | Optional | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | _*_ | `false` | `undefined` | `数据` |
      
### Returns

| Type |
| ---  |
| Array<*>  |