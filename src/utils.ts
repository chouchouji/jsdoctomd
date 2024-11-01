export function getFileType(path: string) {
  const { length } = path
  let type = ''

  for (let i = length - 1; i >= 0; i--) {
    if (path[i] === '.') {
      break
    }

    type = path[i] + type
  }

  return type
}

export function isEmpty(val: unknown) {
  return val === undefined || val === null || val === '' || (Array.isArray(val) && !val.length)
}
