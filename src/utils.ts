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
