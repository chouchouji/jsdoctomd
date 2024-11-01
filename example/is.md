# isURL
      
判断是否为字符串

### Source Code
      
```ts
export function isURL(val: string | undefined | null): boolean {
  if (!val) {
    return false
  }

  return /^(http)|(\.*\/)/.test(val)
}
```

### Usage


      
### Arguments
      
| Arg | Type | Optional | Default | Description |
| --- | --- | --- | --- | --- |
| `val` | _string \| undefined \| null_ | `false` | `undefined` | `输入的值` |
      
### Returns

| Type |
| ---  |
| boolean  |


# isArray
      
判断某个值是否为数组

### Source Code
      
```ts
export function isArray(val: unknown): val is Array<any> {
  return Array.isArray(val)
}
```

### Usage


      
### Arguments
      
| Arg | Type | Optional | Default | Description |
| --- | --- | --- | --- | --- |
| `val` | _*_ | `false` | `undefined` | `判断的值` |
      
### Returns

| Type |
| ---  |
| boolean  |


# isEmpty
      
判断某个值是否为空

### Source Code
      
```ts
export function isEmpty(val: unknown) {
  return val === undefined || val === null || val === '' || (isArray(val) && !val.length)
}
```

### Usage


      
### Arguments
      
| Arg | Type | Optional | Default | Description |
| --- | --- | --- | --- | --- |
| `val` | _*_ | `false` | `undefined` | `判断的值` |
      
### Returns

| Type |
| ---  |
| boolean  |


# isString
      
判断某个值是否为字符串类型

### Source Code
      
```ts
export const isString = (val: unknown): val is string => typeof val === 'string'
```

### Usage


      
### Arguments
      
| Arg | Type | Optional | Default | Description |
| --- | --- | --- | --- | --- |
| `val` | _*_ | `false` | `undefined` | `判断的值` |
      
### Returns

| Type |
| ---  |
| boolean  |